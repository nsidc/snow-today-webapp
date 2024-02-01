import React, {useRef} from 'react';
import {useAtomValue} from 'jotai';

import Highcharts from 'highcharts';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsReact from 'highcharts-react-official';

import '@src/style/LinePlot.css';
import '@src/style/card.css';
import {selectedRegionAtom} from '@src/state/client/derived/selectedRegion';
import {plotDataQueryAtomFamily} from '@src/state/server/plotData';
import {IPlotData} from '@src/types/query/plotData';
import {IRichSuperRegionVariable} from '@src/types/query/variables';
import LoadingIcon from '@src/components/common/LoadingIcon';

HighchartsAccessibility(Highcharts);
HighchartsMore(Highcharts);


interface ILinePlotProps {
  selectedSatelliteVariableId: string | undefined;
  selectedSatelliteVariable: IRichSuperRegionVariable | undefined;
}


// TODO: This component re-renders too frequently!!!
const LinePlot: React.FC<ILinePlotProps> = (props) => {
  const chartRef = useRef<HighchartsReact.RefObject>(null);

  const selectedRegion = useAtomValue(selectedRegionAtom);

  if (
    props.selectedSatelliteVariable === undefined
    || props.selectedSatelliteVariableId === undefined
    || selectedRegion === undefined
  ) {
    return (
      <div className={'LinePlot'}>
        <div className={'card-loading-overlay'}>
          <LoadingIcon size={200} />
        </div>
      </div>
    );
  }
  const plotDataQuery = useAtomValue(plotDataQueryAtomFamily({
    regionId: selectedRegion.id,
    variableId: props.selectedSatelliteVariableId,
  }));

  const varLongname = props.selectedSatelliteVariable.longNamePlot;
  const regionLongname = selectedRegion.longName;
  if (plotDataQuery.isError) {
    console.debug(`Error!: ${String(plotDataQuery.error)}`);
    return (
      <div className={'centered-card-text'}>
        <div>
          <h3>
            {'Plot not currently available for '}
            <u>{varLongname}</u>
            {' in '}
            <u>{regionLongname}</u>
          </h3>
          <p>{'Try another region! NOTE: currently, HUC4 region plots are not supported.'}</p>
        </div>
      </div>
    );
  }

  const chartTitle = `${regionLongname} - ${varLongname}`;
  const yAxisTitle = props.selectedSatelliteVariable.labelPlotYaxis;

  // WARNING: It is _critical_ that the data is copied before passing to
  // Highcharts. Highcharts will mutate the arrays, and we don't want state to
  // be mutated!!!
  type IPlotDataForHighcharts = Omit<IPlotData, 'dayOfWaterYear'>;
  // type IPlotDataForHighcharts = {
  //   // TODO: 
  //   [Property in keyof Omit<IPlotData, 'dayOfWaterYear'>]: number[];
  // }
  type SeriesData = [string, number];
  // TODO: Is there a programmatic way to do this object transformation
  // *WITHOUT* type casting? This is not friendly to maintain. Easy to
  // make mistakes with values, but Typescript protects us from messing up
  // structure (keys and types of values).
  const plotData = plotDataQuery.data['data'];
  // const plotMetadata = plotDataQuery.data.metadata;
  const data: IPlotDataForHighcharts = {
    date: [...plotData['date']],
    max: [...plotData['max']],
    median: [...plotData['median']],
    min: [...plotData['min']],
    prc25: [...plotData['prc25']],
    prc75: [...plotData['prc75']],
    yearToDate: [...plotData['yearToDate']],
  };

  // Re-join a given column with the X value (date)
  const getSeriesData = (
    column: keyof Omit<IPlotDataForHighcharts, 'date'>,
  ): SeriesData[] => {
    // NOTE: We don't use the lodash zip function because it supports
    // different-length lists, using "undefined" to fill in shorter lists.
    const zipped = data.date.map(
      (date, index): SeriesData => [date, data[column][index]]
    );
    return zipped;
  }

  const ytdSeries = getSeriesData('yearToDate');
  const chartData: Highcharts.SeriesOptionsType[] = [
    {
      name: 'Year to date',
      type: 'line',
      data: ytdSeries,
      zIndex: 99,
      color: '#0098F4',
      lineWidth: 3,
    },
    {
      name: 'Median',
      type: 'line',
      data: getSeriesData('median'),
      zIndex: 10,
      color: '#8d8d8d',
      dashStyle: 'Dash',
    },
    {
      name: 'Maximum',
      type: 'line',
      data: getSeriesData('max'),
      zIndex: 9,
      color: '#666666',
      dashStyle: 'ShortDashDot',
    },
    {
      name: 'Minimum',
      type: 'line',
      data: getSeriesData('min'),
      zIndex: 8,
      color: '#666666',
      dashStyle: 'ShortDot',
    },
    {
      name: 'Interquartile Range',
      type: 'arearange',
      data: getSeriesData('prc25').map(([x, low], index) => {
        const high = getSeriesData('prc75')[index][1];
        return [x, low, high];
      }),
      zIndex: 0,
      lineWidth: 0,
      color: '#cccccc',
    },
  ];

  const ytdSeriesLastNonNullPoint = ytdSeries.filter(p => p[1] !== null).slice(-1)[0];
  const ytdSeriesLastDate = new Date(ytdSeriesLastNonNullPoint[0]);
  const chartOptions: Highcharts.Options = {
    chart: {
      height: '95%',
      type: 'line',
    },
    accessibility: {
      // TODO: Add units text
      description: `${varLongname} plotted over the current water year.`,
    },
    title: {
      text: chartTitle,
      style: {fontSize: '20px'},
    },
    subtitle: {
      text: `As of ${ytdSeriesLastDate.toISOString().split('T')[0]}`,
      style: {fontSize: '16px'},
    },
    tooltip: {
      shared: true,
      valueDecimals: props.selectedSatelliteVariable.valuePrecision,
    },
    yAxis: {
      title: {
        text: yAxisTitle,
        style: {fontSize: '14px'},
      },
      labels: {style: {fontSize: '12px'}},
    },
    xAxis: {
      type: 'datetime',
      crosshair: true,
      title: {
        text: 'Date',
        style: {fontSize: '14px'},
      },
      labels: {style: {fontSize: '12px'}},
      // Show monthly ticks by setting interval to 1 month in milliseconds:
      tickInterval: 30 * 24 * 60 * 60 * 1000
    },
    legend: {itemStyle: {fontSize: '14px'}},
    series: chartData,
  };

  Highcharts.setOptions({
    lang: {thousandsSep: ','},
  });

  return (
    <div className={'LinePlot'}>
      <HighchartsReact
        highcharts={Highcharts}
        ref={chartRef}
        options={chartOptions}
        containerProps={{ className: 'lineplot-container' }}
      />
    </div>
  );
}
export default LinePlot;

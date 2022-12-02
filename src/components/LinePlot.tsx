import React, {useRef} from 'react';
import {useRecoilValue} from 'recoil';

import Highcharts from 'highcharts';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsReact from 'highcharts-react-official';

import '../style/LinePlot.css';
import '../style/card.css';
import selectedGenericRegionAtom from '../state/client/derived/selectedGenericRegion';
import usePlotDataQuery from '../serverState/plotData';
import {IPlotData} from '../types/query/plotData';
import {ISatelliteVariable} from '../types/query/satelliteVariables';
import {unixDateFromDowy} from '../util/waterYear';

HighchartsAccessibility(Highcharts);
HighchartsMore(Highcharts);


interface ILinePlotProps {
  selectedSatelliteVariableName: string | undefined;
  selectedSatelliteVariable: ISatelliteVariable | undefined;
}


// TODO: This component re-renders too frequently!!!
const LinePlot: React.FC<ILinePlotProps> = (props) => {
  const chartRef = useRef<HighchartsReact.RefObject>(null);

  const selectedGenericRegion = useRecoilValue(selectedGenericRegionAtom);

  const plotDataQuery = usePlotDataQuery(
    !!selectedGenericRegion ? selectedGenericRegion['id'] : undefined,
    props.selectedSatelliteVariableName,
  );

  const loadingDiv = (<div className={'centered-card-text'}><p>{'Loading...'}</p></div>);
  if (
    plotDataQuery.isLoading
    || !props.selectedSatelliteVariable
    || !selectedGenericRegion
  ) {
    return loadingDiv;
  }

  const varLongname = props.selectedSatelliteVariable.longname_plot;
  const regionLongname = selectedGenericRegion.longname;
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
  const yAxisTitle = props.selectedSatelliteVariable.label_plot_yaxis;

  // WARNING: It is _critical_ that the data is copied before passing to
  // Highcharts. Highcharts will mutate the arrays, and we don't want state to
  // be mutated!!!
  type IPlotDataForHighcharts = {
    [Property in keyof Omit<IPlotData, 'day_of_water_year'>]: number[];
  } & {
    unix_date: number[];
  }
  type SeriesData = [number, number];
  // TODO: Is there a programmatic way to do this object transformation
  // *WITHOUT* type casting? This is not friendly to maintain. Easy to
  // make mistakes with values, but Typescript protects us from messing up
  // structure (keys and types of values).
  const data: IPlotDataForHighcharts = {
    unix_date: [...plotDataQuery.data['day_of_water_year']].map(unixDateFromDowy),
    max: [...plotDataQuery.data['max']],
    median: [...plotDataQuery.data['median']],
    min: [...plotDataQuery.data['min']],
    prc25: [...plotDataQuery.data['prc25']],
    prc75: [...plotDataQuery.data['prc75']],
    year_to_date: [...plotDataQuery.data['year_to_date']],
  };

  // Re-join a given column with the X value (unix_date)
  const getSeriesData = (
    column: keyof Omit<IPlotDataForHighcharts, 'unix_date'>,
  ): SeriesData[] => {
    // NOTE: We don't use the lodash zip function because it supports
    // different-length lists, using "undefined" to fill in shorter lists.
    const zipped = data.unix_date.map(
      (unixDate, index): [number, number] => [unixDate, data[column][index]]
    );
    return zipped;
  }

  const ytdSeries = getSeriesData('year_to_date');
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
      valueDecimals: props.selectedSatelliteVariable.value_precision,
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

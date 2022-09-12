import React, {useRef} from 'react';
import {useRecoilValue} from 'recoil';

import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsReact from 'highcharts-react-official';

import '../style/LinePlot.css';
import '../style/card.css';
import selectedGenericRegionObjectAtom from '../clientState/derived/selectedGenericRegionObject';
import usePlotDataQuery from '../serverState/plotData';
import {IPlotData} from '../types/query/plotData';
import {ISatelliteVariableOptions} from '../types/query/satelliteVariables';

HighchartsMore(Highcharts);


interface ILinePlotProps {
  selectedSatelliteVariable: string | undefined;
  selectedSatelliteVariableObject: ISatelliteVariableOptions | undefined;
}


const LinePlot: React.FC<ILinePlotProps> = (props) => {
  const chartRef = useRef<HighchartsReact.RefObject>(null);

  const selectedGenericRegionObject = useRecoilValue(selectedGenericRegionObjectAtom);

  const plotDataQuery = usePlotDataQuery(
    !!selectedGenericRegionObject ? selectedGenericRegionObject['id'] : undefined,
    props.selectedSatelliteVariable,
  );

  const loadingDiv = (<div className={'centered-card-text'}><p>{'Loading...'}</p></div>);
  if (
    plotDataQuery.isLoading
    || !props.selectedSatelliteVariableObject
    || !selectedGenericRegionObject
  ) {
    return loadingDiv;
  }
  if (plotDataQuery.isError) {
    console.debug(`Error!: ${String(plotDataQuery.error)}`);
    const regionStr = props.selectedSatelliteVariableObject.longname;
    const varStr = selectedGenericRegionObject.longname;
    return (
      <div className={'centered-card-text'}>
        <div>
          <h3>
            {'Plot not currently available for '}
            <u>{regionStr}</u>
            {' in '}
            <u>{varStr}</u>
          </h3>
          <p>{'Try another region! NOTE: currently, HUC4 region plots are not supported.'}</p>
        </div>
      </div>
    );
  }

  const varLongname = props.selectedSatelliteVariableObject.longname;
  const varUnit = props.selectedSatelliteVariableObject.unit_of_measurement;
  const regionLongname = selectedGenericRegionObject.longname;
  const chartTitle = `${regionLongname} - ${varLongname}`;
  const yAxisTitle = `${varLongname} (${varUnit})`;

  // WARNING: It is _critical_ that the data is copied before passing to
  // Highcharts. Highcharts will mutate the arrays, and we don't want state to
  // be mutated!!!
  type IPlotDataMutable = {
    [Property in keyof IPlotData]: number[];
  }
  // TODO: Is there a programmatic way to do this object transformation
  // *WITHOUT* type casting? This is not friendly to maintain. Easy to
  // make mistakes with values, but Typescript protects us from messing up
  // structure (keys and types of values).
  const data: IPlotDataMutable = {
    day_of_water_year: [...plotDataQuery.data['day_of_water_year']],
    max: [...plotDataQuery.data['max']],
    median: [...plotDataQuery.data['median']],
    min: [...plotDataQuery.data['min']],
    prc25: [...plotDataQuery.data['prc25']],
    prc75: [...plotDataQuery.data['prc75']],
    year_to_date: [...plotDataQuery.data['year_to_date']],
  };

  const chartData: Highcharts.SeriesOptionsType[] = [
    {
      name: 'Year to date',
      type: 'line',
      data: data['year_to_date'],
      zIndex: 99,
      // color: '#000000',
    },
    {
      name: 'Median',
      type: 'line',
      data: data['median'],
      zIndex: 10,
      color: '#8d8d8d',
      dashStyle: 'Dash',
    },
    {
      name: 'Maximum',
      type: 'line',
      data: data['max'],
      zIndex: 9,
      color: '#666666',
      dashStyle: 'ShortDashDot',
    },
    {
      name: 'Minimum',
      type: 'line',
      data: data['min'],
      zIndex: 8,
      color: '#666666',
      dashStyle: 'ShortDot',
    },
    {
      name: 'Interquartile Range',
      type: 'arearange',
      data: data['prc25'].map((low, index) => {
        return [low, data['prc75'][index]];
      }),
      zIndex: 0,
      lineWidth: 0,
      color: '#cccccc',
    },
  ];
  const chartOptions: Highcharts.Options = {
    chart: {
      height: '95%',
      type: 'line',
    },
    title: {
      text: chartTitle,
    },
    tooltip: {
      shared: true,
      valueDecimals: 3,
    },
    yAxis: {
      title: {text: yAxisTitle},
    },
    xAxis: {
      crosshair: true,
      title: {text: 'Day of Water Year'},
    },
    series: chartData,
  };

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

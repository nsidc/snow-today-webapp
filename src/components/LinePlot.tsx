import React, {useRef} from 'react';
import {useRecoilValue} from 'recoil';

import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsReact from 'highcharts-react-official';

import '../style/LinePlot.css';
import selectedRegionAtom from '../clientState/selectedRegion';
import selectedRasterVariableAtom from '../clientState/selectedRasterVariable';
import usePlotDataQuery from '../serverState/plotData';

HighchartsMore(Highcharts);


const LinePlot: React.FC = () => {
  const chartRef = useRef<HighchartsReact.RefObject>(null);

  const selectedRegion = useRecoilValue(selectedRegionAtom);
  const selectedRasterVariable = useRecoilValue(selectedRasterVariableAtom);
  console.log(selectedRegion, selectedRasterVariable);

  // TODO: Apply this use...Query naming convention everywhere.
  const plotDataQuery = usePlotDataQuery(selectedRegion, selectedRasterVariable);

  if (plotDataQuery.isError) {
    console.debug(`Error!: ${plotDataQuery.error as string}`);
    return (
      <span>{`Error: ${plotDataQuery.error as string}`}</span>
    );
  } else if (plotDataQuery.isLoading) {
    return (
      <span>Loading...</span>
    );
  }

  const chartData: Highcharts.SeriesOptionsType[] = [
    {
      name: 'Year to date',
      type: 'line',
      data: plotDataQuery.data['year_to_date'],
      zIndex: 99,
      // color: '#000000',
    },
    {
      name: 'Median',
      type: 'line',
      data: plotDataQuery.data['median'],
      zIndex: 10,
      color: '#8d8d8d',
      dashStyle: 'Dash',
    },
    {
      name: 'Maximum',
      type: 'line',
      data: plotDataQuery.data['max'],
      zIndex: 9,
      color: '#666666',
      dashStyle: 'ShortDashDot',
    },
    {
      name: 'Minimum',
      type: 'line',
      data: plotDataQuery.data['min'],
      zIndex: 8,
      color: '#666666',
      dashStyle: 'ShortDot',
    },
    {
      name: 'Interquartile Range',
      type: 'arearange',
      data: plotDataQuery.data['prc25'].map((low, index) => {
        return [low, plotDataQuery.data['prc75'][index]];
      }),
      zIndex: 0,
      lineWidth: 0,
      color: '#cccccc',
    },
  ];
  const chartOptions: Highcharts.Options = {
    title: {
      text: 'Test!'
    },
    series: chartData,
  };

  return (
    <div className={'LinePlot'}>
      <HighchartsReact
        highcharts={Highcharts}
        ref={chartRef}
        options={chartOptions}
      />
    </div>
  );
}
export default LinePlot;

import React, {useRef} from 'react';
import {useRecoilValue} from 'recoil';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import '../style/LinePlot.css';
import selectedRegionAtom from '../clientState/selectedRegion';
import selectedRasterVariableAtom from '../clientState/selectedRasterVariable';
import usePlotDataQuery from '../serverState/plotData';


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
      name: 'test',
      type: 'line',
      data: plotDataQuery.data['median'],
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

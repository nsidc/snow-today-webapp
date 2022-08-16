import React, {useRef} from 'react';
import {useRecoilValue} from 'recoil';

import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsReact from 'highcharts-react-official';

import '../style/LinePlot.css';
import '../style/card.css';
import selectedRegionAtom from '../clientState/selectedRegion';
import selectedRegionObjectAtom from '../clientState/selectedRegionObject';
import selectedSatelliteVariableAtom from '../clientState/selectedSatelliteVariable';
import selectedSatelliteVariableObjectAtom from '../clientState/selectedSatelliteVariableObject';
import usePlotDataQuery from '../serverState/plotData';

HighchartsMore(Highcharts);


const LinePlot: React.FC = () => {
  const chartRef = useRef<HighchartsReact.RefObject>(null);

  const selectedRegion = useRecoilValue(selectedRegionAtom);
  const selectedRegionObject = useRecoilValue(selectedRegionObjectAtom);
  const selectedSatelliteVariable = useRecoilValue(selectedSatelliteVariableAtom);
  const selectedSatelliteVariableObject = useRecoilValue(selectedSatelliteVariableObjectAtom);

  // TODO: Apply this use...Query naming convention everywhere.
  const plotDataQuery = usePlotDataQuery(selectedRegion, selectedSatelliteVariable);

  if (plotDataQuery.isError) {
    console.debug(`Error!: ${plotDataQuery.error as string}`);
    const regionStr = selectedSatelliteVariableObject!.longname;
    const varStr = selectedRegionObject!.longname;
    return (
      <div className={'card lineplot-error'}>
        <div>
          <h3>
            {'Feature not currently available for '}
            <u>{regionStr}</u>
            {' in '}
            <u>{varStr}</u>
          </h3>
          <p>{'Try another region or variable!'}</p>
          <p>{'Working regions: CO, ID'}</p>
          <p>
            {'Working variables: Snow Albedo, Radiative Forcing, Snow Cover Days, Snow Cover Percent'}
          </p>
        </div>
      </div>
    );
  } else if (plotDataQuery.isLoading) {
    return (
      <span>Loading...</span>
    );
  }

  const chartTitle = `${selectedRegionObject!.longname} - ${selectedSatelliteVariableObject!.longname}`;

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
    chart: {
      height: '95%',
      type: 'line',
    },
    title: {
      text: chartTitle,
    },
    tooltip: {
      shared: true,
    },
    xAxis: {
      crosshair: true,
    },
    series: chartData,
  };

  return (
    <div className={'LinePlot card'}>
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

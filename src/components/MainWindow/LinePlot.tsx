import React, {useRef} from 'react';
import {useAtomValue} from 'jotai';

import colormap from 'colormap';
import Highcharts from 'highcharts';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsReact from 'highcharts-react-official';

import '@src/style/LinePlot.css';
import '@src/style/card.css';
import {plotDataQueryAtomFamily} from '@src/state/server/plotData';
import {IPlotData} from '@src/types/query/plotData';
import {IRichSuperRegionVariable} from '@src/types/query/variables';
import {IGenericRegion} from '@src/types/query/regions';
import {TileSubType} from '@src/types/layout';
import {YearString} from '@src/types/misc';

HighchartsAccessibility(Highcharts);
HighchartsMore(Highcharts);


interface ILinePlotProps {
  selectedSatelliteVariableId: string;
  selectedSatelliteVariable: IRichSuperRegionVariable;
  selectedRegion: IGenericRegion;
  plotSubType: TileSubType;
}


// TODO: This component re-renders too frequently!!!
const LinePlot: React.FC<ILinePlotProps> = (props) => {
  const chartRef = useRef<HighchartsReact.RefObject>(null);

  const plotDataQuery = useAtomValue(plotDataQueryAtomFamily({
    regionId: props.selectedRegion.id,
    variableId: props.selectedSatelliteVariableId,
  }));

  const varLongname = props.selectedSatelliteVariable.longNamePlot;
  const regionLongname = props.selectedRegion.longName;
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

  // Get the axis title, replacing sq km and carets with superscripts
  const yAxisTitle = props.selectedSatelliteVariable.labelPlotYaxis
                          .replace(/\^(-?\d+)/g, "<sup>$1</sup>")
                          .replace(/sq km/, 'km<sup>2</sup>');

  // Extract the unit from the title, adding a space for all but % units
  const rawUnit = yAxisTitle.match(/\(([^)]+)\)/)?.[1];
  const yAxisUnits = rawUnit
                   ? rawUnit === '%' ? '%' : ` ${rawUnit}`
                   : '';
  
  // WARNING: It is _critical_ that the data is copied before passing to
  // Highcharts. Highcharts will mutate the arrays, and we don't want state to
  // be mutated!!!
  type IPlotDataForHighcharts = Omit<IPlotData, 'dayOfWaterYear'> & {unixDate: number[]};
  // Each series is a list of tuples of unix dates and values:
  type SeriesData = [number, number];
  // TODO: Is there a programmatic way to do this object transformation
  // *WITHOUT* type casting? This is not friendly to maintain. Easy to
  // make mistakes with values, but Typescript protects us from messing up
  // structure (keys and types of values).
  const plotData = plotDataQuery.data.data;
  const plotMetadata = plotDataQuery.data.metadata;
  const data: IPlotDataForHighcharts = {
    unixDate: [...plotData.date.map(Date.parse)],
    date: [...plotData.date],
    max: [...plotData.max],
    median: [...plotData.median],
    min: [...plotData.min],
    prc25: [...plotData.prc25],
    prc75: [...plotData.prc75],
    yearToDate: [...plotData.yearToDate],
  };

  const yearKeys = Object.keys(plotData).filter((key) => /^\d{4}$/.test(key)).sort().reverse();
  
  // Re-join a given column with the X value (unixDate)
  const getSeriesData = (
    column: keyof Omit<IPlotDataForHighcharts, 'unixDate' | 'date'> | YearString,
  ): SeriesData[] => {
    // NOTE: We don't use the lodash zip function because it supports
    // different-length lists, using "undefined" to fill in shorter lists.
    const columnValues = data[column] as (number)[] | undefined;
    const zipped: SeriesData[] = data.unixDate.map(
      (date, index): SeriesData => {
        const val = columnValues?.[index] ?? NaN;
        return [date, val];
      }
    )
    return zipped;
  }

  let historicalYearSeries: Highcharts.SeriesOptionsType[] = [];
  if (props.plotSubType === 'interactive') {
    const colors = colormap({
      colormap: 'viridis',
      nshades: yearKeys.length,
      format: 'hex',
      alpha: 1
    });

    yearKeys.forEach((yyyy) => {
      const yearData = plotData[yyyy] as number[] | undefined;
      data[yyyy] = yearData ? [...yearData] : [];
    });

    historicalYearSeries = yearKeys.map((year, index) => ({
      name: year,
      type: 'line',
      data: getSeriesData(year as YearString),
      zIndex: 1,
      lineWidth: 3,
      color: colors[index],
      opacity: 0.8,
      events: {
        legendItemClick: function () {
          const chart = this.chart;

          setTimeout(() => {
            const togglePast = chart.series.find((ser) =>
              ser.name === 'Show All Past Years' || ser.name === 'Hide All Past Years'
            );
            const yearSeries = chart.series.filter((ser) => /^\d{4}$/.test(ser.name));

            if (togglePast && yearSeries.length > 0) {
              const allVisible = yearSeries.every((ser) => ser.visible);
              const expectedLabel = allVisible ? 'Hide All Past Years' : 'Show All Past Years';

              if (togglePast.name !== expectedLabel) {
                togglePast.update({ name: expectedLabel } as Highcharts.SeriesOptionsType, true);
              }
            }
          }, 0);
        },
      },
    }));

    const togglePastYearsSeries: Highcharts.SeriesOptionsType = {
      name: 'Hide All Past Years',
      type: 'line',
      data: [],
      color: '#333333',
      marker: { enabled: false },
      showInLegend: true,
      events: {
        legendItemClick: function () {
          const chart = this.chart;
          const yearSeries = chart.series.filter((ser) => /^\d{4}$/.test(ser.name));
          const shouldShow = !yearSeries.every((ser) => ser.visible);

          const newLabel = shouldShow ? 'Hide All Past Years' : 'Show All Past Years';
          this.update({ name: newLabel } as Highcharts.SeriesOptionsType, false);

          yearSeries.forEach((series) => {
            series.setVisible(shouldShow, false);
          })

          chart.redraw();

          return false; // prevent default event handling
        }
      }
    }

    historicalYearSeries = yearKeys.length > 0 ? [togglePastYearsSeries, ...historicalYearSeries] : [];
  }  

  const legend: Highcharts.LegendOptions = props.plotSubType === 'interactive'
    ? {
      itemStyle: {fontSize: '14px'},
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',

      borderWidth: 1,
      borderColor: '#cccccc',
      borderRadius: 5,
      backgroundColor: '#ffffff',
      padding: 12,

      maxHeight: 500,

      navigation: {
        enabled: false,
      }
    }
    : {itemStyle: {fontSize: '14px'}}

  const ytdSeries = getSeriesData('yearToDate');
  const chartData: Highcharts.SeriesOptionsType[] = [
    {
      name: 'Year to date',
      type: 'line',
      data: ytdSeries,
      zIndex: 99,
      color: '#0098F4',
      lineWidth: 10,
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
      name: `Maximum (${plotMetadata.maxYear})`,
      type: 'line',
      data: getSeriesData('max'),
      zIndex: 9,
      color: '#666666',
      dashStyle: 'ShortDashDot',
    },
    {
      name: `Minimum (${plotMetadata.minYear})`,
      type: 'line',
      data: getSeriesData('min'),
      zIndex: 8,
      color: '#666666',
      dashStyle: 'ShortDot',
    },
    ...historicalYearSeries,
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

  const chartOptions: Highcharts.Options = {
    chart: {
      type: 'line',
      reflow: true,
    },
    accessibility: {
      // TODO: Add units text
      description: `${varLongname} plotted over the current water year.`,
    },
    title: {
      text: undefined,
    },
    tooltip: {
      shared: true,
      valueDecimals: props.selectedSatelliteVariable.valuePrecision,
      valueSuffix: yAxisUnits,
      useHTML: true,
    },
    yAxis: {
      title: {
        text: yAxisTitle,
        style: {fontSize: '14px'},
        useHTML: true
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
    legend: legend,
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

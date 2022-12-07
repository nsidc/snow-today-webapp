import colormap from 'colormap';

import {IVariable} from '../types/query/variables';
import {CURRENT_DOWY} from '../constants/waterYear';

type ColorStyle = Array<string | number | Array<string | number>>
export interface IStyleVariables {
  color: ColorStyle;
}

const colormapValue = (val: number | string): number => {
  if (typeof val === 'number') {
    return val;
  }
  if (val === '$DOWY') {
    return CURRENT_DOWY;
  } else {
    throw new Error(`Unexpected colormap variable: "${val}"`);
  }
}
const colormapValueRange = (varObj: IVariable): [number, number] => {
  const cmapRangeIn = varObj.colormap_value_range;
  return [
    colormapValue(cmapRangeIn[0]),
    colormapValue(cmapRangeIn[1]),
  ]
}

export const colorStopsFromColorMapName = (
  colorMapName: string,
  min: number,
  max: number,
  steps: number,
  reverse: boolean,
): Array<number | number[]> => {
  /* Generate OpenLayers style color-stops from colormap name. */
  const colors = colormap({
    colormap: colorMapName,
    nshades: steps,
    format: 'rgba',
  });

  return colorStopsFromColorMap(
    colors,
    min,
    max,
    reverse,
  );
}

export const colorStopsFromColorMap = (
  colorMap: Array<number[]>,
  min: number,
  max: number,
  reverse: boolean,
): Array<number | number[]> => {
  /* Generate OpenLayers style color-stops from colormap.
   *
   * Based on educational materials from OpenLayers:
   *     https://openlayers.org/workshop/en/cog/colormap.html
   */
  const steps = colorMap.length;
  const delta = (max - min) / (steps - 1);
  const stops = new Array<number | number[]>(steps * 2);
  if (reverse) {
    colorMap = [...colorMap].reverse();
  }
  for (let i = 0; i < steps; i++) {
    stops[i * 2] = min + i * delta;
    stops[i * 2 + 1] = colorMap[i];
  }
  return stops;
}

export const colorStopsFromVariableObject = (
  varObj: IVariable,
): Array<number | number[]> => {
  const colormap = varObj.colormap;
  const [minVal, maxVal] = colormapValueRange(varObj);

  const colorStops = colorStopsFromColorMap(colormap, minVal, maxVal, false);
  return colorStops;
}

export const colorStyleFromVariableObject = (varObj: IVariable): ColorStyle => {
  // Calculate color stops, nodata value, and new color style
  const colormap = varObj.colormap;
  const [minVal, maxVal] = colormapValueRange(varObj);
  const noDataValue = varObj.nodata_value;
  const transparentZero = varObj.transparent_zero;

  const colorStops = colorStopsFromColorMap(colormap, minVal, maxVal, false);
  let transparentZeroColorStops: (number | number[])[];
  if (transparentZero) {
    transparentZeroColorStops = [
      0,
      [0, 0, 0, 0],
    ];
    // It's expected that minVal is >=1 if transparentZero is enabled. If it's
    // >1, we'll use the first colormap value for 1 to prevent any
    // intermediate partially-transparent values.
    if (minVal < 1) {
      throw new Error(`Expected minVal to be 1; received ${minVal}`);
    } else if (minVal > 1) {
      transparentZeroColorStops.push(1);
      transparentZeroColorStops.push(...colormap.slice(1));
    }
  } else {
    transparentZeroColorStops = [];
  }

  return [
    'interpolate',
    ['linear'],
    ['band', 1],
    // Optionally make zero transparent:
    ...transparentZeroColorStops,
    // Apply color stops generated from colormap data:
    ...colorStops,
    // Make the noData value transparent. Ensure that all values between the
    // colormap max and the noData value are the same color to avoid any
    // intermediate semi-transparent values:
    noDataValue - 1,
    ...colormap.slice(-1),
    noDataValue,
    [0, 0, 0, 0],
  ];
}

export const findColorStopsNearestColor = (
  colorStops: Array<number | number[]>,
  value: number,
): number[] => {
  const stops = colorStops.filter((e): e is number => !Array.isArray(e));
  const colors = colorStops.filter((e): e is number[]=> Array.isArray(e));

  // If value is greater than all elements of list, returns `-1`.
  let nearestStopIndex = stops.findIndex(e => value <= e);
  if (nearestStopIndex === -1) {
    nearestStopIndex = colors.length - 1;
  }

  const color = colors[nearestStopIndex];
  return color;
}

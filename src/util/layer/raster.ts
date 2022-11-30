import PluggableMap from 'ol/PluggableMap';
import TileLayer from 'ol/layer/WebGLTile';
import GeoTIFF from 'ol/source/GeoTIFF';

import _memoize from 'lodash/memoize';

import {dataServerUrl} from '../../constants/dataServer';
import {CURRENT_DOWY} from '../../constants/waterYear';
import {colorStopsFromColorMap} from '../colormap';
import {ISatelliteVariable} from '../../types/query/satelliteVariables';


const geoTiffSourceDefaults = {
  // DO NOT smooth edges of pixels:
  interpolate: false,
  // DO NOT normalize values to range (0,1). We want the raw values:
  normalize: false,
}
type ColorStyle = Array<string | number | Array<string | number>>
interface IStyleVariables {
  color: ColorStyle;
}
const styleVariables: IStyleVariables = {
  color: [],
}


const sourceFromVariableObject = (varObj: ISatelliteVariable): GeoTIFF => {
  // Calculate new source URL
  const cogPath = varObj.cog_path;
  const url = `${dataServerUrl}/${cogPath}`;
  return new GeoTIFF({
    ...geoTiffSourceDefaults,
    sources: [
      {
        url: url,
      },
    ],
  });
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
const colormapValueRange = (varObj: ISatelliteVariable): [number, number] => {
  const cmapRangeIn = varObj.colormap_value_range;
  return [
    colormapValue(cmapRangeIn[0]),
    colormapValue(cmapRangeIn[1]),
  ]
}



const colorStyleFromVariableObject = (varObj: ISatelliteVariable): ColorStyle => {
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


export const notProcessedLayer = _memoize((mapId: string): TileLayer => (
  new TileLayer({
    source: new GeoTIFF({
      ...geoTiffSourceDefaults,
      sources: [
        {
          url: `${dataServerUrl}/cogs/notprocessed.tif`,
        },
      ],
    }),
    visible: false,
    zIndex: 98,
    // WebGL tiles don't support `setStyle`, so you have to use variables like so
    /*
    style: {
      color: ['var', 'color'],
      // @ts-ignore: TS2322
      variables: styleVariables,
    },
    */
  })
));

export const toggleNotProcessedLayer = (
  mapId: string,
  notProcessedLayerEnabled: boolean,
  notProcessedVariableObject: ISatelliteVariable,
): void => {
  const theNotProcessedLayer = notProcessedLayer(mapId);

  const newSource = sourceFromVariableObject(notProcessedVariableObject);
  const newColorStyle = colorStyleFromVariableObject(notProcessedVariableObject);

  theNotProcessedLayer.setVisible(notProcessedLayerEnabled);
  theNotProcessedLayer.setSource(newSource);
  theNotProcessedLayer.setStyle({color: newColorStyle});
};



export const rasterLayer = _memoize((mapId: string): TileLayer => (
  new TileLayer({
    source: undefined,
    visible: true,
    zIndex: 99,
    // WebGL tiles don't support `setStyle`, so you have to use variables like so
    style: {
      color: ['var', 'color'],
      // @ts-ignore: TS2322
      variables: styleVariables,
    }
  })
));


export const changeRasterVariable = (
  mapId: string,
  rasterVariableObject: ISatelliteVariable,
  openLayersMap: PluggableMap,
): void => {
  const theRasterLayer = rasterLayer(mapId);

  const newSource = sourceFromVariableObject(rasterVariableObject);
  const newColorStyle = colorStyleFromVariableObject(rasterVariableObject);

  theRasterLayer.setSource(newSource);
  theRasterLayer.setStyle({color: newColorStyle});
}

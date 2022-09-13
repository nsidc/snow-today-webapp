import PluggableMap from 'ol/PluggableMap';
import TileLayer from 'ol/layer/WebGLTile';
import GeoTIFF from 'ol/source/GeoTIFF';

import _memoize from 'lodash/memoize';

import {dataServerUrl} from '../../constants/dataServer';
import {colorStopsFromColorMap} from '../colormap';

const geoTiffSourceDefaults = {
  // DO NOT smooth edges of pixels:
  interpolate: false,
  // DO NOT normalize values to range (0,1). We want the raw values:
  normalize: false,
}
interface IStyleVariables {
  color: Array<string | Array<string | number>>;
}
const styleVariables: IStyleVariables = {
  color: [],
}


export const notProcessedLayer = _memoize((mapId: string): TileLayer => (
  new TileLayer({
    source: new GeoTIFF({
      ...geoTiffSourceDefaults,
      sources: [
        {
          url: 'https://qa.nsidc.org/api/snow-today/cogs/notprocessed.tif',
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
): void => {
  const theNotProcessedLayer = notProcessedLayer(mapId);
  theNotProcessedLayer.setVisible(notProcessedLayerEnabled);
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
  rasterVariableObject: object,
  openLayersMap: PluggableMap,
): void => {
  // Calculate new source URL
  const cogPath = rasterVariableObject['cog_path'] as string;
  const url = `${dataServerUrl}/${cogPath}`;
  const newSource = new GeoTIFF({
    ...geoTiffSourceDefaults,
    sources: [
      {
        url: url,
      },
    ],
  });

  // Calculate color stops, nodata value, and new color style
  const colormap = rasterVariableObject['colormap'] as number[][];
  const [minVal, maxVal] = rasterVariableObject['colormap_value_range'] as [number, number];
  const noDataValue = rasterVariableObject['nodata_value'] as number;
  const transparentZero = rasterVariableObject['transparent_zero'] as boolean;

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

  const newColorStyle = [
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

  // Apply changes to the raster data layer
  rasterLayer(mapId).setSource(newSource);
  rasterLayer(mapId).setStyle({color: newColorStyle});
}

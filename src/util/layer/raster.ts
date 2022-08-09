import PluggableMap from 'ol/PluggableMap';
import TileLayer from 'ol/layer/WebGLTile';
import GeoTIFF from 'ol/source/GeoTIFF';

import {cogsServerUrl} from '../../constants/dataServer';
import {colorStopsFromColorMap} from '../colormap';

const geoTiffSourceDefaults = {
  // DO NOT smooth edges of pixels:
  interpolate: false,
  // DO NOT normalize values to range (0,1). We want the raw values:
  normalize: false,
}
interface IStyleVariables {
  color: any[];
}
const styleVariables: IStyleVariables = {
  color: [],
}


export const rasterLayer = new TileLayer({
  source: undefined,
  visible: true,
  zIndex: 99,
  // WebGL tiles don't support `setStyle`, so you have to use variables like so
  style: {
    color: ['var', 'color'],
    // @ts-ignore: TS2322
    variables: styleVariables,
  }
});


export const changeRasterVariable = (
  rasterVariableObject: object,
  openLayersMap: PluggableMap,
): void => {
  // Calculate new source URL
  const filename = rasterVariableObject['file'] as string;
  const url = `${cogsServerUrl}/${filename}`;
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
  const colorStops = colorStopsFromColorMap(colormap, minVal, maxVal, false);

  const noDataValue = rasterVariableObject['nodata_value'];

  const newColorStyle = [
    'interpolate',
    ['linear'],
    ['band', 1],
    ...colorStops,
    noDataValue - 1,
    ...colormap.slice(-1),
    noDataValue,
    [0, 0, 0, 0],
  ];

  // Apply changes to the raster data layer
  rasterLayer.setSource(newSource);
  rasterLayer.setStyle({color: newColorStyle});
}

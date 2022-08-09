import PluggableMap from 'ol/PluggableMap';
import TileLayer from 'ol/layer/WebGLTile';
import GeoTIFF from 'ol/source/GeoTIFF';

import {colormapBuPu} from '../../constants/colormaps';
import {cogsServerUrl} from '../../constants/dataServer';
import {colorStopsFromColorMap} from '../colormap';

const colorStopsBuPu = colorStopsFromColorMap(colormapBuPu, 2231, 8842, true);
const geoTiffSourceDefaults = {
  // DO NOT smooth edges of pixels:
  interpolate: false,
  // DO NOT normalize values to range (0,1). We want the raw values:
  normalize: false,
}


export const rasterLayer = new TileLayer({
  source: undefined,
  visible: true,
  zIndex: 99,
  style: {
    color: [
      'interpolate',
      ['linear'],
      ['band', 1],
      // TODO: Why do "nodata" values show up as 0s?
      0,
      ['color', 0, 0, 0, 0],
      ...colorStopsBuPu,
      65535,
      ['color', 0, 0, 0, 0],
    ],
  },
});


export const changeRasterVariable = (
  rasterVariableObject: object,
  openLayersMap: PluggableMap,
): void => {
  const filename = rasterVariableObject['file'];
  const url = `${cogsServerUrl}/${filename}`;

  const newSource = new GeoTIFF({
    ...geoTiffSourceDefaults,
    sources: [
      {
        url: url,
      },
    ],
  });
  rasterLayer.setSource(newSource);
}

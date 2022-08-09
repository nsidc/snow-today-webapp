import TileLayer from 'ol/layer/WebGLTile';
import GeoTIFF from 'ol/source/GeoTIFF';

import {colormapBuPu} from '../../constants/colormaps';
import {colorStopsFromColorMap} from '../colormap';

const colorStopsBuPu = colorStopsFromColorMap(colormapBuPu, 2231, 8842, true);


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
  cogUrl: string,
  openLayersMap: PluggableMap,
): void => {
  const newSource = new GeoTIFF({
    // DO NOT smooth edges of pixels:
    interpolate: false,
    // DO NOT normalize values to range (0,1). We want the raw values:
    normalize: false,
    sources: [
      {
        url: cogUrl,
      },
    ],
  })
  rasterLayer.setSource(newSource);
}

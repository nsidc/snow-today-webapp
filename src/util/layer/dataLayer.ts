import TileLayer from 'ol/layer/WebGLTile';
import GeoTIFF from 'ol/source/GeoTIFF';

import {testDataUrl} from '../../constants/dataServer';
import {colorStopsFromColorMap} from '../colormap';

const colormapViridis = colorStopsFromColorMap('viridis', 1, 100, 10, false);
console.log(colormapViridis);


export const rasterLayer = new TileLayer({
  source: new GeoTIFF({
    interpolate: false,
    sources: [
      {
        url: testDataUrl,
      },
    ],
  }),
  visible: true,
  zIndex: 99,
  // TODO: This doesn't work :\
  /*
  style: {
    color: [
      'interpolate',
      ['linear'],
      ['band', 1],
      0,
      [0, 0, 0, 1],  // Transparent where no snow
      1,
      [100, 100, 0, 1],
      100,
      [255, 255, 0, 1],
      //...colormapViridis,
      200,
      [0, 0, 0, 0],
      65535,
      [0, 0, 0, 0],
    ],
  },
  */
});

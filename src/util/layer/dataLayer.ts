import TileLayer from 'ol/layer/WebGLTile';
import GeoTIFF from 'ol/source/GeoTIFF';

import {testDataUrl} from '../../constants/dataServer';


export const rasterLayer = new TileLayer({
  source: new GeoTIFF({
    sources: [
      {
        url: testDataUrl,
      },
    ],
  }),
  visible: true,
  zIndex: 99,
  /*
  style: {
    color: [
    ],
  },
  */
});

import PluggableMap from 'ol/PluggableMap';
import TileLayer from 'ol/layer/WebGLTile';
import GeoTIFF from 'ol/source/GeoTIFF';

import _memoize from 'lodash/memoize';

import {sspDataUrl} from '@src/constants/dataServer';
import {colorStyleFromVariableObject, IStyleVariables} from '@src/util/colormap';
import {IRichSuperRegionVariable} from '@src/types/query/variables';


const geoTiffSourceDefaults = {
  // DO NOT smooth edges of pixels:
  interpolate: false,
  // DO NOT normalize values to range (0,1). We want the raw values:
  normalize: false,
}
const styleVariables: IStyleVariables = {
  color: [],
}


const sourceFromVariableObject = (varObj: IRichSuperRegionVariable): GeoTIFF => {
  const cogPath = varObj.geotiffRelativePath;
  const url = `${sspDataUrl}/${cogPath}`;
  return new GeoTIFF({
    ...geoTiffSourceDefaults,
    sources: [
      {
        url: url,
      },
    ],
  });
}


export const notProcessedLayer = _memoize((mapId: string): TileLayer => (
  new TileLayer({
    source: new GeoTIFF({
      ...geoTiffSourceDefaults,
      sources: [
        {
          // FIXME: Replace hardcode. This comes from a variable object now.
          url: `${sspDataUrl}/regions/cogs/26000_notprocessed.tif`,
          // url: 'https://nsidc.org/api/snow-today/cogs/notprocessed.tif',
        },
      ],
    }),
    visible: false,
    zIndex: 98,
    // WebGL tiles don't support `setStyle`, so you have to use variables like so
    style: {
      color: ['var', 'color'],
      // @ts-ignore: TS2322
      variables: styleVariables,
    },
  })
));

export const toggleNotProcessedLayer = (
  mapId: string,
  notProcessedLayerEnabled: boolean,
  notProcessedVariableObject: IRichSuperRegionVariable,
): void => {
  const layer = notProcessedLayer(mapId);

  const newSource = sourceFromVariableObject(notProcessedVariableObject);
  const newColorStyle = colorStyleFromVariableObject(notProcessedVariableObject);

  layer.setVisible(notProcessedLayerEnabled);
  layer.setSource(newSource);
  layer.setStyle({color: newColorStyle});
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
    },
  })
));


export const changeRasterVariable = (
  mapId: string,
  rasterVariableObject: IRichSuperRegionVariable,
  openLayersMap: PluggableMap,
): void => {
  const layer = rasterLayer(mapId);

  const newSource = sourceFromVariableObject(rasterVariableObject);
  const newColorStyle = colorStyleFromVariableObject(rasterVariableObject);

  layer.setSource(newSource);
  layer.setStyle({color: newColorStyle});
}

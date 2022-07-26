import BaseLayer from 'ol/layer/Base';
import LayerGroup from 'ol/layer/Group';
import TileLayer from 'ol/layer/Tile';
// import VectorTileLayer from 'ol/layer/VectorTile';

import {
  getArcGisBasemapSource,
  getUsgsBasemapSource,
} from './layerSource';


const basemaps: Array<BaseLayer> = [
  // USGS Basemaps
  new TileLayer({
    properties: {
      title: 'USGS Topographic',
      type: 'basemap',
    },
    source: getUsgsBasemapSource('USGSTopo'),
    visible: false,  // TODO: Necessary?
  }),
  new TileLayer({
    properties: {
      title: 'USGS Topographic + Imagery',
      type: 'basemap',
    },
    source: getUsgsBasemapSource('USGSImageryTopo'),
    visible: false,  // TODO: Necessary?
  }),
  new TileLayer({
    properties: {
      title: 'USGS Imagery',
      type: 'basemap',
    },
    source: getUsgsBasemapSource('USGSImageryOnly'),
  }),
  new TileLayer({
    properties: {
      title: 'USGS Shaded Relief',
      type: 'basemap',
    },
    source: getUsgsBasemapSource('USGSShadedReliefOnly'),
    visible: false,  // TODO: Necessary?
  }),
  new TileLayer({
    properties: {
      title: 'USGS Hydro Cached',
      type: 'basemap',
    },
    source: getUsgsBasemapSource('USGSHydroCached'),
    visible: false,  // TODO: Necessary?
  }),

  // ArcGIS Basemaps
  new LayerGroup({
    properties: {
      title: 'ArcGIS Light Gray',
      type: 'basemap',
    },
    visible: false,
    layers: [
      new TileLayer({
        properties: {
          title: 'ArcGIS Light Gray Base',
          type: 'basemap',
        },
        source: getArcGisBasemapSource('Canvas/World_Light_Gray_Base'),
        visible: true,
      }),
      new TileLayer({
        properties: {
          title: 'ArcGIS Light Gray Reference',
          type: 'basemap',
        },
        source: getArcGisBasemapSource('Canvas/World_Light_Gray_Reference'),
        visible: true,
      }),
    ],
  }),
  new TileLayer({
    properties: {
      title: 'ArcGIS Light Gray - Base only',
      type: 'basemap',
    },
    source: getArcGisBasemapSource('Canvas/World_Light_Gray_Base'),
    visible: true,
  }),
];


export const basemapLayerGroup = new LayerGroup({
  properties: {
    title: 'All Basemaps',
  },
  layers: basemaps,
});
export const basemapLayers = basemapLayerGroup.getLayers().getArray();
export const basemapLayersByName = new Map(
  basemapLayers.map(layer => [layer.get('title') as string, layer])
);

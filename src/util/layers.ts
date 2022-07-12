import LayerGroup from 'ol/layer/Group';
import TileLayer from 'ol/layer/Tile';
// TODO: ArcGIS vectorTile basemaps
// import VectorTileLayer from 'ol/layer/VectorTile';
// import VectorTileSource from 'ol/source/VectorTile';

import {getUsgsBasemapSource} from './layerSource';


// USGS Basemaps
export const basemapUsgsTopo = new TileLayer({
  properties: {
    title: 'USGS Topographic',
    type: 'basemap',
  },
  source: getUsgsBasemapSource('USGSTopo'),
  visible: false,  // TODO: Necessary?
});
export const basemapUsgsImageryTopo = new TileLayer({
  properties: {
    title: 'USGS Topographic + Imagery',
    type: 'basemap',
  },
  source: getUsgsBasemapSource('USGSImageryTopo'),
  visible: false,  // TODO: Necessary?
});
export const basemapUsgsImageryOnly = new TileLayer({
  properties: {
    title: 'USGS Imagery',
    type: 'basemap',
  },
  source: getUsgsBasemapSource('USGSImageryOnly'),
});
export const basemapUsgsShadedReliefOnly = new TileLayer({
  properties: {
    title: 'USGS Shaded Relief',
    type: 'basemap',
  },
  source: getUsgsBasemapSource('USGSShadedReliefOnly'),
  visible: false,  // TODO: Necessary?
});
export const basemapUsgsHydroCached = new TileLayer({
  properties: {
    title: 'USGS Hydro Cached',
    type: 'basemap',
  },
  source: getUsgsBasemapSource('USGSHydroCached'),
  visible: false,  // TODO: Necessary?
});

// ArcGIS Basemaps
// TODO...


export const basemapLayerGroup = new LayerGroup({
  properties: {
    title: 'Basemaps',
  },
  layers: [
    basemapUsgsTopo,
    basemapUsgsImageryTopo,
    basemapUsgsImageryOnly,
    basemapUsgsShadedReliefOnly,
    basemapUsgsHydroCached,
  ],
});
export const basemapLayers = basemapLayerGroup.getLayers().getArray();
export const basemapLayersByName = new Map(
  basemapLayers.map(layer => [layer.get('title'), layer])
);

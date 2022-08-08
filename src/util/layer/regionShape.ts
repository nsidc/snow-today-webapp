import PluggableMap from 'ol/PluggableMap';
import GeoJSON from 'ol/format/GeoJSON';
import {Vector as VectorLayer} from 'ol/layer';
import {Vector as VectorSource} from 'ol/source';


export const regionShapeLayer = new VectorLayer({
  source: new VectorSource({
    features: [],
  }),
  visible: true,
  zIndex: 100,
});


export const showRegionShape = (
  // TODO: Better annotation:
  regionShape: any,
  openLayersMap: PluggableMap,
): void => {
  if (!regionShape) {
    throw new Error(`Bad region shape: ${regionShape}`);
  }
  const geoJsonFeatures = new GeoJSON().readFeatures(regionShape);
  const newSource = new VectorSource({
    features: geoJsonFeatures,
  })
  regionShapeLayer.setSource(newSource);
  
  // zoom to shape
  openLayersMap.getView().fit(newSource.getExtent());
}

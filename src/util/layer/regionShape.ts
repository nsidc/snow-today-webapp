import PluggableMap from 'ol/PluggableMap';
import GeoJSON from 'ol/format/GeoJSON';
import {Vector as VectorLayer} from 'ol/layer';
import {Vector as VectorSource} from 'ol/source';
import {Stroke, Style} from 'ol/style';


export const regionShapeLayer = new VectorLayer({
  source: new VectorSource({
    features: [],
  }),
  visible: true,
  zIndex: 100,
  style: new Style({
    stroke: new Stroke({
      color: '#3399CC',
      width: 2,
    }),
  }),
});


export const showRegionShape = (
  // TODO: Better annotation:
  regionShape: any,
  openLayersMap: PluggableMap,
): void => {
  if (!regionShape) {
    throw new Error(`Bad region shape: ${regionShape as string}`);
  }
  const geoJsonFeatures = new GeoJSON().readFeatures(regionShape);
  const newSource = new VectorSource({
    features: geoJsonFeatures,
  })
  regionShapeLayer.setSource(newSource);
  
  // zoom to shape
  openLayersMap.getView().fit(
    newSource.getExtent(),
    {
      padding: [20, 20, 20, 20],
    },
  );
}

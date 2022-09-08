import PluggableMap from 'ol/PluggableMap';
import GeoJSON from 'ol/format/GeoJSON';
import {Vector as VectorLayer} from 'ol/layer';
import {Vector as VectorSource} from 'ol/source';
import {Stroke, Style} from 'ol/style';

import _memoize from 'lodash/memoize';


export const regionShapeLayer = _memoize((mapId: string): VectorLayer<VectorSource> => (
  new VectorLayer({
    source: new VectorSource({
      features: [],
    }),
    visible: true,
    zIndex: 100,
    style: new Style({
      stroke: new Stroke({
        // color: '#3399CC',
        color: 'red',
        width: 3,
      }),
    }),
  })
));


export const showRegionShape = (
  mapId: string,
  // TODO: Better annotation:
  regionShape: object,
  openLayersMap: PluggableMap,
): void => {
  if (!regionShape) {
    throw new Error(`Bad region shape: ${regionShape as string}`);
  }
  const geoJsonFeatures = new GeoJSON().readFeatures(regionShape);
  const newSource = new VectorSource({
    features: geoJsonFeatures,
  })
  regionShapeLayer(mapId).setSource(newSource);
  
  // zoom to shape
  openLayersMap.getView().fit(
    newSource.getExtent(),
    {
      padding: [20, 20, 20, 20],
    },
  );
}

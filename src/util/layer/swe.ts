import Feature from 'ol/Feature';
import PluggableMap from 'ol/PluggableMap';
import Point from 'ol/geom/Point';
import {Vector as VectorLayer} from 'ol/layer';
import {transform} from 'ol/proj'
import {Vector as VectorSource} from 'ol/source';
import {Circle, Fill, Stroke, Style} from 'ol/style';

import _memoize from 'lodash/memoize';

import {SwePointsForOverlay} from '../../types/swe';
import {CRS_LONLAT, CRS_MAP} from '../../constants/crs';


export const swePointsLayer = _memoize((mapId: string): VectorLayer<VectorSource> => (
  new VectorLayer({
    source: new VectorSource({
      features: [],
    }),
    visible: true,
    zIndex: 100,
    style: new Style({
      image: new Circle({
        radius: 5,
        fill: new Fill({color: '#666666'}),
        stroke: new Stroke({color: 'blue', width: 3}),
      }),
    }),
  })
));


export const showSwePointsOverlay = (
  mapId: string,
  swePoints: SwePointsForOverlay,
  openLayersMap: PluggableMap,
): void => {
  const displayablePoints = swePoints.filter((point) => {
    return point.measurement_inches !== null && point.measurement_inches !== 0;
  });
  const features = displayablePoints.map((point) => new Feature({
    'geometry': new Point(transform([point.lon, point.lat], CRS_LONLAT, CRS_MAP)),
    'foo': point,
  }));
  // debugger;
  const newSource = new VectorSource({
    features: features,
  })
  swePointsLayer(mapId).setSource(newSource);
}

import Feature from 'ol/Feature';
import PluggableMap from 'ol/PluggableMap';
import Point from 'ol/geom/Point';
import {Vector as VectorLayer} from 'ol/layer';
import {transform} from 'ol/proj'
import {Vector as VectorSource} from 'ol/source';
import {Circle, Fill, Stroke, Style} from 'ol/style';
//import {Circle, Fill, Style} from 'ol/style';

import _memoize from 'lodash/memoize';

import {colorStopsFromVariableObject, findColorStopsNearestColor} from '../colormap';
import {SwePointsForOverlay, SwePointForOverlay} from '../../types/swe';
import {CRS_LONLAT, CRS_MAP} from '../../constants/crs';
import {IVariable} from '../../types/query/variables';


export const swePointsLayer = _memoize((mapId: string): VectorLayer<VectorSource> => (
  new VectorLayer({
    source: new VectorSource({
      features: [],
    }),
    visible: true,
    zIndex: 100,
  })
));

export const showSwePointsOverlay = (
  mapId: string,
  selectedSweVariable: IVariable,
  swePoints: SwePointsForOverlay,
  openLayersMap: PluggableMap,
): void => {
  const layer = swePointsLayer(mapId);

  const displayablePoints = swePoints.filter((point) => {
    return point.measurement_inches !== null && point.measurement_inches !== 0;
  });
  const features = displayablePoints.map((point) => new Feature({
    'geometry': new Point(transform([point.lon, point.lat], CRS_LONLAT, CRS_MAP)),
    'data': point,
  }));
  const newSource = new VectorSource({features: features})
  const colorStops = colorStopsFromVariableObject(selectedSweVariable);

  layer.setSource(newSource);
  layer.setStyle((feature) => {
    const featureData = feature.getProperties().data as SwePointForOverlay;
    const value = featureData.measurement_inches!;
    const color = findColorStopsNearestColor(colorStops, value);

    return new Style({
      image: new Circle({
        radius: 5,
        fill: new Fill({color}),
        stroke: new Stroke({color: 'black', width: 1}),
      }),
    });
  });
}

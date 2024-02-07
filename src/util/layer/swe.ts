import Feature from 'ol/Feature';
import PluggableMap from 'ol/PluggableMap';
import Point from 'ol/geom/Point';
import {Vector as VectorLayer} from 'ol/layer';
import {transform} from 'ol/proj'
import {Vector as VectorSource} from 'ol/source';
import {Circle, Fill, Stroke, Style} from 'ol/style';
//import {Circle, Fill, Style} from 'ol/style';

import _memoize from 'lodash/memoize';

import {findColorStopsNearestColor} from '@src/util/colormap';
// import {colorStopsFromVariableObject, findColorStopsNearestColor} from '@src/util/colormap';
import {SwePointsForOverlay, SwePointForOverlay} from '@src/types/swe';
import {CRS_LONLAT, CRS_MAP} from '@src/constants/crs';
import {IRichVariable} from '@src/types/query/variables';


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
  selectedSweVariable: IRichVariable | undefined,
  swePoints: SwePointsForOverlay,
  openLayersMap: PluggableMap,
): void => {
  const layer = swePointsLayer(mapId);
  if (
    swePoints.length === 0
    || selectedSweVariable === undefined
  ) {
    layer.setSource(new VectorSource({features: []}));
    return;
  }

  const displayablePoints = swePoints.filter((point) => {
    return point.measurement_inches !== null && point.measurement_inches !== 0;
  });
  const features = displayablePoints.map((point) => new Feature({
    'geometry': new Point(transform([point.lon, point.lat], CRS_LONLAT, CRS_MAP)),
    'data': point,
  }));
  const newSource = new VectorSource({features: features})
  // FIXME: Support swe colorstops again; see the function definition for more
  // notes...
  // const colorStops = colorStopsFromVariableObject(selectedSweVariable);
  const colorStops = [];

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

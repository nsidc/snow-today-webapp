import Feature from 'ol/Feature';
import PluggableMap from 'ol/PluggableMap';
import Point from 'ol/geom/Point';
import {Vector as VectorLayer} from 'ol/layer';
import {transform} from 'ol/proj'
import {Vector as VectorSource} from 'ol/source';
// import {Circle, Fill, Stroke, Style, Text} from 'ol/style';
import {Circle, Fill, RegularShape, Stroke, Style} from 'ol/style';
//import {Circle, Fill, Style} from 'ol/style';

import _memoize from 'lodash/memoize';

import {colorStopsFromVariableObject, findColorStopsNearestColor} from '@src/util/colormap';
import {SwePointsForOverlay, SwePointForOverlay} from '@src/types/swe';
import {CRS_LONLAT, CRS_MAP} from '@src/constants/crs';
import {ISweRichVariable} from '@src/types/query/variables';


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
  selectedSweVariable: ISweRichVariable | undefined,
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
    return true; //point.measurement_inches !== null; // && point.measurement_inches !== 0;
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

    if (value === 0 || value == null) {
      return [
        // Outer Circle
        new Style({
          image: new Circle({
            radius: 5,
            fill: new Fill({ color }),
            stroke: new Stroke({ color: 'black', width: 1 }),
          }),
        }),
        // Inner "X"
        new Style({
          image: new RegularShape({
            points: 4,
            radius: 4,
            radius2: 0, // Collapses shape to crosshair lines
            angle: Math.PI / 4, // Rotates "+" to "X"
            stroke: new Stroke({ color: 'red', width: 1.5 }),
          }),
        }),
        // new Style({
        //   text: new Text({
        //     text: '!',
        //     font: 'bold 16px sans-serif',
        //     fill: new Fill({ color: 'red' }),
        //     offsetY: -1,
        //     textAlign: 'center',
        //     textBaseline: 'middle',
        //   })
        // }),
      ];
    }

    return new Style({
      image: new Circle({
        radius: 5,
        fill: new Fill({color}),
        stroke: new Stroke({color: 'black', width: 1}),
      }),
    });
  });
}

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



import {getDefaultStore} from 'jotai';
import {showZeroOrMissingEnabledAtom} from '@src/state/client/showZeroOrMissingEnabled';

const store = getDefaultStore();


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

  const features = swePoints.map((point) => new Feature({
    'geometry': new Point(transform([point.lon, point.lat], CRS_LONLAT, CRS_MAP)),
    'data': point,
  }));

  const newSource = new VectorSource({features: features})
  const colorStops = colorStopsFromVariableObject(selectedSweVariable);

  layer.setSource(newSource);
  layer.setStyle((feature) => {
    // Use the store to get the current value of the toggle at all times
    const showZeroOrMissingEnabled = store.get(showZeroOrMissingEnabledAtom);
    const featureData = feature.getProperties().data as SwePointForOverlay;
    const value = featureData.measurement_inches;
    const isZeroOrMissing = value === 0 || value == null;

    // If there is no value for this feature, and the toggle is off, return
    // undefined so it won't show up
    if (!showZeroOrMissingEnabled && isZeroOrMissing) {
      return undefined;
    }

    // Basic style for all points, even those with missing values
    const color = findColorStopsNearestColor(colorStops, value!);
    const baseStyle = new Style({
      image: new Circle({
        radius: 5,
        fill: new Fill({ color }),
        stroke: new Stroke({ color: 'black', width: 1 }),
      }),
    });
    const zeroBaseStyle = new Style({
      image: new Circle({
        radius: 5,
        fill: new Fill({ color: 'yellow' }),
        stroke: new Stroke({ color: 'black', width: 1 }),
      }),
    });
    const missingBaseStyle = new Style({
      image: new Circle({
        radius: 5,
        fill: new Fill({ color: 'magenta' }),
        stroke: new Stroke({ color: 'black', width: 1 }),
      }),
    });

    // Missing values have an X in them
    if (isZeroOrMissing && showZeroOrMissingEnabled) {
      const zmStyle = value === 0 ? zeroBaseStyle : missingBaseStyle;
      const xStyle = new Style({
        image: new RegularShape({
          points: 4,
          radius: 4,
          radius2: 0,
          angle: Math.PI / 4,
          stroke: new Stroke({ color: 'red', width: 1 }),
        }),
      });
      return [zmStyle, xStyle];
    }

    // If it gets here, we just use regular styling
    return baseStyle;
  });
}

export const toggleShowZeroOrMissing = (
  mapId: string,
): void => {
  const layer = swePointsLayer(mapId);
  layer.changed();
};

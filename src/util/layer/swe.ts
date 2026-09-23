import Feature from 'ol/Feature';
import PluggableMap from 'ol/PluggableMap';
import Point from 'ol/geom/Point';
import {Vector as VectorLayer} from 'ol/layer';
import {transform} from 'ol/proj'
import {Vector as VectorSource} from 'ol/source';
import {Circle, Fill, RegularShape, Stroke, Style} from 'ol/style';

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
    updateWhileAnimating: true,
    updateWhileInteracting: true,
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
  layer.setStyle((feature, resolution) => {
    // Use the store to get the current value of the toggle at all times
    const showZeroOrMissingEnabled = store.get(showZeroOrMissingEnabledAtom);
    const featureData = feature.getProperties().data as SwePointForOverlay;
    const value = featureData.measurement_value;
    const isZeroOrMissing = value === 0 || value === null;

    // If there is no value for this feature, and the toggle is off, return
    // undefined so it won't show up
    if (!showZeroOrMissingEnabled && isZeroOrMissing) {
      return undefined;
    }

    const minRes = 1400;
    const maxRes = 4323;
    const minRad = 2;
    const minXRad = 3;
    const maxRad = 7;
    const sizeScaleRate = 1.6;

    const clampedRes = Math.max(minRes, Math.min(maxRes, resolution));

    const logMin = Math.log(minRes);
    const logMax = Math.log(maxRes);

    const baseProgress = (logMax - Math.log(clampedRes)) / (logMax - logMin);
    const curvedProgress = Math.pow(baseProgress, sizeScaleRate);

    const dynamicRadius = minRad + curvedProgress * (maxRad - minRad);
    const xRadius = Math.max(1, dynamicRadius * 0.8);

    // Basic style for all points, even those with missing values
    const color = findColorStopsNearestColor(colorStops, value!);
    const baseStyle = new Style({
      image: new Circle({
        radius: dynamicRadius,
        fill: new Fill({ color }),
        stroke: new Stroke({ color: 'black', width: 1 }),
      }),
      zIndex: 100,
    });
    const zeroBaseStyle = new Style({
      image: new Circle({
        radius: dynamicRadius,
        fill: new Fill({ color: 'yellow' }),
        stroke: new Stroke({ color: 'black', width: 1 }),
      }),
      zIndex: 0,
    });
    const missingBaseStyle = new Style({
      image: new Circle({
        radius: dynamicRadius,
        fill: new Fill({ color: 'magenta' }),
        stroke: new Stroke({ color: 'black', width: 1 }),
      }),
      zIndex: 0,
    });

    // Missing values have an X in them
    if (isZeroOrMissing && showZeroOrMissingEnabled) {
      const strokeColor = value === 0 ? 'red' : 'black';
      const zmStyle = value === 0 ? zeroBaseStyle : missingBaseStyle;
      const xStyle = new Style({
        image: new RegularShape({
          points: 4,
          radius: xRadius,
          radius2: 0,
          angle: Math.PI / 4,
          stroke: new Stroke({ color: strokeColor, width: 1.5 }),
        }),
      });
      if (xRadius >= minXRad)
        return [zmStyle, xStyle];
      else
        return zmStyle;
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

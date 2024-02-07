import {useEffect } from 'react';
import type {RefObject} from 'react';

import Feature from 'ol/Feature';
import OpenLayersMap from 'ol/Map'
import type MapBrowserEvent from 'ol/MapBrowserEvent';
import Overlay from 'ol/Overlay';
import View from 'ol/View'
import BaseLayer from 'ol/layer/Base';
import {
  FullScreen,
  ScaleLine,
  defaults as defaultControls
} from 'ol/control';
import {Coordinate} from 'ol/coordinate';
import {click} from 'ol/events/condition';
import Select, {SelectEvent} from 'ol/interaction/Select';
import * as style from 'ol/style';

import {IAvailableVariablesIndex} from '@src/state/client/derived/availableVariables';
import {
  OptionalOpenLayersMap,
  OptionalOverlay,
  OptionalSelect,
} from '@src/types/SlippyMap';
import {StateSetter} from '@src/types/misc';
import {IRichVariable, IRichSuperRegionVariable} from '@src/types/query/variables';
import {SwePointsForOverlay} from '@src/types/swe';
import {basemapLayerGroup} from '@src/util/layer/basemaps';
import {
  rasterLayer,
  changeRasterVariable,
  notProcessedLayer,
  toggleNotProcessedLayer,
} from '@src/util/layer/raster';
import {showSwePointsOverlay, swePointsLayer} from '@src/util/layer/swe';
import {regionShapeLayer, showRegionShape} from '@src/util/layer/regionShape';
import {showBasemapLayer} from '@src/util/layer/switch';

const sharedView = new View({
  projection: 'EPSG:3857',
  center: [-11686663, 4828794],
  resolution: 1000,
  maxZoom: 14,
});


// When component is first loaded, populate the map and other initial
// state.
export const useSlippyMapInit = (
  slippyMapUid: string,
  slippyMapHtmlElement: RefObject<HTMLDivElement>,
  overlayElement: RefObject<HTMLDivElement>,
  clickHandler: (event: MapBrowserEvent<any>) => void,
  selectHandler: (event: SelectEvent) => void,
  setOpenLayersMap: StateSetter<OptionalOpenLayersMap>,
  setFeatureInfoOverlay: StateSetter<OptionalOverlay>,
  setSelectInteraction: StateSetter<OptionalSelect>,
): void => {
  useEffect(() => {
    const featureInfoOverlay = new Overlay({
      element: overlayElement.current!,
    });

    const initialOpenLayersMap = new OpenLayersMap({
      target: slippyMapHtmlElement.current || undefined,
      layers: [
        basemapLayerGroup(slippyMapUid),
        rasterLayer(slippyMapUid),
        notProcessedLayer(slippyMapUid),
        regionShapeLayer(slippyMapUid),
        swePointsLayer(slippyMapUid),
      ],
      overlays: [featureInfoOverlay],
      view: sharedView,
      pixelRatio: 1,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      controls: defaultControls().extend([
        new FullScreen(),
        new ScaleLine(),
      ]),
    });

    initialOpenLayersMap.on('click', clickHandler);

    // We have to add the interaction after instantiating `initialMap` because
    // we want to take advantage of the default interactions (click-and-drag to
    // pan, etc.)
    const initialSelectInteraction = new Select({
      condition: click,
      style: new style.Style({
        image: new style.Circle({
          radius: 10,
          stroke: new style.Stroke({
            color: '#D04721',
            width: 3,
          }),
          fill: new style.Fill({
            color: '#ffffff',
          }),
        }),
      }),
    });

    // TODO: Is this the right thing to do? Here, usual control flow is
    // inverted, where instead of updating the map in response to a React state
    // change (an Effect), we're updating React state in response to a map
    // change. I think this is needed because we have to respond to user clicks
    // on map objects. However, there are cases where we select things
    // programmatically, and for that it would make more sense to update the
    // React state and having the map respond in an Effect. But how would we
    // tell the difference in _how_ the state was changed?
    initialSelectInteraction.on('select', selectHandler);
    initialOpenLayersMap.addInteraction(initialSelectInteraction);

    // Populate states that depend on map initialization
    setOpenLayersMap(initialOpenLayersMap);
    setFeatureInfoOverlay(featureInfoOverlay);
    setSelectInteraction(initialSelectInteraction);

  /* eslint-disable react-hooks/exhaustive-deps */
  }, [])
  /* eslint-enable react-hooks/exhaustive-deps */
};

export const useMapView = (
  mapView: View | undefined,
  openLayersMap: OptionalOpenLayersMap,
): void => {
  useEffect(() => {
    if (
      openLayersMap === undefined
      || mapView === undefined
    ) {
      return;
    }
    openLayersMap.setView(mapView);
  }, [openLayersMap, mapView]);
}

export const useNotProcessedLayerToggle = (
  slippyMapUid: string,
  notProcessedLayerEnabled: boolean,
  selectedSatelliteVariableObject: IRichVariable | undefined,
  // FIXME: no any...
  availableVariables: IAvailableVariablesIndex | undefined,
): void => {
  useEffect(() => {
    if (
      selectedSatelliteVariableObject === undefined
      || availableVariables === undefined
    ) {
      return;
    }

    const notProcessedVariables = Object.entries(availableVariables).filter(
      ([key, params]) => (
        params.layerType === 'raster_notprocessed'
        && params.sensor == selectedSatelliteVariableObject.sensor
        && params.platform == selectedSatelliteVariableObject.platform
        && params.algorithm == selectedSatelliteVariableObject.algorithm
      )
    );

    if (notProcessedVariables.length !== 1) {
      throw new Error(
        `Exactly one matching notprocessed variable is expected. Got ${notProcessedVariables}.`
      );
    }
    const notProcessedVariableParams = notProcessedVariables[0][1];

    toggleNotProcessedLayer(slippyMapUid, notProcessedLayerEnabled, notProcessedVariableParams)
  }, [slippyMapUid, notProcessedLayerEnabled, selectedSatelliteVariableObject, availableVariables]);
}

// When the selected basemap is updated, update the map to reflect this.
export const useSelectedBasemap = (
  basemapLayer: BaseLayer,
  openLayersMap: OptionalOpenLayersMap,
): void => {
  useEffect(() => {
    if (
      openLayersMap === undefined
      || basemapLayer === undefined
    ) {
      return;
    }

    console.debug(`Updating basemap to ${String(basemapLayer.get('title'))}`);
    showBasemapLayer(openLayersMap, basemapLayer);
  }, [basemapLayer, openLayersMap]);
}

export const useSelectedRegionShape = (
  slippyMapUid: string,
  selectedRegionShape: object | undefined,
  openLayersMap: OptionalOpenLayersMap,
): void => {
  useEffect(() => {
    if (
      openLayersMap === undefined
      || selectedRegionShape === undefined
    ) {
      return;
    }

    showRegionShape(slippyMapUid, selectedRegionShape, openLayersMap);
  }, [slippyMapUid, selectedRegionShape, openLayersMap]);
}

export const useSelectedRasterVariable = (
  slippyMapUid: string,
  selectedSatelliteVariableObject: IRichSuperRegionVariable | undefined,
  openLayersMap: OptionalOpenLayersMap,
): void => {
  useEffect(() => {
    if (
      openLayersMap === undefined
      || selectedSatelliteVariableObject === undefined
    ) {
      return;
    }

    changeRasterVariable(slippyMapUid, selectedSatelliteVariableObject, openLayersMap);
  }, [slippyMapUid, selectedSatelliteVariableObject, openLayersMap]);
}

export const useRasterOpacity = (
  slippyMapUid: string,
  rasterOpacity: number,
  openLayersMap: OptionalOpenLayersMap,
): void => {
  useEffect(() => {
    if (
      openLayersMap === undefined
      || rasterOpacity === undefined
    ) {
      return;
    }

    rasterLayer(slippyMapUid).setOpacity(rasterOpacity / 100);
  }, [slippyMapUid, rasterOpacity, openLayersMap]);
}

export const useSelectedSweVariable = (
  slippyMapUid: string,
  selectedSweVariable: IRichVariable | undefined,
  swePointsForOverlay: SwePointsForOverlay,
  openLayersMap: OptionalOpenLayersMap,
): void => {
  useEffect(() => {
    if (openLayersMap === undefined) {
      return;
    }

    showSwePointsOverlay(
      slippyMapUid,
      selectedSweVariable,
      swePointsForOverlay,
      openLayersMap,
    );
  }, [slippyMapUid, selectedSweVariable, swePointsForOverlay, openLayersMap]);
}

// When a feature is selected, position the overlay appropriately.
export const useSelectedFeature = (
  featureInfoOverlay: OptionalOverlay,
  selectedFeatures: Array<Feature>,
  selectInteraction: OptionalSelect,
  openLayersMap: OptionalOpenLayersMap,
): void => {
  useEffect(() => {
    if (
      openLayersMap === undefined
      || featureInfoOverlay === undefined
      || selectInteraction === undefined
    ) {
      return;
    }
    if (selectedFeatures.length === 0) {
      // .clear is not documented, but is present on the Collection object.
      // Danger?
      // @ts-ignore: TS2339
      selectInteraction.getFeatures().clear();
      return;
    }

    // .getCoordinates is not documented, but is present on the object.
    // Danger?
    // @ts-ignore TS2339
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const pos = (selectedFeatures[0].getGeometry()!.getCoordinates()) as Coordinate;
    featureInfoOverlay.setPosition(pos);
  }, [featureInfoOverlay, selectedFeatures, selectInteraction, openLayersMap]);
}

import {useEffect } from 'react';
import type {RefObject} from 'react';

import OpenLayersMap from 'ol/Map'
import type MapBrowserEvent from 'ol/MapBrowserEvent';
import View from 'ol/View'
import BaseLayer from 'ol/layer/Base';
import {
  FullScreen,
  ScaleLine,
  defaults as defaultControls
} from 'ol/control';

import {OptionalOpenLayersMap} from '../../types/SlippyMap';
import {StateSetter} from '../../types/misc';
import {
  ISatelliteVariable,
  ISatelliteVariableIndex,
} from '../../types/query/satelliteVariables';
import {SwePointsForOverlay} from '../../types/swe';
import {basemapLayerGroup} from '../layer/basemaps';
import {
  rasterLayer,
  changeRasterVariable,
  notProcessedLayer,
  toggleNotProcessedLayer,
} from '../layer/raster';
import {showSwePointsOverlay, swePointsLayer} from '../layer/swe';
import {
  regionShapeLayer,
  showRegionShape,
} from '../layer/regionShape';
import {} from '../layer/swe';
import {showBasemapLayer} from '../layer/switch';
import {queryClient} from '../query';
import {SERVERSTATE_KEY_VARIABLES_INDEX} from '../../serverState/variablesIndex';

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
  clickHandler: (event: MapBrowserEvent<any>) => void,
  setOpenLayersMap: StateSetter<OptionalOpenLayersMap>,
): void => {
  useEffect(() => {
    const initialOpenLayersMap = new OpenLayersMap({
      target: slippyMapHtmlElement.current || undefined,
      layers: [
        basemapLayerGroup(slippyMapUid),
        rasterLayer(slippyMapUid),
        notProcessedLayer(slippyMapUid),
        regionShapeLayer(slippyMapUid),
        swePointsLayer(slippyMapUid),
      ],
      view: sharedView,
      pixelRatio: 1,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      controls: defaultControls().extend([
        new FullScreen(),
        new ScaleLine(),
      ]),
    });

    initialOpenLayersMap.on('click', clickHandler);

    // Populate states that depend on map initialization
    setOpenLayersMap(initialOpenLayersMap);

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
): void => {
  const variablesIndex = queryClient.getQueryData([SERVERSTATE_KEY_VARIABLES_INDEX]) as ISatelliteVariableIndex;
  useEffect(() => {
    if (variablesIndex === undefined) {
      return;
    }
    const notProcessedVariables = Object.entries(variablesIndex).filter(
      ([key, params]) => params.type === 'raster_notprocessed'
    );
    if (notProcessedVariables.length !== 1) {
      throw new Error('Exactly one notprocessed variable is required.');
    }
    const notProcessedVariableParams = notProcessedVariables[0][1];

    toggleNotProcessedLayer(slippyMapUid, notProcessedLayerEnabled, notProcessedVariableParams)
  }, [slippyMapUid, notProcessedLayerEnabled]);
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
  selectedSatelliteVariableObject: ISatelliteVariable | undefined,
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

export const useSweOverlayPoints = (
  slippyMapUid: string,
  swePointsForOverlay: SwePointsForOverlay,
  openLayersMap: OptionalOpenLayersMap,
): void => {
  useEffect(() => {
    if (
      openLayersMap === undefined
      || swePointsForOverlay.length == 0
    ) {
      return;
    }

    showSwePointsOverlay(slippyMapUid, swePointsForOverlay, openLayersMap);
  }, [slippyMapUid, swePointsForOverlay, openLayersMap]);
}

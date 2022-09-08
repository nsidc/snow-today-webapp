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
import {ISatelliteVariableOptions} from '../../types/query/satelliteVariables';
import {basemapLayerGroup} from '../layer/basemaps';
import {rasterLayer, changeRasterVariable} from '../layer/raster';
import {regionShapeLayer, showRegionShape} from '../layer/regionShape';
import {showBasemapLayer} from '../layer/switch';


// When component is first loaded, populate the map and other initial
// state.
export const useSlippyMapInit = (
  slippyMapHtmlElement: RefObject<HTMLDivElement>,
  clickHandler: (event: MapBrowserEvent<any>) => void,
  setOpenLayersMap: StateSetter<OptionalOpenLayersMap>,
): void => {
  useEffect(() => {
    const initialOpenLayersMap = new OpenLayersMap({
      target: slippyMapHtmlElement.current || undefined,
      layers: [basemapLayerGroup, rasterLayer, regionShapeLayer],
      view: new View({
        projection: 'EPSG:3857',
        center: [-11686663, 4828794],
        resolution: 1000,
        maxZoom: 14,
      }),
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

export const useSelectedRegion = (
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

    showRegionShape(selectedRegionShape, openLayersMap);
  }, [selectedRegionShape, openLayersMap]);
}

export const useSelectedRasterVariable = (
  selectedSatelliteVariableObject: ISatelliteVariableOptions | undefined,
  openLayersMap: OptionalOpenLayersMap,
): void => {
  useEffect(() => {
    if (
      openLayersMap === undefined
      || selectedSatelliteVariableObject === undefined
    ) {
      return;
    }

    changeRasterVariable(selectedSatelliteVariableObject, openLayersMap);
  }, [selectedSatelliteVariableObject, openLayersMap]);
}

export const useRasterOpacity = (
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

    rasterLayer.setOpacity(rasterOpacity / 100);
  }, [rasterOpacity, openLayersMap]);
}

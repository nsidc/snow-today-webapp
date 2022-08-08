// Inspired by a very helpful blog post:
//     https://taylor.callsen.me/using-openlayers-with-react-functional-components/

import React, { useState, useEffect, useRef } from 'react';
import type {RefObject} from 'react';
import {useRecoilValue} from 'recoil';
import {UseQueryResult} from '@tanstack/react-query';

import 'ol/ol.css';
import BaseLayer from 'ol/layer/Base';
import OpenLayersMap from 'ol/Map'
import View from 'ol/View'
import {
  FullScreen,
  ScaleLine,
  defaults as defaultControls
} from 'ol/control';
import {transform} from 'ol/proj'
import {toStringXY} from 'ol/coordinate';
import type MapBrowserEvent from 'ol/MapBrowserEvent';

import '../style/Map.css';
import selectedBasemapObjectAtom from '../clientState/selectedBasemapObject';
import selectedRegionAtom from '../clientState/selectedRegion';
import useRegionShape from '../serverState/regionShape';
import {
  OptionalCoordinate,
  OptionalOpenLayersMap,
} from '../types/SlippyMap';
import {StateSetter} from '../types/misc';
import {rasterLayer} from '../util/layer/raster';
import {regionShapeLayer} from '../util/layer/regionShape';
import {basemapLayerGroup} from '../util/layer/basemaps';
import {showBasemapLayer} from '../util/layer/switch';
import {showRegionShape} from '../util/layer/regionShape';


// When this component is first loaded, populate the map and other initial
// state.
const useSlippyMapInit = (
  selectedBasemap: BaseLayer,
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
const useSelectedBasemap = (
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

    console.log(`Updating basemap to ${String(basemapLayer.get('title'))}`);
    showBasemapLayer(openLayersMap, basemapLayer);
  }, [basemapLayer, openLayersMap]);
}

const useSelectedRegion = (
  selectedRegionShapeQuery: UseQueryResult,
  openLayersMap: OptionalOpenLayersMap,
): void => {
  useEffect(() => {
    if (
      openLayersMap === undefined
      || selectedRegionShapeQuery.data === undefined
    ) {
      return;
    }

    console.log(`Zooming to: ${selectedRegionShapeQuery.data}`);
    showRegionShape(selectedRegionShapeQuery.data, openLayersMap);
  }, [selectedRegionShapeQuery, openLayersMap]);
}

const SlippyMap: React.FC = () => {

  // TODO: More specific types; maybe some way to succinctly make optional?
  const [ openLayersMap, setOpenLayersMap ] = useState<OptionalOpenLayersMap>();
  const [ selectedCoord, setSelectedCoord ] =
      useState<OptionalCoordinate>();

  const slippyMapHtmlElement = useRef<HTMLDivElement | null>(null);
  const slippyMapRef = useRef<OpenLayersMap | null>(null);

  const selectedBasemap = useRecoilValue(selectedBasemapObjectAtom);
  const selectedRegion = useRecoilValue(selectedRegionAtom);
  const selectedRegionShapeQuery = useRegionShape(selectedRegion);
  console.log(selectedRegionShapeQuery.data);

  const handleSlippyMapClick = (event: MapBrowserEvent<any>) => {
    if ( !slippyMapRef || !slippyMapRef.current ) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const clickedCoord = slippyMapRef.current.getCoordinateFromPixel(event.pixel);
    const transormedCoord = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326')

    setSelectedCoord(transormedCoord);
  }

  // Register behaviors
  useSlippyMapInit(
    selectedBasemap,
    slippyMapHtmlElement,
    handleSlippyMapClick,
    setOpenLayersMap,
  );
  useSelectedBasemap(
    selectedBasemap,
    openLayersMap,
  );
  useSelectedRegion(
    selectedRegionShapeQuery,
    openLayersMap,
  );

  slippyMapRef.current = openLayersMap || null;

  return (
    <div className="Map">

      <div ref={slippyMapHtmlElement} className="map-container"></div>

      <div className="clicked-coord-label">
        <p>{ (selectedCoord) ? toStringXY(selectedCoord, 5) : '' }</p>
      </div>

    </div>
  )
}

export default SlippyMap

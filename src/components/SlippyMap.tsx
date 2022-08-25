// Inspired by a very helpful blog post:
//     https://taylor.callsen.me/using-openlayers-with-react-functional-components/

import React, { useState, useRef } from 'react';
import {useRecoilValue} from 'recoil';

import 'ol/ol.css';
import OpenLayersMap from 'ol/Map'
import {transform} from 'ol/proj'
import {toStringXY} from 'ol/coordinate';
import type MapBrowserEvent from 'ol/MapBrowserEvent';

import '../style/SlippyMap.css';
import '../style/card.css';
import rasterOpacityAtom from '../clientState/rasterOpacity';
import selectedBasemapObjectAtom from '../clientState/derived/selectedBasemapObject';
import selectedRegionObjectAtom from '../clientState/derived/selectedRegionObject';
import selectedSatelliteVariableObjectAtom from '../clientState/derived/selectedSatelliteVariableObject';
import useRegionShape from '../serverState/regionShape';
import {
  OptionalCoordinate,
  OptionalOpenLayersMap,
} from '../types/SlippyMap';
import {
  useRasterOpacity,
  useSlippyMapInit,
  useSelectedBasemap,
  useSelectedRegion,
  useSelectedRasterVariable,
} from '../util/sideEffects/slippyMap';


const SlippyMap: React.FC = () => {
  // TODO: More specific types; maybe some way to succinctly make optional?
  const [ openLayersMap, setOpenLayersMap ] = useState<OptionalOpenLayersMap>();
  const [ selectedCoord, setSelectedCoord ] =
      useState<OptionalCoordinate>();

  const slippyMapHtmlElement = useRef<HTMLDivElement | null>(null);
  const slippyMapRef = useRef<OpenLayersMap | null>(null);

  const rasterOpacity = useRecoilValue(rasterOpacityAtom);
  const selectedBasemap = useRecoilValue(selectedBasemapObjectAtom);
  const selectedRegionObject = useRecoilValue(selectedRegionObjectAtom);
  const selectedSatelliteVariableObject = useRecoilValue(selectedSatelliteVariableObjectAtom);

  const selectedRegionShapeQuery = useRegionShape(selectedRegionObject ? selectedRegionObject['file'] : undefined);

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
    selectedRegionShapeQuery.data,
    openLayersMap,
  );
  useSelectedRasterVariable(
    selectedSatelliteVariableObject,
    openLayersMap,
  );
  useRasterOpacity(
    rasterOpacity,
    openLayersMap,
  );

  slippyMapRef.current = openLayersMap || null;

  return (
    <div className={"Map card"}>

      <div ref={slippyMapHtmlElement} className="map-container"></div>

      <div className="clicked-coord-label">
        <p>{ (selectedCoord) ? toStringXY(selectedCoord, 5) : '' }</p>
      </div>

    </div>
  )
}

export default SlippyMap

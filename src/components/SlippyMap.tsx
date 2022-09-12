// Inspired by a very helpful blog post:
//     https://taylor.callsen.me/using-openlayers-with-react-functional-components/

import React, { useState, useRef } from 'react';
import {useRecoilValue} from 'recoil';

import 'ol/ol.css';
import OpenLayersMap from 'ol/Map'
import {transform} from 'ol/proj'
import {toStringXY} from 'ol/coordinate';
import type MapBrowserEvent from 'ol/MapBrowserEvent';

import _uniqueId from 'lodash/uniqueId';

import '../style/SlippyMap.css';
import rasterOpacityAtom from '../clientState/rasterOpacity';
import selectedBasemapObjectAtom from '../clientState/derived/selectedBasemapObject';
import selectedGenericRegionObjectAtom from '../clientState/derived/selectedGenericRegionObject';
import useRegionShapeQuery from '../serverState/regionShape';
import {
  OptionalCoordinate,
  OptionalOpenLayersMap,
} from '../types/SlippyMap';
import {ISatelliteVariableOptions} from '../types/query/satelliteVariables';
import {
  useRasterOpacity,
  useSlippyMapInit,
  useSelectedBasemap,
  useSelectedRegion,
  useSelectedRasterVariable,
} from '../util/sideEffects/slippyMap';


interface ISlippyMapProps {
  selectedSatelliteVariableObject: ISatelliteVariableOptions | undefined;
}


const SlippyMap: React.FC<ISlippyMapProps> = (props) => {
  const [slippyMapUid, ] = useState<string>(_uniqueId());
  // TODO: More specific types; maybe some way to succinctly make optional?
  const [openLayersMap, setOpenLayersMap] = useState<OptionalOpenLayersMap>();
  const [selectedCoord, setSelectedCoord] = useState<OptionalCoordinate>();

  const slippyMapHtmlElement = useRef<HTMLDivElement | null>(null);
  const slippyMapRef = useRef<OpenLayersMap | null>(null);

  const rasterOpacity = useRecoilValue(rasterOpacityAtom);
  const selectedBasemap = useRecoilValue(selectedBasemapObjectAtom(slippyMapUid));
  const selectedGenericRegionObject = useRecoilValue(selectedGenericRegionObjectAtom);

  const selectedRegionShapeQuery = useRegionShapeQuery(
    selectedGenericRegionObject ? selectedGenericRegionObject['shape_path'] : undefined,
  );

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
  // TODO: Create a memoized function for getting the map from the UID to
  //       reduce the number of params being passed.
  useSlippyMapInit(
    slippyMapUid,
    slippyMapHtmlElement,
    handleSlippyMapClick,
    setOpenLayersMap,
  );
  // NOTE: This function searches the map for layers, so does not require the
  //       UID for lookup.
  useSelectedBasemap(
    selectedBasemap,
    openLayersMap,
  );
  useSelectedRegion(
    slippyMapUid,
    selectedRegionShapeQuery.data,
    openLayersMap,
  );
  useSelectedRasterVariable(
    slippyMapUid,
    props.selectedSatelliteVariableObject,
    openLayersMap,
  );
  useRasterOpacity(
    slippyMapUid,
    rasterOpacity,
    openLayersMap,
  );

  slippyMapRef.current = openLayersMap || null;

  return (
    <div className={"SlippyMap"}>

      <div
        id={`map-container-${slippyMapUid}`}
        ref={slippyMapHtmlElement}
        className="map-container">
      </div>

      <div className="clicked-coord-label">
        <p>{ (selectedCoord) ? toStringXY(selectedCoord, 5) : '' }</p>
      </div>

    </div>
  )
}

export default SlippyMap

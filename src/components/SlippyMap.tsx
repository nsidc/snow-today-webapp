// Inspired by a very helpful blog post:
//     https://taylor.callsen.me/using-openlayers-with-react-functional-components/

import React, { useLayoutEffect, useState, useRef } from 'react';
import {useRecoilValue} from 'recoil';

import 'ol/ol.css';
import OpenLayersMap from 'ol/Map'
import {transform} from 'ol/proj'
import {toStringXY} from 'ol/coordinate';
import type MapBrowserEvent from 'ol/MapBrowserEvent';

import _uniqueId from 'lodash/uniqueId';

import '../style/SlippyMap.css';
import {dataServerUrl} from '../constants/dataServer';
import notProcessedLayerEnabledAtom from '../state/client/notProcessedLayerEnabled';
import rasterOpacityAtom from '../state/client/rasterOpacity';
import selectedBasemapLayerAtom from '../state/client/derived/selectedBasemapLayer';
import selectedSuperRegionAtom from '../state/client/derived/selectedSuperRegion';
import selectedGenericRegionAtom from '../state/client/derived/selectedGenericRegion';
import mapViewAtom from '../state/client/derived/mapView';
import useRegionShapeQuery from '../serverState/regionShape';
import {
  OptionalCoordinate,
  OptionalOpenLayersMap,
} from '../types/SlippyMap';
import {ISatelliteVariable} from '../types/query/satelliteVariables';
import {
  useMapView,
  useNotProcessedLayerToggle,
  useRasterOpacity,
  useSlippyMapInit,
  useSelectedBasemap,
  useSelectedRegionShape,
  useSelectedRasterVariable,
} from '../util/sideEffects/slippyMap';
import SlippyMapLegend from './SlippyMapLegend';


interface ISlippyMapProps {
  selectedSatelliteVariable: ISatelliteVariable | undefined;
}


const SlippyMap: React.FC<ISlippyMapProps> = (props) => {
  const [slippyMapUid, ] = useState<string>(_uniqueId());
  // TODO: More specific types; maybe some way to succinctly make optional?
  const [openLayersMap, setOpenLayersMap] = useState<OptionalOpenLayersMap>();
  const [selectedCoord, setSelectedCoord] = useState<OptionalCoordinate>();
  const [componentWidth, setComponentWidth] = useState<number>(0);


  const slippyMapHtmlElement = useRef<HTMLDivElement>(null);
  const slippyMapRef = useRef<OpenLayersMap | null>(null);

  const notProcessedLayerEnabled = useRecoilValue(notProcessedLayerEnabledAtom);
  const rasterOpacity = useRecoilValue(rasterOpacityAtom);
  const selectedBasemap = useRecoilValue(selectedBasemapLayerAtom(slippyMapUid));
  const selectedGenericRegion = useRecoilValue(selectedGenericRegionAtom);
  const selectedSuperRegion = useRecoilValue(selectedSuperRegionAtom);

  const selectedRegionShapeQuery = useRegionShapeQuery(
    selectedGenericRegion ? selectedGenericRegion['shape_path'] : undefined,
  );
  const selectedSuperRegionShapeQuery = useRegionShapeQuery(
    selectedSuperRegion ? selectedSuperRegion['shape_path'] : undefined,
  )

  const mapView = useRecoilValue(mapViewAtom(selectedSuperRegionShapeQuery.data));

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
  useMapView(
    mapView,
    openLayersMap,
  );
  // NOTE: This function searches the map for layers, so does not require the
  //       UID for lookup.
  useSelectedBasemap(
    selectedBasemap,
    openLayersMap,
  );
  useSelectedRegionShape(
    slippyMapUid,
    selectedRegionShapeQuery.data,
    openLayersMap,
  );
  useSelectedRasterVariable(
    slippyMapUid,
    props.selectedSatelliteVariable,
    openLayersMap,
  );
  useRasterOpacity(
    slippyMapUid,
    rasterOpacity,
    openLayersMap,
  );
  useNotProcessedLayerToggle(
    slippyMapUid,
    notProcessedLayerEnabled,
  );
  useLayoutEffect(() => {
    if (!slippyMapHtmlElement || !slippyMapHtmlElement.current) {
      return;
    }
    setComponentWidth(slippyMapHtmlElement.current.offsetWidth);
  }, []);



  slippyMapRef.current = openLayersMap || null;
  const divId = `map-container-${slippyMapUid}`

  if (props.selectedSatelliteVariable === undefined) {
    return (
      <div
        id={divId}
        ref={slippyMapHtmlElement}
        className="map-container">
      </div>
    );
  }
  const legendUrl = `${dataServerUrl}/${props.selectedSatelliteVariable.legend_path}`;

  return (
    <div className={"SlippyMap"}>

      <div
        id={divId}
        ref={slippyMapHtmlElement}
        className="map-container">
      </div>

      <div className="clicked-coord-label">
        <p>{ (selectedCoord) ? toStringXY(selectedCoord, 5) : '' }</p>
      </div>

      <SlippyMapLegend
        imageUrl={legendUrl}
        parentWidthPx={componentWidth}
        mapUid={slippyMapUid} />

    </div>
  )
}

export default SlippyMap

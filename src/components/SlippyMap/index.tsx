// Inspired by a very helpful blog post:
//     https://taylor.callsen.me/using-openlayers-with-react-functional-components/

import React, { useLayoutEffect, useState, useRef } from 'react';
import {useRecoilValue} from 'recoil';

import 'ol/ol.css';
import Feature from 'ol/Feature';
import OpenLayersMap from 'ol/Map';
import {transform} from 'ol/proj';
import {toStringXY} from 'ol/coordinate';
import {SelectEvent} from 'ol/interaction/Select';
import type MapBrowserEvent from 'ol/MapBrowserEvent';

import _uniqueId from 'lodash/uniqueId';

import '../../style/SlippyMap.css';
import {CRS_LONLAT, CRS_MAP} from '../../constants/crs';
import notProcessedLayerEnabledAtom from '../../state/client/notProcessedLayerEnabled';
import rasterOpacityAtom from '../../state/client/rasterOpacity';
import selectedBasemapLayerAtom from '../../state/client/derived/selectedBasemapLayer';
import selectedSuperRegionAtom from '../../state/client/derived/selectedSuperRegion';
import selectedGenericRegionAtom from '../../state/client/derived/selectedGenericRegion';
import selectedSweVariableAtom from '../../state/client/derived/selectedSweVariable';
import swePointsForOverlayAtom from '../../state/client/derived/swePointsForOverlay';
import mapViewAtom from '../../state/client/derived/mapView';
import useRegionShapeQuery from '../../serverState/regionShape';
import {
  OptionalCoordinate,
  OptionalOpenLayersMap,
  OptionalOverlay,
  OptionalSelect,
} from '../../types/SlippyMap';
import {IVariable} from '../../types/query/variables';
import {
  useMapView,
  useNotProcessedLayerToggle,
  useRasterOpacity,
  useSlippyMapInit,
  useSelectedBasemap,
  useSelectedFeature,
  useSelectedRegionShape,
  useSelectedRasterVariable,
  useSelectedSweVariable,
} from '../../util/sideEffects/slippyMap';
import SlippyMapLegend from './Legend';
import SlippyMapTooltip from './Tooltip';


interface ISlippyMapProps {
  selectedSatelliteVariable: IVariable | undefined;
}


const SlippyMap: React.FC<ISlippyMapProps> = (props) => {
  const [slippyMapUid, ] = useState<string>(_uniqueId());
  // TODO: More specific types; maybe some way to succinctly make optional?
  const [openLayersMap, setOpenLayersMap] = useState<OptionalOpenLayersMap>();
  const [selectedCoord, setSelectedCoord] = useState<OptionalCoordinate>();
  const [componentWidth, setComponentWidth] = useState<number>(0);

  // State related to selecting feature and seeing its data
  const [selectedFeatures, setSelectedFeatures] = useState<Array<Feature>>([]);
  const [ featureInfoOverlay, setFeatureInfoOverlay ] =
    useState<OptionalOverlay>();
  const [ selectInteraction, setSelectInteraction ] =
    useState<OptionalSelect>();

  const slippyMapHtmlElement = useRef<HTMLDivElement>(null);
  const slippyMapRef = useRef<OpenLayersMap | null>(null);
  const overlayElement = useRef<HTMLDivElement | null>(null);

  const notProcessedLayerEnabled = useRecoilValue(notProcessedLayerEnabledAtom);
  const rasterOpacity = useRecoilValue(rasterOpacityAtom);
  const selectedBasemap = useRecoilValue(selectedBasemapLayerAtom(slippyMapUid));
  const selectedGenericRegion = useRecoilValue(selectedGenericRegionAtom);
  const selectedSuperRegion = useRecoilValue(selectedSuperRegionAtom);
  const selectedSweVariable = useRecoilValue(selectedSweVariableAtom);
  const swePointsForOverlay = useRecoilValue(swePointsForOverlayAtom);

  const selectedRegionShapeQuery = useRegionShapeQuery(
    selectedGenericRegion ? selectedGenericRegion['shape_path'] : undefined,
  );
  const selectedSuperRegionShapeQuery = useRegionShapeQuery(
    selectedSuperRegion ? selectedSuperRegion['shape_path'] : undefined,
  )

  const mapView = useRecoilValue(mapViewAtom(selectedSuperRegionShapeQuery.data));

  const handleFeatureSelect = (event: SelectEvent) => {
    setSelectedFeatures(event.selected);
  }
  const handleMapTipClose = () => {
    if (selectInteraction === undefined) {
      return;
    }
    // @ts-ignore: TS2339
    // .clear is not documented, but is present on the Collection object.
    // Danger?
    selectInteraction.getFeatures().clear();
    selectInteraction.dispatchEvent({
      type: 'select',
      // @ts-ignore TS2345
      // Typescript expects a BaseEvent. This isn't 100% match for a BaseEvent
      // or SelectEvent... How do?
      selected: [],
      // deselected: oldSelected,
    });
  }


  const handleSlippyMapClick = (event: MapBrowserEvent<any>) => {
    if ( !slippyMapRef || !slippyMapRef.current ) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const clickedCoord = slippyMapRef.current.getCoordinateFromPixel(event.pixel);
    const transormedCoord = transform(clickedCoord, CRS_MAP, CRS_LONLAT);

    setSelectedCoord(transormedCoord);
  }


  // Register behaviors
  // TODO: Create a memoized function for getting the map from the UID to
  //       reduce the number of params being passed.
  useSlippyMapInit(
    slippyMapUid,
    slippyMapHtmlElement,
    overlayElement,
    handleSlippyMapClick,
    handleFeatureSelect,
    setOpenLayersMap,
    setFeatureInfoOverlay,
    setSelectInteraction,
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
  useSelectedSweVariable(
    slippyMapUid,
    selectedSweVariable,
    swePointsForOverlay,
    openLayersMap,
  );
	useSelectedFeature(
    featureInfoOverlay,
    selectedFeatures,  
    selectInteraction,
    openLayersMap,
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

  return (
    <div className={"SlippyMap"}>

      <div
        id={divId}
        ref={slippyMapHtmlElement}
        className="map-container">
      </div>

      <div ref={overlayElement}>
        <SlippyMapTooltip
          features={selectedFeatures}
          onClose={handleMapTipClose} />
      </div>

      <div className="clicked-coord-label">
        <p>{ (selectedCoord) ? toStringXY(selectedCoord, 5) : '' }</p>
      </div>

      <SlippyMapLegend
        selectedSatelliteVariable={props.selectedSatelliteVariable}
        selectedSweVariable={selectedSweVariable}
        parentWidthPx={componentWidth}
        mapUid={slippyMapUid} />

    </div>
  );
}

export default SlippyMap;
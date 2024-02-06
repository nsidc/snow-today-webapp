// Inspired by a very helpful blog post:
//     https://taylor.callsen.me/using-openlayers-with-react-functional-components/

import React, {useState, useRef} from 'react';
import {useRecoilValue} from 'recoil';
import {useAtomValue} from 'jotai'

import 'ol/ol.css';
import Feature from 'ol/Feature';
import OpenLayersMap from 'ol/Map';
import {transform} from 'ol/proj';
import {toStringXY} from 'ol/coordinate';
import {SelectEvent} from 'ol/interaction/Select';
import type MapBrowserEvent from 'ol/MapBrowserEvent';

import _uniqueId from 'lodash/uniqueId';

import '@src/style/SlippyMap.css';
import '@src/style/card.css';
import {CRS_LONLAT, CRS_MAP} from '@src/constants/crs';
import LoadingIcon from '@src/components/common/LoadingIcon';
import {notProcessedLayerEnabledAtom} from '@src/state/client/notProcessedLayerEnabled';
import {rasterOpacityAtom} from '@src/state/client/rasterOpacity';
import {availableVariablesAtom} from '@src/state/client/derived/availableVariables';
import {selectedBasemapLayerAtomFamily} from '@src/state/client/derived/selectedBasemapLayer';
import {selectedSuperRegionAtom} from '@src/state/client/derived/selectedSuperRegion';
import {selectedRegionAtom} from '@src/state/client/derived/selectedRegion';
import {selectedSweVariableAtom} from '@src/state/client/derived/selectedSweVariable';
import {swePointsForOverlayAtom} from '@src/state/client/derived/swePointsForOverlay';
import mapViewAtom from '@src/state/client/derived/mapView';
import useRegionShapeQuery from '@src/serverState/regionShape';
import {
  OptionalCoordinate,
  OptionalOpenLayersMap,
  OptionalOverlay,
  OptionalSelect,
} from '@src/types/SlippyMap';
import {IRichSuperRegionVariable} from '@src/types/query/variables';
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
} from '@src/util/sideEffects/slippyMap';
import SlippyMapLegend from './Legend';
import SlippyMapTooltip from './Tooltip';


interface ISlippyMapProps {
  selectedSatelliteVariableId: string | undefined;
  selectedSatelliteVariable: IRichSuperRegionVariable | undefined;
}


const SlippyMap: React.FC<ISlippyMapProps> = (props) => {
  const [slippyMapUid, ] = useState<string>(_uniqueId());
  // TODO: More specific types; maybe some way to succinctly make optional?
  const [openLayersMap, setOpenLayersMap] = useState<OptionalOpenLayersMap>();
  const [selectedCoord, setSelectedCoord] = useState<OptionalCoordinate>();

  // State related to selecting feature and seeing its data
  const [selectedFeatures, setSelectedFeatures] = useState<Array<Feature>>([]);
  const [featureInfoOverlay, setFeatureInfoOverlay] =
    useState<OptionalOverlay>();
  const [selectInteraction, setSelectInteraction] =
    useState<OptionalSelect>();

  const slippyMapHtmlElement = useRef<HTMLDivElement>(null);
  const slippyMapRef = useRef<OpenLayersMap | null>(null);
  const overlayElement = useRef<HTMLDivElement | null>(null);

  const availableVariables = useAtomValue(availableVariablesAtom);
  const notProcessedLayerEnabled = useAtomValue(notProcessedLayerEnabledAtom);
  const rasterOpacity = useAtomValue(rasterOpacityAtom);
  const selectedBasemap = useAtomValue(selectedBasemapLayerAtomFamily(slippyMapUid));
  const selectedRegion = useAtomValue(selectedRegionAtom);
  const selectedSuperRegion = useAtomValue(selectedSuperRegionAtom);
  const selectedSweVariable = useAtomValue(selectedSweVariableAtom);
  const swePointsForOverlay = useAtomValue(swePointsForOverlayAtom);

  // debugger;
  const selectedRegionShapeQuery = useRegionShapeQuery(
    selectedRegion ? selectedRegion.shapeRelativePath : undefined,
  );

  // TODO: Why do we need the super region shape? To constrain the map view?
  const selectedSuperRegionShapeQuery = useRegionShapeQuery(
    selectedSuperRegion ? selectedSuperRegion.shapeRelativePath : undefined,
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
  // debugger;


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
    props.selectedSatelliteVariable,
    availableVariables,
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


  slippyMapRef.current = openLayersMap || null;
  const divId = `map-container-${slippyMapUid}`

  if (
    props.selectedSatelliteVariable === undefined
    || props.selectedSatelliteVariableId === undefined
  ) {
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

      { selectedRegionShapeQuery.isLoading &&
        <div className={"card-loading-overlay"}>
          <LoadingIcon size={200} />
        </div>
      }

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
        selectedSatelliteVariableId={props.selectedSatelliteVariableId}
        selectedSweVariable={selectedSweVariable}
      />

    </div>
  );
}

export default SlippyMap;

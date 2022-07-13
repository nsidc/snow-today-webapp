// Inspired by a very helpful blog post:
//     https://taylor.callsen.me/using-openlayers-with-react-functional-components/

import React, { useState, useEffect, useRef } from 'react';
import type {RefObject} from 'react';

import 'ol/ol.css';
import BaseLayer from 'ol/layer/Base';
import Map from 'ol/Map'
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
import {
  OptionalCoordinate,
  OptionalMap,
} from '../types/Map';
import { StateSetter } from '../types/misc';
import {basemapLayerGroup} from '../util/layers';
import {setLayerVisibility} from '../util/layerSwitch';


// When this component is first loaded, populate the map and other initial
// state.
const useMapInit = (
  selectedBasemap: BaseLayer,
  mapHtmlElement: RefObject<HTMLDivElement>,
  clickHandler: (event: MapBrowserEvent<any>) => void,
  setMap: StateSetter<OptionalMap>,
): void => {
  useEffect(() => {
    const initialMap = new Map({
      target: mapHtmlElement.current || undefined,
      layers: [basemapLayerGroup],
      view: new View({
        projection: 'EPSG:3857',
        center: [0, 0],
        zoom: 2,
        maxZoom: 16,
      }),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      controls: defaultControls().extend([
        new FullScreen(),
        new ScaleLine(),
      ]),
    })

    initialMap.on('click', clickHandler);

    // Populate states that depend on map initialization
    setMap(initialMap);

  /* eslint-disable react-hooks/exhaustive-deps */
  }, [])
  /* eslint-enable react-hooks/exhaustive-deps */
};

// When the selected basemap is updated, update the map to reflect this.
const useSelectedBasemap = (
  basemapLayer: BaseLayer,
  map: OptionalMap,
): void => {
  useEffect(() => {
    if (
      map === undefined
      || basemapLayer === undefined
    ) {
      return;
    }

    console.log('Updating basemap to ' + basemapLayer.get('title'));
    setLayerVisibility(map, basemapLayer, true);
  }, [basemapLayer, map]);
}

interface IMapProps {
  selectedBasemap: BaseLayer;
}

const MapComponent: React.FC<IMapProps> = (props) => {

  // TODO: More specific types; maybe some way to succinctly make optional?
  const [ map, setMap ] = useState<OptionalMap>();
  const [ selectedCoord, setSelectedCoord ] =
      useState<OptionalCoordinate>();

  const mapHtmlElement = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);

  const handleMapClick = (event: MapBrowserEvent<any>) => {
    if ( !mapRef || !mapRef.current ) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel);
    const transormedCoord = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326')

    setSelectedCoord(transormedCoord);
  }

  // Register behaviors
  useMapInit(
    props.selectedBasemap,
    mapHtmlElement,
    handleMapClick,
    setMap,
  );
  useSelectedBasemap(
    props.selectedBasemap,
    map,
  );

  mapRef.current = map || null;

  return (
    <div className="Map">

      <div ref={mapHtmlElement} className="map-container"></div>

      <div className="clicked-coord-label">
        <p>{ (selectedCoord) ? toStringXY(selectedCoord, 5) : '' }</p>
      </div>

    </div>
  )
}

export default MapComponent

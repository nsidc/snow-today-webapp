// Inspired by a very helpful blog post:
//     https://taylor.callsen.me/using-openlayers-with-react-functional-components/

import React, { useState, useEffect, useRef } from 'react';
import type {RefObject} from 'react';

import 'ol/ol.css';
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
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
  BASEMAPS,
  BasemapName,
} from '../types/Basemap';
import {
  OptionalCoordinate,
  OptionalMap,
  OptionalTileLayer,
} from '../types/Map';
import { StateSetter } from '../types/misc';


// When this component is first loaded, populate the map and other initial
// state.
const useMapInit = (
  selectedBasemap: BasemapName,
  mapElement: RefObject<HTMLDivElement>,
  overlayElement: RefObject<HTMLDivElement>,
  clickHandler: (event: MapBrowserEvent<any>) => void,
  setMap: StateSetter<OptionalMap>,
  setBasemapLayer: StateSetter<OptionalTileLayer>,
): void => {
  useEffect(() => {
    const initialBasemapLayer = new TileLayer({
      // @ts-ignore: TS2304
      id: 'basemap',
      source: BASEMAPS[selectedBasemap],
    })

    const initialMap = new Map({
      target: mapElement.current || undefined,
      layers: [
        initialBasemapLayer,
      ],
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
    setBasemapLayer(initialBasemapLayer);

  /* eslint-disable react-hooks/exhaustive-deps */
  }, [])
  /* eslint-enable react-hooks/exhaustive-deps */
};

// When the selected basemap is updated, update the basemap layer.
const useSelectedBasemap = (
  selectedBasemap: BasemapName,
  basemapLayer: OptionalTileLayer,
  map: OptionalMap,
): void => {
  useEffect(() => {
    if (
      map === undefined
      || basemapLayer === undefined
    ) {
      return;
    }

    console.log('Updating basemap to ' + selectedBasemap);
    basemapLayer.setSource(BASEMAPS[selectedBasemap]);
  }, [selectedBasemap, basemapLayer, map]);
}

interface IMapProps {
  selectedBasemap: BasemapName;
}

const MapComponent: React.FC<IMapProps> = (props) => {

  // TODO: More specific types; maybe some way to succinctly make optional?
  const [ map, setMap ] = useState<OptionalMap>();
  const [ basemapLayer, setBasemapLayer ] =
    useState<OptionalTileLayer>();
  const [ selectedCoord, setSelectedCoord ] =
      useState<OptionalCoordinate>();

  const mapElement = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const overlayElement = useRef<HTMLDivElement | null>(null);

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
    mapElement,
    overlayElement,
    handleMapClick,
    setMap,
    setBasemapLayer,
  );
  useSelectedBasemap(
    props.selectedBasemap,
    basemapLayer,
    map,
  );

  mapRef.current = map || null;

  return (
    <div className="Map">

      <div ref={mapElement} className="map-container"></div>

      <div className="clicked-coord-label">
        <p>{ (selectedCoord) ? toStringXY(selectedCoord, 5) : '' }</p>
      </div>

    </div>
  )
}

export default MapComponent

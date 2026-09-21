import OpenLayersMap from 'ol/Map';
import Overlay from 'ol/Overlay';
import type {Coordinate} from 'ol/coordinate';  
import Select from 'ol/interaction/Select';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import TileSource from 'ol/source/Tile';
import VectorSource from 'ol/source/Vector';


// TODO: Consider: Optional<T> = T | undefined
export type OptionalOpenLayersMap = OpenLayersMap | undefined;
export type OptionalVectorLayer = VectorLayer<VectorSource> | undefined
// TODO: Remove?
export type OptionalTileLayer = TileLayer<TileSource> | undefined
export type OptionalCoordinate = Coordinate | undefined;
export type OptionalOverlay = Overlay | undefined;
export type OptionalSelect = Select | undefined;

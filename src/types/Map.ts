import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import type {Coordinate} from 'ol/coordinate';  
import Select from 'ol/interaction/Select';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';


// TODO: Consider: Optional<T> = T | undefined
export type OptionalMap = Map | undefined;
export type OptionalVectorLayer = VectorLayer<any> | undefined
// TODO: Remove?
export type OptionalTileLayer = TileLayer<any> | undefined
export type OptionalCoordinate = Coordinate | undefined;
export type OptionalOverlay = Overlay | undefined;
export type OptionalSelect = Select | undefined;

import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import type {Coordinate} from 'ol/coordinate';  
import Select from 'ol/interaction/Select';
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'


export const BASEMAP_CHOICES = [
  'USGSTopo',
  'USGSImageryTopo',
  'USGSImageryOnly',
  'USGSShadedReliefOnly',
  'USGSHydroCached',
] as const;
export type BasemapName = typeof BASEMAP_CHOICES[number];

// TODO: Consider: Optional<T> = T | undefined
export type OptionalMap = Map | undefined;
export type OptionalVectorLayer = VectorLayer<any> | undefined
export type OptionalTileLayer = TileLayer<any> | undefined
export type OptionalCoordinate = Coordinate | undefined;
export type OptionalOverlay = Overlay | undefined;
export type OptionalSelect = Select | undefined;

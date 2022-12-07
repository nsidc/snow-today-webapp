import {Subset} from '../misc';


export interface ISwePoint {
  name: string;
  lon: number;
  lat: number;
  elevation_meters: number;
  swe_inches?: number;
  swe_delta_inches?: number;
  swe_normalized_pct?: number;
  state: string;
  huc2: number;
  huc4: number;
}
export type SwePoints = Array<ISwePoint>;

export type SwePointField = keyof ISwePoint;
export type SwePointMeasurementField = Subset<SwePointField, 'swe_inches' | 'swe_delta_inches' | 'swe_normalized_pct'>;

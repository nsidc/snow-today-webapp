import {Subset} from '../misc';


export interface ISweMetadata {
  last_date_with_data: string;
}
export interface ISwePoint {
  name: string;
  lon: number;
  lat: number;
  elevation_meters: number;
  swe_cm?: number;
  swe_delta_cm?: number;
  swe_normalized_pct?: number;
  swe_max_pct?: number;
  state: string;
  huc2: number;
  huc4: number;
}
export type SwePoints = Array<ISwePoint>;

export type SwePointField = keyof ISwePoint;
export type SwePointMeasurementField = Subset<SwePointField, 'swe_cm' | 'swe_delta_cm' | 'swe_normalized_pct' | 'swe_max_pct'>;

export interface ISwePayload {
  readonly metadata: ISweMetadata;
  readonly data: SwePoints;
}

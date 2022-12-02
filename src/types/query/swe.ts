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

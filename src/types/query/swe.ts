export interface ISwePoint {
  name: string;
  lon: number;
  lat: number;
  elevation_meters: number;
  swe_inches?: number;
  swe_normalized_inches?: number;
  swe_diff_inches?: number;
  state: string;
  huc2: number;
  huc4: number;
}

export type SwePoints = Array<ISwePoint>;

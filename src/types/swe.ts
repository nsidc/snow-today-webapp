// Mapping of display name to field name in SWE JSON file
export interface SweFields {
  none: string,
  swe_inches: string,
  swe_diff_inches: string,
  swe_normalized_inches: string,
}
export type SweField = keyof SweFields;

export interface SwePointForOverlay {
  name: string;
  lon: number;
  lat: number;
  elevation_meters: number;
  measurement_inches: number;
}

export type SwePointsForOverlay = SwePointForOverlay[];

export interface SwePointForOverlay {
  name: string;
  lon: number;
  lat: number;
  elevation_meters: number;
  measurement_value?: number;
  date: string;
}

export type SwePointsForOverlay = SwePointForOverlay[];

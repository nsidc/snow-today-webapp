export interface SwePointForOverlay {
  name: string;
  lon: number;
  lat: number;
  elevation_meters: number;
  measurement_inches?: number;
}

export type SwePointsForOverlay = SwePointForOverlay[];

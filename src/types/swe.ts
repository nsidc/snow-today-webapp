export interface SwePointForOverlay {
  name: string;
  lon: number;
  lat: number;
  elevation_meters: number;
  // Should not be "inches" -- sometimes is percent.
  measurement_inches?: number;
  date: string;
}

export type SwePointsForOverlay = SwePointForOverlay[];

export interface IPlotMetadata {
  // The year of record min/max that the `min`/`max` columns
  // represent.
  readonly minYear: number;
  readonly maxYear: number;
}
export interface IPlotData {
  readonly dayOfWaterYear: readonly number[];
  readonly date: readonly string[];
  readonly max: readonly number[];
  readonly median: readonly number[];
  readonly min: readonly number[];
  readonly prc25: readonly number[];
  readonly prc75: readonly number[];
  // The current year's observed values:
  readonly yearToDate: readonly number[];
}

export interface IPlotPayload {
  readonly metadata: IPlotMetadata;
  readonly data: IPlotData;
}

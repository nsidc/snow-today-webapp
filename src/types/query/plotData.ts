export interface IPlotData {
  readonly day_of_water_year: readonly number[];
  readonly max: readonly number[];
  readonly median: readonly number[];
  readonly min: readonly number[];
  readonly prc25: readonly number[];
  readonly prc75: readonly number[];
  readonly year_to_date: readonly number[];
}

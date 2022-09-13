export interface ISatelliteVariableOptions {
  type: 'variable' | 'notprocessed';
  enabled?: boolean;
  default?: boolean;
  longname: string;
  helptext: string;
  unit_of_measurement: string;
  cog_path: string;
  nodata_value: number;
  colormap: [number, number, number][] | [number, number, number, number][];
  colormap_value_range: [number, number];
  transparent_zero: boolean;
}

export interface ISatelliteVariableIndex {
  [keys: string]: ISatelliteVariableOptions;
}

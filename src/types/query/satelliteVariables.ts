export interface ISatelliteVariableOptions {
  type: string;
  longname: string;
  helptext: string;
  file: string;
  nodata_value: number;
  colormap: [number, number, number][] | [number, number, number, number][];
  colormap_value_range: [number, number];
  transparent_zero: boolean;
}

export interface ISatelliteVariableIndex {
  [keys: string]: ISatelliteVariableOptions;
}

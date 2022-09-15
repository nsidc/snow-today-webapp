export interface ISatelliteVariable {
  type: 'variable' | 'notprocessed';
  enabled?: boolean;
  default?: boolean;
  longname: string;
  longname_plot: string;
  helptext: string;
  label_map_legend: string;
  label_plot_yaxis: string;
  cog_path: string;
  legend_path: string;
  value_precision: number;
  value_range: [number, number];
  nodata_value: number;
  colormap: [number, number, number][] | [number, number, number, number][];
  colormap_value_range: [number, number];
  transparent_zero: boolean;
}

export interface ISatelliteVariableIndex {
  [keys: string]: ISatelliteVariable;
}

import {ISuperRegionVariable} from '@src/types/query/regions';
import {IColormap} from '@src/types/query/colormaps';


export interface ISspVariable {
  sensor: string;
  platform: string;
  algorithm: string;

  // TODO: Document!
  source: string;

  layerType: 'raster' | 'raster_notprocessed';

  longName: string;
  longNamePlot: string;
  helpText: string;
  labelMapLegend: string;
  labelPlotYaxis: string;

  valuePrecision: number;
  valueRange: [number, number];
  noDataValue: number;
  colormapId:  number;
  transparentZero: boolean;
}

export interface ISspVariableIndex {
  [variableId: string]: ISspVariable;
}

export type ISspRichVariable = ISspVariable & {colormap: IColormap};
export interface ISspRichVariableIndex {
  [variableId: string]: ISspRichVariable;
}

// Variables don't directly link to cloud-optimized geotiff files except in
// relation to a region. This enriched version provides everything about the
// variable needed to display region-variable-specific things!
export type IRichSuperRegionVariable = ISspRichVariable & ISuperRegionVariable;


export interface ISweVariable {
  longName: string;
  helpText: string;
  labelMapLegend: string;

  valuePrecision: number;
  valueRange: [number, number];
  colormapValueRange: [number, number];
  noDataValue: number;
  colormapId:  number;
  transparentZero: boolean;
  unit: string;
}

export interface ISweVariableIndex {
  [variableId: string]: ISweVariable;
}

export type ISweRichVariable = ISweVariable & {colormap: IColormap};
export interface ISweRichVariableIndex {
  [variableId: string]: ISweRichVariable;
}

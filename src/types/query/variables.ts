import {ISuperRegionVariable} from '@src/types/query/regions';
import {IColormap} from '@src/types/query/colormaps';


export interface IVariable {
  sensor: string;
  platform: string;
  algorithm: string;

  // TODO: Document!
  source: string;

  layerType: 'raster' | 'raster_notprocessed' | 'point_swe';

  longName: string;
  longNamePlot: string;
  helpText: string;
  labelMapLegend: string;
  labelPlotYaxis: string;

  legendPath: string;  //TODO: This fieldname isn't following convention!
  valuePrecision: number;
  valueRange: [number, number];
  noDataValue: number;
  colormapId:  number;
  transparentZero: boolean;
}

export interface IVariableIndex {
  [variableId: string]: IVariable;
}

export type IRichVariable = IVariable & {colormap: IColormap};
export interface IRichVariableIndex {
  [variableId: string]: IRichVariable;
}

// Variables don't directly link to cloud-optimized geotiff files except in
// relation to a region. This enriched version provides everything about the
// variable needed to display region-variable-specific things!
export type IRichSuperRegionVariable = IRichVariable & ISuperRegionVariable;

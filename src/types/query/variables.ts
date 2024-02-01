import {ISuperRegionVariable} from '@src/types/query/regions';


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

// Variables don't directly link to cloud-optimized geotiff files except in
// relation to a region. This enriched version provides everything about the
// variable!
export type IRichSuperRegionVariable = ISuperRegionVariable & IVariable;

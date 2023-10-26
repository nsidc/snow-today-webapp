import {dataServerUrl} from '@src/constants/dataServer';
import {IPlotData} from '@src/types/query/plotData';
import {genericFetch} from './generic';


export const fetchPlotData = (
  regionId: string,
  variableId: string,
): Promise<IPlotData> => {
  const url = `${dataServerUrl}/plots/${regionId}-${variableId}.json`;
  return genericFetch<IPlotData>(url, `plot data for ${regionId} ${variableId}`)
};

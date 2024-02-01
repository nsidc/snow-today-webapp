import {sspDataUrl} from '@src/constants/dataServer';
import {IPlotPayload} from '@src/types/query/plotData';
import {genericFetch} from './generic';


export const fetchPlotData = (
  regionId: string,
  variableId: string,
): Promise<IPlotPayload> => {
  // TODO: Pass the plot relative URL in directly!!!
  // const url = `${sspDataUrl}/plots/${regionId}_${variableId}.json`;
  const url = `${sspDataUrl}/splots/${regionId}_${variableId}.json`;
  return genericFetch<IPlotPayload>(url, `plot data for ${regionId} ${variableId}`)
};

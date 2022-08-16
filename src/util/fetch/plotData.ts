import {dataServerUrl} from '../../constants/dataServer';
import {IPlotData} from '../../types/query/plotData';


export const fetchPlotData = (
  regionId: string,
  variableId: string,
): Promise<IPlotData> => {
  const url = `${dataServerUrl}/plots/${regionId}-${variableId}.json`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch plot data for ${regionId} ${variableId}: ${response.statusText}`);
      }
      return response.json() as Promise<IPlotData>;
    })
    .catch((error) => {
      throw new Error(`Failed to fetch plot data for ${regionId} ${variableId}: ${String(error)}`);
    });
};

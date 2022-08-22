import {useQuery} from '@tanstack/react-query';

import {fetchPlotData} from '../util/fetch/plotData';
import {IPlotData} from '../types/query/plotData';


export const SERVERSTATE_KEY_PLOT_DATA = 'plotData';

const usePlotDataQuery = (
  regionId: string | undefined,
  variableId: string | undefined,
) => useQuery<IPlotData>(
  [SERVERSTATE_KEY_PLOT_DATA, regionId, variableId],
  () => {
    if (!regionId || !variableId) {
      throw new Error('Programmer error.');
    }
    return fetchPlotData(regionId, variableId);
  },
  {
    enabled: !!regionId && !!variableId,
    // Never re-fetch this data!
    cacheTime: Infinity,
    staleTime: Infinity,
    // Don't retry failed requests; in this case there is no plot!
    retry: false,
  },
);
export default usePlotDataQuery;

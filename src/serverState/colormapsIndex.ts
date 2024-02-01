import {useQuery} from '@tanstack/react-query';

import {fetchColormapsIndex} from '../util/fetch/colormaps';
import {IColormapsIndex} from '../types/query/colormaps';


export const SERVERSTATE_KEY_COLORMAPS_INDEX = 'colormapsIndex';
const useColormapsIndexQuery = () => {
  return useQuery<IColormapsIndex>(
    [SERVERSTATE_KEY_COLORMAPS_INDEX],
    fetchColormapsIndex,
    {
      // Never re-fetch this data!
      cacheTime: Infinity,
      staleTime: Infinity,
      // Propagate all errors to the nearest error boundary
      useErrorBoundary: true,
    }
  );
}
export default useColormapsIndexQuery;

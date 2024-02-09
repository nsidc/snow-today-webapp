import {atomWithQuery} from 'jotai-tanstack-query';

import {fetchColormapsIndex} from '@src/util/fetch/colormaps';
import {IColormapsIndex} from '@src/types/query/colormaps';


export const SERVERSTATE_KEY_COLORMAPS_INDEX = 'colormapsIndex';
export const colormapsIndexQueryAtom = atomWithQuery<IColormapsIndex>(
  () => {
    return {
      queryKey: [SERVERSTATE_KEY_COLORMAPS_INDEX],
      queryFn: fetchColormapsIndex,
    }
  }
);
colormapsIndexQueryAtom.debugLabel = "colormapsIndexQueryAtom";

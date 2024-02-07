/* Derived state: variables enriched with colormap info
 *
 * Depends on server state!
 *
 * TODO: Should this be in `state/server/derived`? Or should derived be
 *       independent of the client/server dichotomy? It doesn't make sense
 *       here.
 * */

import {atom} from 'jotai';

import {variablesIndexQueryAtom} from '@src/state/server/variablesIndex';
import {colormapsIndexQueryAtom} from '@src/state/server/colormapsIndex';
import {IRichVariableIndex} from '@src/types/query/variables';


export const richVariablesIndexAtom = atom<IRichVariableIndex | undefined>(
  (get) => {
    const variablesIndex = get(variablesIndexQueryAtom);
    const colormapsIndex = get(colormapsIndexQueryAtom);

    if (
      !variablesIndex.isSuccess
      || !colormapsIndex.isSuccess
    ) {
      // TODO: If we await these queries, then this is an error condition and
      //       we should throw? Then we can remove undefined from the type?
      return;
    }

    // Enrich variables with colormap info
    const enriched = Object.fromEntries(
      Object.entries(variablesIndex.data).map(([variableId, variable]) => {
        return [
          variableId,
          {...variable, colormap: {...colormapsIndex.data[variable.colormapId]}},
        ];
      })
    );
    return enriched;
  }
);
richVariablesIndexAtom.debugLabel = 'richVariablesIndexAtom';

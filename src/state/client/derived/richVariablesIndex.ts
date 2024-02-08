/* Derived state: variables enriched with colormap info
 *
 * Depends on server state!
 *
 * TODO: Should this be in `state/server/derived`? Or should derived be
 *       independent of the client/server dichotomy? It doesn't make sense
 *       here.
 * */

import {atom} from 'jotai';

import {sspVariablesIndexQueryAtom, sweVariablesIndexQueryAtom} from '@src/state/server/variablesIndex';
import {colormapsIndexQueryAtom} from '@src/state/server/colormapsIndex';
import {ISspRichVariableIndex, ISweRichVariableIndex} from '@src/types/query/variables';


export const sspRichVariablesIndexAtom = atom<ISspRichVariableIndex | undefined>(
  (get) => {
    const variablesIndex = get(sspVariablesIndexQueryAtom);
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
sspRichVariablesIndexAtom.debugLabel = 'sspRichVariablesIndexAtom';

export const sweRichVariablesIndexAtom = atom<ISweRichVariableIndex | undefined>(
  (get) => {
    const variablesIndex = get(sweVariablesIndexQueryAtom);
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
sweRichVariablesIndexAtom.debugLabel = 'sweRichVariablesIndexAtom';

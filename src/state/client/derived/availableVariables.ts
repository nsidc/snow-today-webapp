/* Derived state: the variables available based on the selected super region
 * and external state.
 *
 * Enriched with variable metadata for usability.
 * */
import {atom} from 'jotai';

import {selectedSuperRegionAtom} from '@src/state/client/derived/selectedSuperRegion';
import {variablesIndexQueryAtom} from '@src/state/server/variablesIndex';
import {IVariable} from '@src/types/query/variables';
import {ISuperRegionVariable} from '@src/types/query/regions';


export interface IAvailableVariablesIndex {
  [variableId: string]: ISuperRegionVariable & IVariable;
}

export const availableVariablesAtom = atom<Promise<IAvailableVariablesIndex | undefined>>(
  async (get) => {
    const variablesIndex = await get(variablesIndexQueryAtom);
    const selectedSuperRegion = await get(selectedSuperRegionAtom);

    if (
      selectedSuperRegion === undefined
      || !variablesIndex.isSuccess
    ) {
      return;
    }

    // Enrich regionVariables with full variable info
    const enriched = Object.fromEntries(
      Object.entries(selectedSuperRegion.variables).map(([key, value]) => [
        key,
        { ...value, ...variablesIndex.data[key]},
      ])
    );
    return enriched;
  }
);
availableVariablesAtom.debugLabel = 'availableVariablesAtom';

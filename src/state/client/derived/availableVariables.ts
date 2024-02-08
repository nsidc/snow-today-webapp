/* Derived state: the variables available based on the selected super region
 * and external state.
 *
 * Enriched with variable metadata for usability.
 * */
import {atom} from 'jotai';

import {selectedSuperRegionAtom} from '@src/state/client/derived/selectedSuperRegion';
import {sspRichVariablesIndexAtom} from '@src/state/client/derived/richVariablesIndex';
import {IRichSuperRegionVariable} from '@src/types/query/variables';


export interface IAvailableVariablesIndex {
  [variableId: string]: IRichSuperRegionVariable;
}

export const availableVariablesAtom = atom<Promise<IAvailableVariablesIndex | undefined>>(
  async (get) => {
    const variablesIndex = await get(sspRichVariablesIndexAtom);
    const selectedSuperRegion = await get(selectedSuperRegionAtom);

    if (
      selectedSuperRegion === undefined
      || variablesIndex === undefined
    ) {
      return;
    }

    // Enrich regionVariables with full variable info
    const enriched = Object.fromEntries(
      Object.entries(selectedSuperRegion.variables).map(([key, value]) => {
        const variable = variablesIndex[key];
        return [
          key,
          {...value, ...variable},
        ];
      })
    );
    return enriched;
  }
);
availableVariablesAtom.debugLabel = 'availableVariablesAtom';

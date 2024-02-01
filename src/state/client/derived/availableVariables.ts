/* Derived state: the variables available based on the selected super region
 * and external state.
 *
 * Enriched with variable metadata for usability.
 * */
import {atom} from 'jotai';
import {selectedSuperRegionAtom} from '@src/state/client/derived/selectedSuperRegion';
import {variablesIndexQueryAtom} from '@src/state/server/variablesIndex';
import {IRichSuperRegionVariable} from '@src/types/query/variables';


export interface IAvailableVariablesIndex {
  [variableId: string]: IRichSuperRegionVariable;
}

export const availableVariablesAtom = atom<Promise<IAvailableVariablesIndex | undefined>>(
  async (get) => {
    const variablesIndex = await get(variablesIndexQueryAtom);
    const selectedSuperRegion = await get(selectedSuperRegionAtom);

    if (selectedSuperRegion === undefined) {
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


/*
import {selector} from 'recoil';

import selectedSuperRegionAtom from '@src/state/client/derived/selectedSuperRegion';
import {ISuperRegionVariable} from '@src/types/query/regions';
import {IVariableIndex, IVariable} from '@src/types/query/variables';
import {queryClient} from '@src/util/query';
import {SERVERSTATE_KEY_VARIABLES_INDEX} from '@src/serverState/variablesIndex';


export interface IAvailableVariablesIndex {
  [variableId: string]: ISuperRegionVariable & IVariable;
}


const availableVariablesAtom = selector<IAvailableVariablesIndex | undefined>({
  key: 'availableVariables',
  get: ({get}) => {
    // TODO: When we have the region, we don't necessarily have the variables
    // yet. And there's nothing to trigger this atom to re-run once we do have
    // both. How to resolve???
    const selectedSuperRegion = get(selectedSuperRegionAtom);
    const variablesIndex = queryClient.getQueryData([SERVERSTATE_KEY_VARIABLES_INDEX]) as IVariableIndex;
    if (!selectedSuperRegion || !variablesIndex) {
      return;
    }

    // Enrich regionVariables with full variable info
    return Object.fromEntries(
      Object.entries(selectedSuperRegion.variables).map(([key, value]) => [
        key,
        { ...value, ...variablesIndex[key]},
      ])
    );
  },
});

export default availableVariablesAtom;
*/

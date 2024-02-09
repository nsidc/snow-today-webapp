/* Derived state: the _metadata_ of the selected raster variable.
 *
 * Depends on server state!
 * */

import {atom} from 'jotai';
import {atomFamily} from 'jotai/utils';
import deepEqual from 'fast-deep-equal';

import {selectedSatelliteVariableIdAtomFamily} from '@src/state/client/selectedSatelliteVariableId';
import {availableVariablesAtom} from '@src/state/client/derived/availableVariables';
import {IRichSuperRegionVariable} from '@src/types/query/variables';
import {ITileIdentifier} from '@src/types/layout';


type AtomValue = IRichSuperRegionVariable | undefined;
type AtomParameter = ITileIdentifier;

export const selectedSatelliteVariableAtomFamily = atomFamily(
  (tileId: AtomParameter) => {
    const atm = atom<Promise<AtomValue>>(
      async (get) => {
        const availableVariables = await get(availableVariablesAtom);
        const selectedVariableId = get(selectedSatelliteVariableIdAtomFamily(tileId));

        if (
          selectedVariableId === undefined
          || availableVariables === undefined
        ) {
          return;
        }
        return availableVariables[selectedVariableId];
      }
    );
    atm.debugLabel = `selectedSatelliteVariableAtomFamily_row${tileId.row}-col${tileId.col}`;
    return atm;
  },
  deepEqual,
);

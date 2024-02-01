/* This state has 1 instance for each "tile" in the app.
 */
import {atom} from 'jotai';
import {atomFamily} from 'jotai/utils';
import deepEqual from 'fast-deep-equal';

import {ITileIdentifier} from '@src/types/layout';

export type AtomValue = string | undefined;
export type AtomParameter = ITileIdentifier;
export const selectedSatelliteVariableIdAtomFamily = atomFamily(
  // TODO: Can we set the initial values by making this family dependent on defaultVariable?
  (tileId: AtomParameter) => {
    const atm = atom<AtomValue>(undefined)
    atm.debugLabel = `selectedSatelliteVariableIdAtomFamily_row${tileId.row}-col${tileId.col}`;
    return atm;
  },
  deepEqual,
);

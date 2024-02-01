/* This state has 1 instance for each "tile" in the app.
 */
import {atom} from 'jotai';
import {atomFamily} from 'jotai/utils';
import deepEqual from 'fast-deep-equal';

import {ITileIdentifier, TileType} from '@src/types/layout';

export type AtomValue = TileType;
export type AtomParameter = ITileIdentifier;
export const selectedTileTypeAtomFamily = atomFamily(
  (tileId: AtomParameter) => {
    const atm = atom<AtomValue>("map");
    atm.debugLabel = `selectedTileTypeAtomFamily_row${tileId.row}-col${tileId.col}`;
    return atm;
  },
  deepEqual,
);

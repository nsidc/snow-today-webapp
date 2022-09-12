/* This state has 1 instance for each "tile" in the app.
 *
 * "Scoped State" allows this behavior on the state graph:
 *
 *     https://stackoverflow.com/questions/71527067/dynamic-atom-keys-in-recoil
 *     https://recoiljs.org/docs/api-reference/utils/atomFamily#scoped-atoms
 */
import {atomFamily} from 'recoil';

import {ITileIdentifier, TileType} from '../../types/layout';


export type AtomValue = TileType;
export type AtomParameter = ITileIdentifier;
const selectedTileTypeAtom = atomFamily<AtomValue, AtomParameter>({
  key: 'selectedTileType',
  default: 'map', 
});
export default selectedTileTypeAtom;

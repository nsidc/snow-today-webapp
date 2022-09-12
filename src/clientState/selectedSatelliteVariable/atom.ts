/* This state has 1 instance for each "tile" in the app.
 *
 * "Scoped State" allows this behavior on the state graph:
 *
 *     https://stackoverflow.com/questions/71527067/dynamic-atom-keys-in-recoil
 *     https://recoiljs.org/docs/api-reference/utils/atomFamily#scoped-atoms
 */
import {atomFamily} from 'recoil';

import {ITileIdentifier} from '../../types/layout';


export type AtomValue = string | undefined;
export type AtomParameter = ITileIdentifier;
const selectedSatelliteVariableAtom = atomFamily<AtomValue, AtomParameter>({
  key: 'selectedSatelliteVariable',
  default: undefined,
});
export default selectedSatelliteVariableAtom;

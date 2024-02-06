/* Derived state: the actual _Layer object_ of the selected basemap.
 *
 * TODO: Why does this need to be a family? The basemap layer is the same on
 *       every map tile. Change from family?? I think this may be vestigial
 *       from when the selector was part of the map tile.
 * */

import {atom} from 'jotai';
import {atomFamily} from 'jotai/utils';
import BaseLayer from 'ol/layer/Base';

import {selectedBasemapNameAtom} from '../selectedBasemapName';
import {basemapLayersByName} from '@src/util/layer/basemaps';


type AtomValue = BaseLayer;
type AtomParameter = string;
export const selectedBasemapLayerAtomFamily = atomFamily(
  (mapId: AtomParameter) => {
    const atm = atom<AtomValue>(
      (get) => basemapLayersByName(mapId).get(get(selectedBasemapNameAtom))!
    );
    atm.debugLabel = `selectedBasemapLayerAtomFamily_map${mapId}`;
    return atm;
  }
);

/*

const selectedBasemapLayerAtom = selectorFamily<AtomValue, AtomParameter>({
  key: 'selectedBasemapLayer',
  get: (mapId: AtomParameter) => ({get}) => (
    basemapLayersByName(mapId).get(get(selectedBasemapNameAtom))!
  ),
  // WARNING: We allow mutability because openlayers mutates layer objects, but
  //   Recoil freezes state objects. If this is disabled, openlayers breaks
  //   with confusing errors because Recoil froze the layer object.
  dangerouslyAllowMutability: true,
});

export default selectedBasemapLayerAtom;
*/

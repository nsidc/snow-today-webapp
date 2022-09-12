/* Derived state: the actual _Layer object_ of the selected basemap. */

import {selectorFamily} from 'recoil';
import BaseLayer from 'ol/layer/Base';

import selectedBasemapAtom from '../selectedBasemap';
import {basemapLayersByName} from '../../util/layer/basemaps';


// TODO: Should we call selectors "atoms" for simplicity? They are used
// similarly / identically.
type AtomValue = BaseLayer;
type AtomParameter = string;
const selectedBasemapObjectAtom = selectorFamily<AtomValue, AtomParameter>({
  key: 'selectedBasemapObject',
  get: (mapId: AtomParameter) => ({get}) => (
    basemapLayersByName(mapId).get(get(selectedBasemapAtom))!
  ),
  // WARNING: We allow mutability because openlayers mutates layer objects, but
  //   Recoil freezes state objects. If this is disabled, openlayers breaks
  //   with confusing errors because Recoil froze the layer object.
  dangerouslyAllowMutability: true,
});

export default selectedBasemapObjectAtom;

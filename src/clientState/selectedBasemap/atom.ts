import {atom} from 'recoil';
import BaseLayer from 'ol/layer/Base';

import {basemapUsgsTopo} from '../../util/layers';


const selectedBasemapAtom = atom<BaseLayer>({
  key: 'selectedBasemap',
  default: basemapUsgsTopo,
  // WARNING: We allow mutability because openlayers mutates layer objects, but
  //   Recoil freezes state objects. If this is disabled, openlayers breaks
  //   with confusing errors because Recoil froze the layer object.
  // TODO: Change this to derived state, use a scalar for the main atom.
  dangerouslyAllowMutability: true,
});

export default selectedBasemapAtom;

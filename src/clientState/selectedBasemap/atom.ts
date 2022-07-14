import {atom} from 'recoil';
import BaseLayer from 'ol/layer/Base';

import {basemapUsgsTopo} from '../../util/layers'


const selectedBasemapAtom = atom<BaseLayer>({
  key: 'selectedBasemap',
  default: basemapUsgsTopo,
});

export default selectedBasemapAtom;

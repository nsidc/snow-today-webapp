import {atom} from 'recoil';


const selectedBasemapNameAtom = atom<string>({
  key: 'selectedBasemapName',
  // TODO: Something about this magic string
  default: 'USGS Topographic',
});

export default selectedBasemapNameAtom;

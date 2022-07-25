import {atom} from 'recoil';


const selectedBasemapAtom = atom<string>({
  key: 'selectedBasemap',
  // TODO: Something about this magic string
  default: 'USGS Topographic',
});

export default selectedBasemapAtom;

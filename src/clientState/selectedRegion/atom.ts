import {atom} from 'recoil';


const selectedRegionAtom = atom<string>({
  key: 'selectedRegion',
  // TODO: Something about this magic string
  default: 'CO',
});

export default selectedRegionAtom;

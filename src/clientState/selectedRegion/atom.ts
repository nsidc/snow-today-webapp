import {atom} from 'recoil';


const selectedRegionAtom = atom<string | undefined>({
  key: 'selectedRegion',
  default: undefined,
});

export default selectedRegionAtom;

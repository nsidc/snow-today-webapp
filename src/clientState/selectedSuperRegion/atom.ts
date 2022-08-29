import {atom} from 'recoil';


const selectedSuperRegionAtom = atom<string | undefined>({
  key: 'selectedSuperRegion',
  default: undefined,
});

export default selectedSuperRegionAtom;

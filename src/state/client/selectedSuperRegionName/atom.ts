import {atom} from 'recoil';


const selectedSuperRegionNameAtom = atom<string | undefined>({
  key: 'selectedSuperRegionName',
  default: undefined,
});

export default selectedSuperRegionNameAtom;

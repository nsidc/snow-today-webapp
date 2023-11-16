import {atom} from 'recoil';


const selectedSuperRegionIdAtom = atom<string | undefined>({
  key: 'selectedSuperRegionId',
  default: undefined,
});

export default selectedSuperRegionIdAtom;

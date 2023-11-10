import {atom} from 'recoil';


const selectedRegionIdAtom = atom<string | undefined>({
  key: 'selectedRegionId',
  default: undefined,
});

export default selectedRegionIdAtom;

import {atom} from 'recoil';


const selectedSubRegionNameAtom = atom<string | undefined>({
  key: 'selectedSubRegionName',
  default: undefined,
});

export default selectedSubRegionNameAtom;

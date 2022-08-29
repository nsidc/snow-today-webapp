import {atom} from 'recoil';


const selectedSubRegionAtom = atom<string | undefined>({
  key: 'selectedSubRegion',
  default: undefined,
});

export default selectedSubRegionAtom;

import {atom} from 'recoil';


export const DEFAULT_SUBREGION_COLLECTION = 'none';
const selectedSubRegionCollectionAtom = atom<string | undefined>({
  key: 'selectedSubRegionCollection',
  default: DEFAULT_SUBREGION_COLLECTION,
});

export default selectedSubRegionCollectionAtom;

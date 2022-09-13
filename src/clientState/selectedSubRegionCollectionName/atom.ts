import {atom} from 'recoil';


export const DEFAULT_SUBREGION_COLLECTION_NAME = 'none';
const selectedSubRegionCollectionNameAtom = atom<string>({
  key: 'selectedSubRegionCollectionName',
  default: DEFAULT_SUBREGION_COLLECTION_NAME,
});

export default selectedSubRegionCollectionNameAtom;

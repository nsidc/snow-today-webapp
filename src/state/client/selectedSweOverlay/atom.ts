import {atom} from 'recoil';

import {SweField} from '../../../types/swe';


const selectedSweOverlayAtom = atom<SweField>({
  key: 'selectedSweOverlay',
  default: 'none',
});

export default selectedSweOverlayAtom;

import {atom} from 'recoil';

import {SweField} from '../../types/swe';


const selectedSweOverlay = atom<SweField>({
  key: 'selectedSweOverlay',
  default: 'none',
});

export default selectedSweOverlay;

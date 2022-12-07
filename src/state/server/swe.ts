import {atom} from 'recoil';

import {fetchSwePoints} from '../../util/fetch/swe';
import {SwePoints} from '../../types/query/swe';


const swePointsQueryAtom = atom<SwePoints>({
  key: 'swePointsQuery',
  default: fetchSwePoints(),
});

export default swePointsQueryAtom;

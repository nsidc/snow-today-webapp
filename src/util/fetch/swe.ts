import {swePointsUrl} from '@src/constants/dataServer';
import {SwePoints} from '@src/types/query/swe';
import {genericFetchAsync} from './generic';


export const fetchSwePoints = (): Promise<SwePoints> => (
  genericFetchAsync<SwePoints>(swePointsUrl, "SWE points data")
);

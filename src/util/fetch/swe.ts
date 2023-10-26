import {swePointsUrl} from '@src/constants/dataServer';
import {SwePoints} from '@src/types/query/swe';
import {genericFetch} from './generic';


export const fetchSwePoints = (): Promise<SwePoints> => (
  genericFetch<SwePoints>(swePointsUrl, "SWE points data")
);

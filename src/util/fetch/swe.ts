import {swePointsUrl} from '@src/constants/dataServer';
import {ISwePayload} from '@src/types/query/swe';
import {genericFetchAsync} from './generic';


export const fetchSwePoints = (): Promise<ISwePayload> => (
  genericFetchAsync<ISwePayload>(swePointsUrl, "SWE points data")
);

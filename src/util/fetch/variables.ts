import {sspVariablesIndexUrl, sweVariablesIndexUrl} from '@src/constants/dataServer';
import {ISspVariableIndex, ISweVariableIndex} from '@src/types/query/variables';
import {genericFetch} from './generic';


export const fetchSspVariablesIndex = (): Promise<ISspVariableIndex> => (
  genericFetch<ISspVariableIndex>(sspVariablesIndexUrl, "index of SSP variable data")
);

export const fetchSweVariablesIndex = (): Promise<ISweVariableIndex> => (
  genericFetch<ISweVariableIndex>(sweVariablesIndexUrl, "index of SWE variable data")
);

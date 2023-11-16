import {variablesIndexUrl} from '@src/constants/dataServer';
import {IVariableIndex} from '@src/types/query/variables';
import {genericFetch} from './generic';


export const fetchVariablesIndex = (): Promise<IVariableIndex> => (
  genericFetch<IVariableIndex>(variablesIndexUrl, "index of variable data")
);

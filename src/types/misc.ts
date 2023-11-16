import type {Dispatch, SetStateAction} from 'react';

export type Subset<K, T extends K> = T;
export type StateSetter<T> = Dispatch<SetStateAction<T>>;

export type IIndex<IndexType extends number | string, DataType> = {
  [Id in IndexType]: DataType;
}

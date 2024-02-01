import type {Dispatch, SetStateAction} from 'react';

export type Subset<K, T extends K> = T;
export type StateSetter<T> = Dispatch<SetStateAction<T>>;

export type IIndex<IndexType extends number | string, DataType> = {
  [Id in IndexType]: DataType;
}

// TODO A generic type for an interface containing a thing and ID for use in
// state. This type maybe shouldn't contain the word "State"? ¯\_(ツ)_/¯
// "Thing" instead?
// export interface StateWithId<StateType, IdType = string> {
//   id: IdType;
//   state: StateType;
// }

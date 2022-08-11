interface IRegionOptions {
  longname: string;
  file: string;
}

export interface IRegionIndex {
  [keys: string]: IRegionOptions;
}

export interface IRegionOptions {
  longname: string;
  shortname: string;
  file: string;
  type: string;
}

export interface IRegionIndex {
  [keys: string]: IRegionOptions;
}

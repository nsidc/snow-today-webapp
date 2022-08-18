export interface IRegionOptions {
  longname: string;
  shortname: string;
  file: string;
  type: string;
  enabled?: boolean;
}

export interface IRegionIndex {
  [keys: string]: IRegionOptions;
}

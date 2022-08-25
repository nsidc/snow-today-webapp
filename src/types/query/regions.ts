export interface ISubRegion {
  longname: string;
  shortname: string;
  shape_path: string;
  enabled?: boolean;
}
export interface ISubRegionIndex {
  [subRegionId: string]: ISubRegion;
}

export interface ISubRegionCollection {
  longname: string;
  shortname: string;
  items: ISubRegionIndex;
}
export interface ISubRegionCollectionIndex {
  [subRegionCollectionId: string]: ISubRegionCollection;
}

export interface IRegion {
  longname: string;
  shortname: string;
  shape_path: string;
  subregion_collections: ISubRegionCollectionIndex;
}
export interface IRegionIndex {
  [regionId: string]: IRegion;
}

// TODO: Express this as a union of IRegion and ISubRegion, plus an `id` field.
export interface IGenericRegion {
  id: string;
  longname: string;
  shortname: string;
  shape_path: string;
}

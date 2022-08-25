interface ISubRegion {
  longname: string;
  shortname: string;
  shape_path: string;
  enabled?: boolean;
}
interface ISubRegionIndex {
  [subRegionId: string]: ISubRegion;
}

interface ISubRegionCollection {
  longname: string;
  shortname: string;
  items: ISubRegionIndex;
}
interface ISubRegionCollectionIndex {
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

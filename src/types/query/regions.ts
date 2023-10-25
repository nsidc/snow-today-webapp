export interface ISubRegion {
  longName: string;
  shortName: string;
  shapeRelativePath: string;
  enabled?: boolean;
}
export interface ISubRegionIndex {
  [subRegionId: string]: ISubRegion;
}

export interface ISubRegionCollection {
  longName: string;
  shortName: string;
  items: ISubRegionIndex;
}
export interface ISubRegionCollectionIndex {
  [subRegionCollectionId: string]: ISubRegionCollection;
}

export interface ISuperRegion {
  longName: string;
  shortName: string;
  crs: string;
  shapeRelativePath: string;
  subregionsRelativePath: string;
  subregionsHierarchyRelativePath: string;
  // TODO: how to populate this?
  subregionCollections: ISubRegionCollectionIndex;
}
export interface ISuperRegionIndex {
  [superRegionId: string]: ISuperRegion;
}

// TODO: Express this as a union of IRegion and ISubRegion, plus an `id` field.
export interface IGenericRegion {
  id: string;
  longName: string;
  shortName: string;
  shapeRelativePath: string;
}

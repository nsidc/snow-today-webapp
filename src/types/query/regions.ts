import {IIndex} from '@src/types/misc';

/************
 * Sub Regions
 */
export interface ISubRegion {
  longName: string;
  shortName: string;
  shapeRelativePath: string;
  enabled?: boolean;
}
export type ISubRegionIndex = IIndex<string, ISubRegion>;

// Sub Region Collections
export interface ISubRegionCollection {
  longName: string;
  shortName: string;
}
export type ISubRegionCollectionIndex  = IIndex<string, ISubRegionCollection>;

// Sub Region structure: which collections are available, what are their members, submembers, etc.
// The structure can be nested arbitrarily! This structure is bare and represents represent
// what we receive from the back-end.
export interface ISubRegionHierarchyCollectionRegion {
  collections?: ISubRegionHierarchyCollectionIndex;
}
export type ISubRegionHierarchyCollectionRegionIndex = IIndex<string, ISubRegionHierarchyCollectionRegion>;
export interface ISubRegionHierarchyCollection {
  regions: ISubRegionHierarchyCollectionRegionIndex;
}
export type ISubRegionHierarchyCollectionIndex = IIndex<string, ISubRegionHierarchyCollection>;
export interface ISubRegionHierarchy {
  collections: ISubRegionHierarchyCollectionIndex;
}

// Rich Sub Region structure: After we query the back-end for sub-region index
// and hierarchy, we combine them into a "rich" hierarchy which has all the
// information in both.
export type ISubRegionHierarchyCollectionRegionRich = {
  metadata: ISubRegion;
  collections?: ISubRegionHierarchyCollectionRichIndex;
}
export type ISubRegionHierarchyCollectionRegionRichIndex = IIndex<string, ISubRegionHierarchyCollectionRegionRich>;
export type ISubRegionHierarchyCollectionRich = {
  metadata: ISubRegionCollection;
  regions: ISubRegionHierarchyCollectionRegionRichIndex;
};
export type ISubRegionHierarchyCollectionRichIndex = IIndex<string, ISubRegionHierarchyCollectionRich>;
export interface ISubRegionHierarchyRich {
  collections: ISubRegionHierarchyCollectionRichIndex;
}

/************
 * Super Regions
 */
export interface ISuperRegionVariable {
  default: boolean;
  dataValueRange: [number, number];
  geotiffRelativePath: string;
}
export interface ISuperRegionVariablesIndex {
  [variableId: string]: ISuperRegionVariable;
}

export interface ISuperRegion {
  longName: string;
  shortName: string;
  crs: string;
  waterYear: number;
  waterYearStartDate: string;
  historicWaterYearRange: [number, number];
  lastDateWithData: string;

  shapeRelativePath: string;
  subRegionsRelativePath: string;
  subRegionsHierarchyRelativePath: string;

  variables: ISuperRegionVariablesIndex;
}
export interface ISuperRegionIndex {
  [regionId: string]: ISuperRegion;
}

/************
 * Generic Regions
 */
// TODO: Express this as a union of IRegion and ISubRegion, plus an `id`
//       field?:
//           IRegion & ISubRegion & { id: string }
export interface IGenericRegion {
  id: string;
  longName: string;
  shortName: string;
  shapeRelativePath: string;
}

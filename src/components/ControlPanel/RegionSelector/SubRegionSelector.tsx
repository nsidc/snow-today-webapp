import React from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';

import '../../../style/SubRegionSelector.css';
import selectedSubRegionCollectionAtom from '../../../state/client/derived/selectedSubRegionCollection';
import selectedSubRegionCollectionNameAtom from '../../../state/client/selectedSubRegionCollectionName';
import {DEFAULT_SUBREGION_COLLECTION_NAME} from '../../../state/client/selectedSubRegionCollectionName/atom';
import selectedSubRegionNameAtom from '../../../state/client/selectedSubRegionName';
import SearchableSelect, {ISelectOptionProps} from '../../../components/reusable/SearchableSelect';
import {ISubRegionCollection} from '../../../types/query/regions';


const getSubRegionOptionProps = (
  selectedSubRegionCollection: ISubRegionCollection,
  selectedSubRegionCollectionName: string,
): ISelectOptionProps[] => {
  if (selectedSubRegionCollectionName === DEFAULT_SUBREGION_COLLECTION_NAME) {
    return [];
  }

  const subRegions = selectedSubRegionCollection['items'];
  const subRegionOptionProps = (
    Object.entries(subRegions)
    .filter(([subRegionId, subRegion]) => !Object.keys(subRegion).includes('enabled') || subRegion['enabled'])
    .map(([subRegionId, subRegion]) => (
      { text: subRegion['longname'], value: subRegionId }
    ))
  );

  return subRegionOptionProps;
}


const SubRegionSelector: React.FC = () => {
  const selectedSubRegionCollection = useRecoilValue(selectedSubRegionCollectionAtom);
  const selectedSubRegionCollectionName = useRecoilValue(selectedSubRegionCollectionNameAtom);
  const [selectedSubRegionName, setSelectedSubRegionName] = useRecoilState(selectedSubRegionNameAtom);

  if (!selectedSubRegionCollectionName || !selectedSubRegionCollection) {
    return <div></div>;
  }
  const subRegionOptionProps = getSubRegionOptionProps(
    selectedSubRegionCollection,
    selectedSubRegionCollectionName,
  );

  if (subRegionOptionProps.length === 0) {
    return <div></div>;
  }

  return (
    <div id={'SubRegionSelector'}>
      <label htmlFor={'subregion-selector'}>{'Sub-region: '}</label>
      <SearchableSelect 
        id={'subregion-selector'}
        placeholderText={`Select a ${selectedSubRegionCollection['shortname']}...`}
        value={selectedSubRegionName}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedSubRegionName(e.target.value)}
        selectOptionProps={subRegionOptionProps} />
    </div>
  );
}
export default SubRegionSelector;

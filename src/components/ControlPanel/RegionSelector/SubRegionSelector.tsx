import React from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';

import selectedSubRegionCollectionObjectAtom from '../../../clientState/derived/selectedSubRegionCollectionObject';
import selectedSubRegionCollectionAtom from '../../../clientState/selectedSubRegionCollection';
import {DEFAULT_SUBREGION_COLLECTION} from '../../../clientState/selectedSubRegionCollection/atom';
import selectedSubRegionAtom from '../../../clientState/selectedSubRegion';
import SearchableSelect, {ISelectOptionProps} from '../../../components/reusable/SearchableSelect';
import {ISubRegionCollection} from '../../../types/query/regions';


const getSubRegionOptionProps = (
  selectedSubRegionCollectionObject: ISubRegionCollection,
  selectedSubRegionCollection: string,
): ISelectOptionProps[] => {
  if (selectedSubRegionCollection === DEFAULT_SUBREGION_COLLECTION) {
    return [];
  }

  const subRegions = selectedSubRegionCollectionObject['items'];
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
  const selectedSubRegionCollectionObject = useRecoilValue(selectedSubRegionCollectionObjectAtom);
  const selectedSubRegionCollection = useRecoilValue(selectedSubRegionCollectionAtom);
  const [selectedSubRegion, setSelectedSubRegion] = useRecoilState(selectedSubRegionAtom);

  if (!selectedSubRegionCollection || !selectedSubRegionCollectionObject) {
    return <div></div>;
  }
  const subRegionOptionProps = getSubRegionOptionProps(
    selectedSubRegionCollectionObject,
    selectedSubRegionCollection,
  );

  if (subRegionOptionProps.length === 0) {
    return <div></div>;
  }

  return (
    <div className={'subregion-selector'}>
      <label htmlFor={'subregion-selector'}>{'Sub-region: '}</label>
      <SearchableSelect 
        id={'subregion-selector'}
        placeholderText={`Select a ${selectedSubRegionCollectionObject['shortname']}...`}
        value={selectedSubRegion}
        onChange={(e) => setSelectedSubRegion(e.target.value)}
        selectOptionProps={subRegionOptionProps} />
    </div>
  );
}
export default SubRegionSelector;

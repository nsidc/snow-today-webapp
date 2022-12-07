import React from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';

import '../../../style/SubRegionCollectionSelector.css';
import selectedSuperRegionAtom from '../../../state/client/derived/selectedSuperRegion';
import selectedSubRegionCollectionNameAtom from '../../../state/client/selectedSubRegionCollectionName';
import selectedSubRegionNameAtom from '../../../state/client/selectedSubRegionName';
import {DEFAULT_SUBREGION_COLLECTION_NAME} from '../../../state/client/selectedSubRegionCollectionName/atom';


const SubRegionCollectionSelector: React.FC = () => {
  const selectedSuperRegion = useRecoilValue(selectedSuperRegionAtom);
  const [
    selectedSubRegionCollectionName,
    setSelectedSubRegionCollectionName,
  ] = useRecoilState(selectedSubRegionCollectionNameAtom);
  const setSelectedSubRegionName = useSetRecoilState(selectedSubRegionNameAtom);

  if (!selectedSuperRegion) {
    return <div>Loading...</div>;
  }

  const handleSelectedSubRegionCollection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSubRegionCollection = e.currentTarget.value;

    setSelectedSubRegionCollectionName(newSubRegionCollection);

    // When the collection is changed, the selected sub-region must be reset:
    setSelectedSubRegionName(undefined);
  }
  const subRegionCollectionOptions = [
    (
      <div className={'sub-region-collection-option'} key={DEFAULT_SUBREGION_COLLECTION_NAME}>
        <label htmlFor={`region-collection-${DEFAULT_SUBREGION_COLLECTION_NAME}`}>None</label>
        <input
          type={'radio'}
          id={`region-collection-${DEFAULT_SUBREGION_COLLECTION_NAME}`}
          value={DEFAULT_SUBREGION_COLLECTION_NAME}
          name={'region-collection'}
          onChange={handleSelectedSubRegionCollection}
          checked={selectedSubRegionCollectionName === DEFAULT_SUBREGION_COLLECTION_NAME} />
      </div>
    ),
    ...Object.entries(selectedSuperRegion.subregion_collections)
    .map(([regionCollectionId, params]) => (
      <div className={'sub-region-collection-option'} key={regionCollectionId}>
        <label htmlFor={`region-collection-${regionCollectionId}`}>
          {params['shortname']}
        </label>
        <input
          type={'radio'}
          id={`region-collection-${regionCollectionId}`}
          value={regionCollectionId}
          name={'region-collection'}
          onChange={handleSelectedSubRegionCollection}
          checked={selectedSubRegionCollectionName === regionCollectionId} />
      </div>
    ))
  ];

  return (
    <div className={'SubRegionCollectionSelector'}>
      {subRegionCollectionOptions}
    </div>
  );
}
export default SubRegionCollectionSelector;

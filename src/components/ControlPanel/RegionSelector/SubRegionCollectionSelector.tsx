import React from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';

import selectedSuperRegionObjectAtom from '../../../clientState/derived/selectedSuperRegionObject';
import selectedSubRegionCollectionAtom from '../../../clientState/selectedSubRegionCollection';
import {DEFAULT_SUBREGION_COLLECTION} from '../../../clientState/selectedSubRegionCollection/atom';


const SubRegionCollectionSelector: React.FC = () => {
  const selectedSuperRegionObject = useRecoilValue(selectedSuperRegionObjectAtom);
  const [
    selectedSubRegionCollection,
    setSelectedSubRegionCollection,
  ] = useRecoilState(selectedSubRegionCollectionAtom);

  if (!selectedSuperRegionObject) {
    return <div>Loading...</div>;
  }

  const handleSelectedSubRegionCollection = (e: any) => {
    const newSubRegionCollection = e.currentTarget.value;
    setSelectedSubRegionCollection(newSubRegionCollection);
  }
  const subRegionCollectionOptions = [
    (
      <React.Fragment key={DEFAULT_SUBREGION_COLLECTION}>
        <label htmlFor={`region-collection-${DEFAULT_SUBREGION_COLLECTION}`}>None</label>
        <input
          type={'radio'}
          id={`region-collection-${DEFAULT_SUBREGION_COLLECTION}`}
          value={DEFAULT_SUBREGION_COLLECTION}
          name={'region-collection'}
          onChange={handleSelectedSubRegionCollection}
          checked={selectedSubRegionCollection === DEFAULT_SUBREGION_COLLECTION} />
      </React.Fragment>
    ),
    ...Object.entries(selectedSuperRegionObject.subregion_collections)
    .map(([regionCollectionId, params]) => (
      <React.Fragment key={regionCollectionId}>
        <label htmlFor={`region-collection-${regionCollectionId}`}>
          {params['shortname']}
        </label>
        <input
          type={'radio'}
          id={`region-collection-${regionCollectionId}`}
          value={regionCollectionId}
          name={'region-collection'}
          onChange={handleSelectedSubRegionCollection}
          checked={selectedSubRegionCollection === regionCollectionId} />
      </React.Fragment>
    ))
  ];

  return (
    <div className={'subregion-collection-selector'}>
      {subRegionCollectionOptions}
    </div>
  );
}
export default SubRegionCollectionSelector;

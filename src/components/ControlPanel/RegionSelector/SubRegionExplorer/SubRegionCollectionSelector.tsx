import React, {useState} from 'react';
import {useSetRecoilState} from 'recoil';

import '@src/style/SubRegionCollectionSelector.css';
import selectedRegionIdAtom from '@src/state/client/selectedRegionId';
import {ISubRegionHierarchyCollectionRichIndex} from '@src/types/query/regions';
import SubRegionSelector from './SubRegionSelector';


interface ISubRegionCollectionSelector {
  collectionChoices: ISubRegionHierarchyCollectionRichIndex;
  parentRegionId: string;
}
const SubRegionCollectionSelector: React.FC<ISubRegionCollectionSelector> = (props) => {
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | undefined>(undefined);
  const setSelectedRegionId = useSetRecoilState(selectedRegionIdAtom);

  const handleSelectedCollectionId = (e: React.ChangeEvent<HTMLInputElement>) => {
    // The "undefined" selection will come through as an empty string:
    const newCollectionId = e.currentTarget.value === "" ? undefined : e.currentTarget.value;
    setSelectedCollectionId(newCollectionId);

    // TODO: Hook?
    if (newCollectionId === undefined) {
      setSelectedRegionId(props.parentRegionId);
    }
  }

  const noSelectedCollectionValue = undefined;
  const subRegionCollectionOptions = [
    (
      <div className={'sub-region-collection-option'} key={noSelectedCollectionValue}>
        <label htmlFor={`region-collection-${noSelectedCollectionValue}`}>None</label>
        <input
          type={'radio'}
          id={`region-collection-${noSelectedCollectionValue}`}
          value={noSelectedCollectionValue}
          name={'region-collection'}
          onChange={handleSelectedCollectionId}
          checked={selectedCollectionId === noSelectedCollectionValue} />
      </div>
    ),
    ...Object.entries(props.collectionChoices)
    .map(([collectionId, collectionParams]) => (
      <div className={'sub-region-collection-option'} key={collectionId}>
        <label htmlFor={`region-collection-${collectionId}`}>
          {collectionParams.metadata.shortName}
        </label>
        <input
          type={'radio'}
          id={`region-collection-${collectionId}`}
          value={collectionId}
          name={`region-collection-${collectionId}`}
          onChange={handleSelectedCollectionId}
          checked={selectedCollectionId === collectionId} />
      </div>
    ))
  ];

  return (
    <>
      <div className={'SubRegionCollectionSelector'}>
        {subRegionCollectionOptions}
      </div>
      {
        selectedCollectionId &&
        <SubRegionSelector
          parentCollectionShortName={props.collectionChoices[selectedCollectionId].metadata.shortName}
          subRegionChoices={props.collectionChoices[selectedCollectionId].regions}
        />
      }
    </>
  );
}
export default SubRegionCollectionSelector;

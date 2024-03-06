import React, {useEffect, useState} from 'react';
import {useSetAtom} from 'jotai';

import '@src/style/SubRegionCollectionSelector.css';
import {selectedRegionIdAtom} from '@src/state/client/selectedRegionId';
import {ISubRegionHierarchyCollectionRichIndex} from '@src/types/query/regions';
import SubRegionSelector from './SubRegionSelector';


interface ISubRegionCollectionSelector {
  collectionChoices: ISubRegionHierarchyCollectionRichIndex;
  parentRegionId: string;
}
const SubRegionCollectionSelector: React.FC<ISubRegionCollectionSelector> = (props) => {
  /* Generates a tree of selectors in mutual recursion with SubRegionSelector.
   *
   * Because the hierarchical `collectionChoices` data alternates between
   * region collections and members, starting with collections, the two
   * components can render each other until reaching the end of the data.
   *
   * This component should always be rendered by external components, never the SubRegionSelector.
   */
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | undefined>(undefined);
  const setSelectedRegionId = useSetAtom(selectedRegionIdAtom);

  // Set the selected region to the parent region when "None" is selected
  useEffect(() => {
    if (selectedCollectionId === undefined) {
      setSelectedRegionId(props.parentRegionId);
    }
  }, [selectedCollectionId]);

  const handleSelectedCollectionId = (e: React.ChangeEvent<HTMLInputElement>) => {
    // The "undefined" selection will come through as an empty string:
    const newCollectionId = e.currentTarget.value === "" ? undefined : e.currentTarget.value;
    setSelectedCollectionId(newCollectionId);
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
      <div id={'SubRegionCollectionSelector'}>
        {subRegionCollectionOptions}
      </div>
      {
        selectedCollectionId &&
        <SubRegionSelector
          parentCollectionShortName={props.collectionChoices[selectedCollectionId].metadata.shortName}
          parentRegionId={props.parentRegionId}
          subRegionChoices={props.collectionChoices[selectedCollectionId].regions}
        />
      }
    </>
  );
}
export default SubRegionCollectionSelector;

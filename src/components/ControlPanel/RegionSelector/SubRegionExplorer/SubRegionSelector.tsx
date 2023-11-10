import React, {useState} from 'react';
import {useSetRecoilState} from 'recoil';

import '@src/style/SubRegionSelector.css';
import selectedRegionIdAtom from '@src/state/client/selectedRegionId';
import SearchableSelect, {ISelectOptionProps} from '@src/components/common/SearchableSelect';
import {ISubRegionHierarchyCollectionRegionRichIndex} from '@src/types/query/regions';
import SubRegionCollectionSelector from './SubRegionCollectionSelector';


const getSubRegionOptionProps = (
  subRegionChoices: ISubRegionHierarchyCollectionRegionRichIndex,
  selectedSubRegionId?: string,
): ISelectOptionProps[] => {
  /* Generate the needed values (text, value) for each selectable region */
  const subRegionOptionProps = (
    Object.entries(subRegionChoices)
    .filter(([subRegionId, subRegion]) => !Object.keys(subRegion.metadata).includes('enabled') || subRegion.metadata.enabled)
    .map(([subRegionId, subRegion]) => (
      {
        text: `${subRegion.metadata.shortName} - ${subRegion.metadata.longName}`,
        value: subRegionId,
      }
    ))
  );

  return subRegionOptionProps;
}


interface ISubRegionSelector {
  subRegionChoices: ISubRegionHierarchyCollectionRegionRichIndex;
  parentCollectionShortName: string;
}
const SubRegionSelector: React.FC<ISubRegionSelector> = (props) => {
  const [selectedSubRegionId, setSelectedSubRegionId] = useState<string | undefined>(undefined);
  const setSelectedRegionId = useSetRecoilState(selectedRegionIdAtom);

  const handleSelectedSubRegionId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // The "undefined" selection will come through as an empty string:
    const newRegionId = e.currentTarget.value;
    setSelectedSubRegionId(newRegionId);
    // TODO: Hook to change in response to the state change?
    setSelectedRegionId(newRegionId);
  }

  const subRegionOptionProps = getSubRegionOptionProps(
    props.subRegionChoices,
    selectedSubRegionId,
  );
  if (subRegionOptionProps.length === 0) {
    throw new Error('Zero subregions found in selected collection.');
  }

  const childCollections = selectedSubRegionId && props.subRegionChoices[selectedSubRegionId]?.collections;
  return (
    <>
      <div className={'SubRegionSelector'}>
        <label htmlFor={'subregion-selector'}>{'Sub-region: '}</label>
        <SearchableSelect 
          id={'subregion-selector'}
          placeholderText={`Select a ${props.parentCollectionShortName}...`}
          value={selectedSubRegionId}
          onChange={handleSelectedSubRegionId}
          selectOptionProps={subRegionOptionProps} />
      </div>
      {
        childCollections &&
        <SubRegionCollectionSelector
          parentRegionId={selectedSubRegionId}
          collectionChoices={childCollections}
        />
      }
    </> 
  );
}
export default SubRegionSelector;

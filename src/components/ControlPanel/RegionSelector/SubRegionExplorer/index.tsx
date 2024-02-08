import React from 'react';
import {useAtomValue} from 'jotai';

import LoadingMessage from '@src/components/common/LoadingMessage';
import {richSubRegionsHierarchyAtom} from '@src/state/client/derived/richSubRegionsHierarchy';
import {selectedSuperRegionIdAtom} from '@src/state/client/selectedSuperRegionId';
import SubRegionCollectionSelector from './SubRegionCollectionSelector';


const SubRegionExplorer: React.FC = () => {
  const selectedSuperRegionId = useAtomValue(selectedSuperRegionIdAtom);
  if (!selectedSuperRegionId) {
    throw new Error(
      'Programmer error: A SuperRegion should have already been selected.'
    );
  }

  const subRegionsHierarchy = useAtomValue(richSubRegionsHierarchyAtom);
  // TODO: Better handle loading and errors? Previous code had a react-query
  //       interface, but now that's behind a derived atom.
  if (subRegionsHierarchy === undefined) {
    return <LoadingMessage message={"Loading subregions..."} />;
  }

  return (
    <div className="SubRegionExplorer">
      <SubRegionCollectionSelector
        collectionChoices={subRegionsHierarchy.collections}
        parentRegionId={selectedSuperRegionId}
      />
    </div>
  );
}

export default SubRegionExplorer;

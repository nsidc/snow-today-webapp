import React from 'react';
import {useAtomValue} from 'jotai';

import LoadingMessage from '@src/components/common/LoadingMessage';
import {useSubRegionsQuery} from '@src/serverState/regionsIndex';
import {selectedSuperRegionIdAtom} from '@src/state/client/selectedSuperRegionId';
import SubRegionCollectionSelector from './SubRegionCollectionSelector';


const SubRegionExplorer: React.FC = () => {
  const selectedSuperRegionId = useAtomValue(selectedSuperRegionIdAtom);
  if (!selectedSuperRegionId) {
    throw new Error(
      'Programmer error: A SuperRegion should have already been selected.'
    );
  }

  const subRegionsQuery = useSubRegionsQuery(selectedSuperRegionId);
  if (subRegionsQuery.isLoading) {
    return <LoadingMessage message={"Loading subregions..."} />;
  }
  if (subRegionsQuery.isError) {
    throw new Error(
      'Programmer error: This should have been caught by an error boundary.'
    );
  }

  return (
    <div className="SubRegionExplorer">
      <SubRegionCollectionSelector
        collectionChoices={subRegionsQuery.data.collections}
        parentRegionId={selectedSuperRegionId}
      />
    </div>
  );
}

export default SubRegionExplorer;

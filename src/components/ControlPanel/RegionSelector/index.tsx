import React from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {useAtomValue} from 'jotai';

import '@src/style/dropdownForm.css';
import {ErrorFallbackRegionSelectorComponent} from '@src/components/common/ErrorFallback';
import LoadingButton from '@src/components/common/LoadingButton';
import {superRegionsIndexQueryAtom} from '@src/state/server/regionsIndex';
import {selectedSuperRegionIdAtom} from '@src/state/client/selectedSuperRegionId';
import SuperRegionSelector from './SuperRegionSelector';
import SubRegionExplorer from './SubRegionExplorer';


const RegionSelector: React.FC = () => {
  const superRegionsIndexQuery = useAtomValue(superRegionsIndexQueryAtom);
  const selectedSuperRegionId = useAtomValue(selectedSuperRegionIdAtom);

  if (superRegionsIndexQuery.isError) {
    throw new Error(String(superRegionsIndexQuery.error));
  } else if (superRegionsIndexQuery.isLoading) {
    return (
      <LoadingButton variant={'success'} />
    );
  }


  // TODO: Should we pass in superRegionsIndexQuery.data as a prop or use the
  // query hook in SuperRegionSelector? Trade-offs?
  return (
    <DropdownButton title={'Select a Region'} variant={'success'}>
      <div className={'RegionSelector dropdown-form'}>
        <SuperRegionSelector indexQueryData={superRegionsIndexQuery.data} />

        <ErrorBoundary
          FallbackComponent={ErrorFallbackRegionSelectorComponent}
          resetKeys={[selectedSuperRegionId]}
        >
          <SubRegionExplorer />
        </ErrorBoundary>

      </div>
    </DropdownButton>
  );
}

export default RegionSelector;

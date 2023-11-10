import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';

import '@src/style/dropdownForm.css';
import LoadingButton from '@src/components/common/LoadingButton';
import {useSuperRegionsIndexQuery} from '@src/serverState/regionsIndex';
import SuperRegionSelector from './SuperRegionSelector';
import SubRegionExplorer from './SubRegionExplorer';


const RegionSelector: React.FC = () => {
  const superRegionsIndexQuery = useSuperRegionsIndexQuery();

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
        <SubRegionExplorer />
      </div>
    </DropdownButton>
  );
}

export default RegionSelector;

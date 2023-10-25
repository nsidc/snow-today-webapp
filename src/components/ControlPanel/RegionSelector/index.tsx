import React from 'react';
import {useRecoilValue} from 'recoil';
import DropdownButton from 'react-bootstrap/DropdownButton';

import '@src/style/dropdownForm.css';
import LoadingButton from '@src/components/common/LoadingButton';
import selectedSuperRegionAtom from '@src/state/client/derived/selectedSuperRegion';
import useRegionsIndexQuery from '@src/serverState/regionsIndex';
import SuperRegionSelector from './SuperRegionSelector';
import SubRegionCollectionSelector from './SubRegionCollectionSelector';
import SubRegionSelector from './SubRegionSelector';


const RegionSelector: React.FC = () => {
  const selectedSuperRegion = useRecoilValue(selectedSuperRegionAtom);
  const regionsIndexQuery = useRegionsIndexQuery();

  if (regionsIndexQuery.isError) {
    console.debug(`Error!: ${regionsIndexQuery.error as string}`);
    return (
      <span>{`Error: ${regionsIndexQuery.error as string}`}</span>
    );
  } else if (
    regionsIndexQuery.isLoading
    || !selectedSuperRegion
  ) {
    return (
      <LoadingButton variant={'success'} message={'Waiting...'}/>
    );
  }

  return (
    <DropdownButton title={'Select a Region'} variant={'success'}>
      <div className={'RegionSelector dropdown-form'}>

        <SuperRegionSelector regionsIndexQueryData={regionsIndexQuery.data}/>

        <SubRegionCollectionSelector />

        <SubRegionSelector />

      </div>
    </DropdownButton>
  );
}

export default RegionSelector;

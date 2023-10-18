import React from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import DropdownButton from 'react-bootstrap/DropdownButton';

import '../../../style/dropdownForm.css';
import SuperRegionSelector from './SuperRegionSelector';
import SubRegionCollectionSelector from './SubRegionCollectionSelector';
import SubRegionSelector from './SubRegionSelector';
import LoadingButton from '../../common/LoadingButton';
import selectedSuperRegionNameAtom from '../../../state/client/selectedSuperRegionName';
import selectedSuperRegionAtom from '../../../state/client/derived/selectedSuperRegion';
import useRegionsIndexQuery from '../../../serverState/regionsIndex';


const RegionSelector: React.FC = () => {
  const setSelectedSuperRegionName = useSetRecoilState(selectedSuperRegionNameAtom);
  const selectedSuperRegion = useRecoilValue(selectedSuperRegionAtom);

  const regionsIndexQuery = useRegionsIndexQuery(setSelectedSuperRegionName);

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
      <LoadingButton />
    );
  }

  return (
    <DropdownButton title={'Select a Region'}>
      <div className={'RegionSelector dropdown-form'}>

        <SuperRegionSelector regionsIndexQueryData={regionsIndexQuery.data}/>

        <SubRegionCollectionSelector />

        <SubRegionSelector />

      </div>
    </DropdownButton>
  );
}

export default RegionSelector;

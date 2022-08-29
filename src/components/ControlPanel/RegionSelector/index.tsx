import React from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import DropdownButton from 'react-bootstrap/DropdownButton';

import '../../../style/dropdownForm.css';
import SuperRegionSelector from './SuperRegionSelector';
import SubRegionCollectionSelector from './SubRegionCollectionSelector';
import SubRegionSelector from './SubRegionSelector';
import selectedSuperRegionAtom from '../../../clientState/selectedSuperRegion';
import selectedSuperRegionObjectAtom from '../../../clientState/derived/selectedSuperRegionObject';
import useRegionsIndexQuery from '../../../serverState/regionsIndex';


const RegionSelector: React.FC = () => {
  const setSelectedSuperRegion = useSetRecoilState(selectedSuperRegionAtom);
  const selectedSuperRegionObject = useRecoilValue(selectedSuperRegionObjectAtom);

  const regionsIndexQuery = useRegionsIndexQuery(setSelectedSuperRegion);

  if (regionsIndexQuery.isError) {
    console.debug(`Error!: ${regionsIndexQuery.error as string}`);
    return (
      <span>{`Error: ${regionsIndexQuery.error as string}`}</span>
    );
  } else if (
    regionsIndexQuery.isLoading
    || !selectedSuperRegionObject
  ) {
    return (
      <span>{'Loading...'}</span>
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

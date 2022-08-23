import React from 'react';
import {useRecoilState} from 'recoil';
import DropdownButton from 'react-bootstrap/DropdownButton';

import '../../style/RegionSelector.css';
import '../../style/dropdownForm.css';
import selectedRegionAtom from '../../clientState/selectedRegion';
import useRegionsIndex from '../../serverState/regionsIndex';

const LOADING_VALUE = 'LOADING...';


const stateFromTargetValue = (targetValue: string) => {
  if (targetValue === LOADING_VALUE) {
    return undefined;
  } else {
    return targetValue;
  }
}


const RegionSelector: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useRecoilState(selectedRegionAtom);

  const regionsIndexQuery = useRegionsIndex(setSelectedRegion);

  if (regionsIndexQuery.isError) {
    console.debug(`Error!: ${regionsIndexQuery.error as string}`);
    return (
      <span>{`Error: ${regionsIndexQuery.error as string}`}</span>
    );
  }

  let shapeOptions: JSX.Element | Array<JSX.Element>;
  if (regionsIndexQuery.isLoading) {
    shapeOptions = (
      <option key={'loading'} value={LOADING_VALUE}>{'Loading regions...'}</option>
    );
  } else {
    const enabledRegions = Object.fromEntries(Object.entries(regionsIndexQuery.data).filter(
      ([key, params]) => !Object.keys(params).includes('enabled') || params.enabled === true 
    ));
    shapeOptions = Object.entries(enabledRegions).map(([key, params]) => {
      // TODO: type annotations
      return (
        <option key={String(key)} value={String(key)}>{(params as object)['longname']}</option>
      );
    });
  }

  return (
    <DropdownButton title='Select a Region'>
      <div className={'RegionSelector dropdown-form'}>
        <h5>✨ Coming soon: More controls!!! ✨</h5>
        <label htmlFor={'region-selector'}>Sub-region: </label>
        <select id={'region-selector'}
          value={selectedRegion}
          onChange={e => setSelectedRegion(stateFromTargetValue(e.currentTarget.value))}
        >
          {shapeOptions}
        </select>
      </div>
    </DropdownButton>
  );
}

export default RegionSelector

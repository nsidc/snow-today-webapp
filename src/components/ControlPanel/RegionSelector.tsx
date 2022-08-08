import React from 'react';
import {useRecoilState} from 'recoil';

import '../../style/RegionSelector.css';
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

  const shapesIndexQuery = useRegionsIndex(setSelectedRegion);

  if (shapesIndexQuery.isError) {
    console.debug('Error!: ' + shapesIndexQuery.error);
    return (
      <span>{'Error: ' + shapesIndexQuery.error}</span>
    );
  }

  let shapeOptions: JSX.Element | Array<JSX.Element>;
  if (shapesIndexQuery.isLoading) {
    shapeOptions = (
      <option key={'loading'} value={LOADING_VALUE}>{'Loading regions...'}</option>
    );
  } else {
    shapeOptions = Object.entries(shapesIndexQuery.data).map(([key, params]) => {
      // TODO: type annotations
      return (
        <option key={String(key)} value={String(key)}>{(params as object)['longname']}</option>
      );
    });
  }

  return (
    <span className="RegionSelector">
      <label htmlFor={'region-selector'}>Region: </label>
      <select id={'region-selector'}
        value={selectedRegion}
        onChange={e => setSelectedRegion(stateFromTargetValue(e.currentTarget.value))}
      >
        {shapeOptions}
      </select>
    </span>
  );
}

export default RegionSelector

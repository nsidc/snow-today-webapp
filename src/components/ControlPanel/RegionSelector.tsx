import React from 'react';
import {useRecoilState} from 'recoil';

import '../../style/RegionSelector.css';
import selectedRegionAtom from '../../clientState/selectedRegion';
import useShapesIndex from '../../serverState/shapesIndex';


const RegionSelector: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useRecoilState(selectedRegionAtom);

  const shapesQuery = useShapesIndex();

  if (shapesQuery.isLoading) {
    return (
      <div>Loading...</div>
    );
  }
  if (shapesQuery.isError) {
    console.debug('Error!: ' + shapesQuery.error);
    return (
      <div>{'Error: ' + shapesQuery.error}</div>
    );
  }

  const shapeOptions = Object.entries(shapesQuery.data).map(([key, params]) => {
    // TODO: type annotations
    return (
      <option key={String(key)} value={String(key)}>{(params as object)['longname']}</option>
    );
  });

  return (
    <span className="RegionSelector">
      <label htmlFor={'region-selector'}>Region: </label>
      <select id={'region-selector'}
        value={selectedRegion}
        onChange={e => setSelectedRegion(e.currentTarget.value)}
      >
        {shapeOptions}
      </select>
    </span>
  );
}

export default RegionSelector

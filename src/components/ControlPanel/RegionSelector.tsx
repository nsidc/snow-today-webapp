import React from 'react';
import {useRecoilState} from 'recoil';
import {useQuery} from '@tanstack/react-query';

import '../../style/RegionSelector.css';
import {fetchShapesIndex} from '../../util/shapes';
import selectedRegionAtom from '../../clientState/selectedRegion';

const RegionSelector: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useRecoilState(selectedRegionAtom);

  const shapesQuery = useQuery(['shapesIndex'], fetchShapesIndex);

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
    // TODO: Better type annotations
    return (
      <option key={String(key)}>{(params as object)['longname']}</option>
    );
  });

  return (
    <span className="RegionSelector">
      <label htmlFor={'region-selector'}>Region: </label>
      <select id={'region-selector'}
        value={selectedRegion}
        onChange={e => setSelectedRegion(e.currentTarget.value)}
      >
        <option key={'n/a'}>Select a region</option>
        {shapeOptions}
      </select>
    </span>
  );
}

export default RegionSelector

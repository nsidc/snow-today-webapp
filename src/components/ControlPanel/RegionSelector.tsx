import React from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import DropdownButton from 'react-bootstrap/DropdownButton';

import '../../style/dropdownForm.css';
import selectedRegionAtom from '../../clientState/selectedRegion';
import selectedSubRegionCollectionAtom from '../../clientState/selectedSubRegionCollection';
import {DEFAULT_SUBREGION_COLLECTION} from '../../clientState/selectedSubRegionCollection/atom';
import selectedRegionObjectAtom from '../../clientState/derived/selectedRegionObject';
import useRegionsIndexQuery from '../../serverState/regionsIndex';


const RegionSelector: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useRecoilState(selectedRegionAtom);
  const [
    selectedSubRegionCollection,
    setSelectedSubRegionCollection,
  ] = useRecoilState(selectedSubRegionCollectionAtom);
  const selectedRegionObject = useRecoilValue(selectedRegionObjectAtom);

  const regionsIndexQuery = useRegionsIndexQuery(setSelectedRegion);

  if (regionsIndexQuery.isError) {
    console.debug(`Error!: ${regionsIndexQuery.error as string}`);
    return (
      <span>{`Error: ${regionsIndexQuery.error as string}`}</span>
    );
  } else if (
    regionsIndexQuery.isLoading
    || !selectedRegionObject
  ) {
    return (
      <span>{'Loading...'}</span>
    );
  };

  const regionOptions = Object.entries(regionsIndexQuery.data).map(([regionId, params]) => (
    <option key={regionId} value={regionId}>{params['longname']}</option>
  ));

  const handleSelectedSubRegionCollection = (e: any) => {
    const newSubRegionCollection = e.currentTarget.value;
    debugger;
    setSelectedSubRegionCollection(newSubRegionCollection);
  }
  const subRegionCollectionOptions = [
    (
      <React.Fragment>
        <label htmlFor={`region-collection-${DEFAULT_SUBREGION_COLLECTION}`}>None</label>
        <input
          type={'radio'}
          id={`region-collection-${DEFAULT_SUBREGION_COLLECTION}`}
          key={DEFAULT_SUBREGION_COLLECTION}
          value={DEFAULT_SUBREGION_COLLECTION}
          name={'region-collection'}
          onChange={handleSelectedSubRegionCollection}
          checked={selectedSubRegionCollection === DEFAULT_SUBREGION_COLLECTION} />
      </React.Fragment>
    ),
    ...Object.entries(selectedRegionObject.subregion_collections)
    .map(([regionCollectionId, params]) => (
      <React.Fragment>
        <label htmlFor={`region-collection-${regionCollectionId}`}>
          {params['shortname']}
        </label>
        <input
          type={'radio'}
          id={`region-collection-${regionCollectionId}`}
          key={regionCollectionId}
          value={regionCollectionId}
          name={'region-collection'}
          onChange={handleSelectedSubRegionCollection}
          checked={selectedSubRegionCollection === regionCollectionId} />
      </React.Fragment>
    ))
  ];

  return (
    <DropdownButton title={'Select a Region'}>
      <div className={'RegionSelector dropdown-form'}>
        <label htmlFor={'region-selector'}>{'Region: '}</label>
        <select id={'region-selector'}
          value={selectedRegion}
          onChange={e => setSelectedRegion(e.currentTarget.value)}
        >
          {regionOptions}
        </select>
        <div className={'subregion-collection-selector'}>
          {subRegionCollectionOptions}
        </div>
        <div className={'subregion-selector'}>
          {'Sub-region'}
        </div>
      </div>
    </DropdownButton>
  );
}

export default RegionSelector;

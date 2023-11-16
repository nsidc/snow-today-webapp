import React from 'react';
import {useSetRecoilState} from 'recoil';
import Button from 'react-bootstrap/Button';

import selectedSuperRegionIdAtom from '@src/state/client/selectedSuperRegionId';
import selectedRegionIdAtom from '@src/state/client/selectedRegionId';
import {useSuperRegionsIndexQuery} from '@src/serverState/regionsIndex';
import LoadingMessage from '@src/components/common/LoadingMessage';
import '@src/style/SuperRegionSplashSelector.css';


const SuperRegionSplashSelector: React.FC = () => {
  /* A splash selector for use on app init, when no super region has been selected. */
  const setSelectedSuperRegionId = useSetRecoilState(selectedSuperRegionIdAtom);
  const setSelectedRegionId = useSetRecoilState(selectedRegionIdAtom);
  const superRegionsIndexQuery = useSuperRegionsIndexQuery();

  if (superRegionsIndexQuery.isLoading) {
    return (<div className={'centered-card-text'}><LoadingMessage /></div>);
  }

  if (superRegionsIndexQuery.isError) {
    throw 'how to handle this better? Shouldn\'t the error boundary handle this??';
  }

  const handleSelection = (superRegionId: string) => {
    setSelectedSuperRegionId(superRegionId);
    // TODO: Is this a good practice? Setting two pieces of Recoil state
    // together? Why not use the state graph?
    setSelectedRegionId(superRegionId);
  }

  const superRegionButtons = Object.entries(superRegionsIndexQuery.data).map(
    ([superRegionId, superRegion]) => (
      <Button
        variant='success'
        value={superRegionId}
        key={superRegionId}
        onClick={e => handleSelection(superRegionId)}
        block>
        {superRegion.longName}
      </Button>
    ),
  );

  return (
    <div id={'SuperRegionSplashSelector'}>
      {superRegionButtons}
    </div>
  );
}
export default SuperRegionSplashSelector;

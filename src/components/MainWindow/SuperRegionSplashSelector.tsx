import React from 'react';
import {useSetRecoilState} from 'recoil';
import Button from 'react-bootstrap/Button';

import selectedSuperRegionIdAtom from '@src/state/client/selectedSuperRegionId';
import useRegionsIndexQuery from '@src/serverState/regionsIndex';
import LoadingMessage from '@src/components/common/LoadingMessage';
import '@src/style/SuperRegionSplashSelector.css';


/* A splash selector for use when no super region has been selected */
/* TODO: Loading */
const SuperRegionSplashSelector: React.FC = () => {
  const setSelectedSuperRegionId = useSetRecoilState(selectedSuperRegionIdAtom);
  const regionsIndexQuery = useRegionsIndexQuery();

  if (regionsIndexQuery.isLoading) {
    return (<div className={'centered-card-text'}><LoadingMessage /></div>);
  }

  if (regionsIndexQuery.isError) {
    throw 'how to handle this better? Shouldn\'t the error boundary handle this??';
  }

  const superRegionButtons = Object.entries(regionsIndexQuery.data).map(
    ([superRegionId, superRegion]) => (
      <div key={superRegionId} className={'SuperRegionSplashSelectorButton'}>
        <Button
          variant='success'
          value={superRegionId}
          onClick={e => setSelectedSuperRegionId(superRegionId)}>
          {superRegion.longName}
        </Button>
      </div>
    ),
  );

  return (
    <div id={'SuperRegionSplashSelector'}>
      {superRegionButtons}
    </div>
  );
}
export default SuperRegionSplashSelector;

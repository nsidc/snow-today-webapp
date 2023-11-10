import React from 'react';
import {useSetRecoilState} from 'recoil';
import Button from 'react-bootstrap/Button';

import selectedSuperRegionIdAtom from '@src/state/client/selectedSuperRegionId';
import {useSuperRegionsIndexQuery} from '@src/serverState/regionsIndex';
import LoadingMessage from '@src/components/common/LoadingMessage';
import '@src/style/SuperRegionSplashSelector.css';


/* A splash selector for use when no super region has been selected */
/* TODO: Loading */
const SuperRegionSplashSelector: React.FC = () => {
  const setSelectedSuperRegionId = useSetRecoilState(selectedSuperRegionIdAtom);
  const superRegionsIndexQuery = useSuperRegionsIndexQuery();

  if (superRegionsIndexQuery.isLoading) {
    return (<div className={'centered-card-text'}><LoadingMessage /></div>);
  }

  if (superRegionsIndexQuery.isError) {
    throw 'how to handle this better? Shouldn\'t the error boundary handle this??';
  }

  const superRegionButtons = Object.entries(superRegionsIndexQuery.data).map(
    ([superRegionId, superRegion]) => (
      <Button
        variant='success'
        value={superRegionId}
        key={superRegionId}
        onClick={e => setSelectedSuperRegionId(superRegionId)}
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

import React from 'react';
import {useRecoilState} from 'recoil';

import notProcessedLayerEnabledAtom from '../../state/client/notProcessedLayerEnabled';

const NotProcessedLayerToggle: React.FC = () => {
  const [notProcessedLayerEnabled, setNotProcessedLayerEnabled] = useRecoilState(notProcessedLayerEnabledAtom);

  return (
    <span className={'NotProcessedLayerToggle'}>
      <label htmlFor={'notprocessed-toggle-checkbox'}>
        {'Display not-processed area:'}
      </label>
      <input id={'notprocessed-toggle-checkbox'}
        type={'checkbox'}
        checked={notProcessedLayerEnabled}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setNotProcessedLayerEnabled(e.target.checked);
        }} />
    </span>
  );
}

export default NotProcessedLayerToggle;

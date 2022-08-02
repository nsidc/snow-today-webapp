import React from 'react';

import '../../style/ControlPanel.css';
import BasemapSelector from '../BasemapSelector';
import DebugDumpButton from '../DebugDumpButton';
import RegionSelector from '../RegionSelector';

declare const __ENVIRONMENT__: 'development' | 'production';
if (__ENVIRONMENT__ === 'development') {
  console.log(`Environment is: ${__ENVIRONMENT__}`);
}


const ControlPanel: React.FC = () => {
  return (
    <div className="ControlPanel">
      {__ENVIRONMENT__ === 'development' &&
        <DebugDumpButton />
      }

      <BasemapSelector />

      <RegionSelector />

    </div>
  );
}

export default ControlPanel;

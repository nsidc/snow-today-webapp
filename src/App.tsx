import React from 'react';

import pkg from '../package.json';
import './style/App.css';
import ControlPanel from './components/ControlPanel';
import LinePlot from './components/LinePlot';
import SlippyMap from './components/SlippyMap';

const App: React.FC = () => {
  return (
    <div className={"App"}>
      <div id={"version"}>v{pkg.version}</div>

      <ControlPanel />
      <div id={"views-container"}>
        <SlippyMap />
        <LinePlot />
      </div>

    </div>
  );
}

export default App;

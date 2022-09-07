import React from 'react';

import pkg from '../package.json';
import './style/App.css';
import ControlPanel from './components/ControlPanel';
import TileLayout from './components/TileLayout';

const App: React.FC = () => {
  return (
    <div className={"App"}>
      <div id={"version"}>v{pkg.version}</div>

      <ControlPanel />
      <TileLayout />

    </div>
  );
}

export default App;

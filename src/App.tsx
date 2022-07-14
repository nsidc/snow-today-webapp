import React from 'react';

import pkg from '../package.json';
import './style/App.css';
import Map from './components/Map';
import BasemapSelector from './components/BasemapSelector';


const App: React.FC = () => (
  <div className="App">

    <div id="version">v{pkg.version}</div>

    <Map />

    <BasemapSelector />

  </div>
);

export default App;

import React, {useState} from 'react';

import pkg from '../package.json';
import './style/App.css';
import Map from './components/Map';
import BasemapSelector from './components/BasemapSelector';
import {Basemap} from './types/Map';


const App: React.FC = () => {
  const [ selectedBasemap, setSelectedBasemap ] = useState<Basemap>('USGSTopo');

  return (
    <div className="App">
      <div id="version">v{pkg.version}</div>

      <Map
        selectedBasemap={selectedBasemap} />

      <BasemapSelector
        selectedBasemap={selectedBasemap}
        onChange={setSelectedBasemap} />


    </div>
  );
}

export default App;

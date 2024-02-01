import React from 'react';
import {useAtom} from 'jotai';

import '@src/style/TileTypeSelector.css';
import {ITileIdentifier, TileType, tileTypes} from '@src/types/layout';
import {selectedTileTypeAtomFamily} from '@src/state/client/selectedTileType';


const TileTypeSelector: React.FC<ITileIdentifier> = (props) => {
  const [selectedTileType, setSelectedTileType] = useAtom(
    selectedTileTypeAtomFamily(props)
  );

  const selectId = `tile-type-${props.row}-${props.col}`;
  return (
    <div className={'TileTypeSelector'}>
      <label htmlFor={selectId}>Tile type:</label>
      <select
        id={selectId}
        value={selectedTileType}
        onChange={
          (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedTileType(e.target.value as TileType)
        }>

        {tileTypes.map(tileType => (
          <option key={tileType} value={tileType}>
            {tileType.charAt(0).toUpperCase() + tileType.slice(1)}
          </option>
        ))}

      </select>
    </div>
  );
}

export default TileTypeSelector; 

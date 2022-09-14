import React from 'react';

import {Rnd} from 'react-rnd';


interface ISlippyMapLegendProps {
  imageUrl: string;
  mapUid: string;
}

const SlippyMapLegend: React.FC<ISlippyMapLegendProps> = (props) => {
  const elementId = `legend-${props.mapUid}`;

  return (
    <Rnd
      bounds='parent'
      lockAspectRatio={true}
      maxWidth={'100%'}
      default={{x: 50, y: 600, width: 'auto', height: 'auto'}}>
      <img
        id={elementId}
        src={props.imageUrl}
        draggable={false}
        style={{width: 'inherit'}} />
    </Rnd>
  );

}
export default SlippyMapLegend;

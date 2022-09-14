import React, {useState} from 'react';

import {Rnd} from 'react-rnd';


interface ISlippyMapLegendProps {
  imageUrl: string;
  mapUid: string;
  parentWidthPx: number;
}

const SlippyMapLegend: React.FC<ISlippyMapLegendProps> = (props) => {
  const [legendWidth, setLegendWidth] = useState<number>(0);

  const elementId = `legend-${props.mapUid}`;
  const xPos = (props.parentWidthPx - legendWidth) / 2;
  const imgElement = (
    <img
      id={elementId}
      src={props.imageUrl}
      draggable={false}
      style={{width: 'inherit'}}
      onLoad={(e: React.ChangeEvent<HTMLImageElement>) => setLegendWidth(e.target.offsetWidth)} />
  );

  // We must trigger the image element's `onLoad` to get its width _before_
  // setting default position on the Rnd component
  if (legendWidth == 0) {
    return imgElement;
  }
  return (
    <Rnd
      bounds='parent'
      lockAspectRatio={true}
      maxWidth={'100%'}
      default={{x: xPos, y: 700, width: 'auto', height: 'auto'}} >
      
      {imgElement}
    </Rnd>
  );

}
export default SlippyMapLegend;

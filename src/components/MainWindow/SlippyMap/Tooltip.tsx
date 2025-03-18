import React from 'react';

import Feature from 'ol/Feature';
import {MdClose} from 'react-icons/md';

import '@src/style/SlippyMapTooltip.css';
import {SwePointForOverlay} from '@src/types/swe';

interface ISlippyMapTooltipProps {
  features: Array<Feature>;
  unit: string | undefined;
  onClose: () => void;
}


const SlippyMapTooltip: React.FC<ISlippyMapTooltipProps> = (props) => {

  const featuresHTML = (props: ISlippyMapTooltipProps): JSX.Element | null => {
    const f = props.features[0]
    if (f === undefined) {
      return null;
    }

    // The real return type of .getProperties() is `{ [key: string]: any; }`
    const featureData = f.getProperties().data as SwePointForOverlay;

    // NOTE: The key on the `img` tag prevents the browser from re-using the
    // last image while waiting for the next image to load. There must be a
    // better way.
    return (
      <div className="SlippyMapTooltip">
        <div className="content">

          <div className="close-button" onClick={props.onClose}>
            <MdClose />
          </div>
          <div className="feature-title">
            <h3>{featureData['name']}</h3>
            <div>{featureData['lon']}, {featureData['lat']}</div>
          </div>

          <div className="feature-attribute">
            Elevation: {featureData['elevation_meters']} meters
          </div>

          <div className="feature-attribute">
            Value: {featureData['measurement_inches']} {props.unit}
          </div>

        </div>
      </div>
    );
  };

  return featuresHTML(props);
}

export default SlippyMapTooltip;

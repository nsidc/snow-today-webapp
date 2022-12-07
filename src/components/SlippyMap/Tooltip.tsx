import React from 'react';

import Feature from 'ol/Feature';
import {MdClose} from 'react-icons/md';

import '../../style/SlippyMapTooltip.css';
import {SwePointForOverlay} from '../../types/swe';

interface ISlippyMapTooltipProps {
  features: Array<Feature>;
  onClose: () => void;
}


const SlippyMapTooltip: React.FC<ISlippyMapTooltipProps> = (props) => {

  const featuresHTML = (features: Array<Feature>): JSX.Element | null => {
    const f = features[0]
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
            Value: {featureData['measurement_inches']}
          </div>

        </div>
      </div>
    );
  };

  return featuresHTML(props.features);
}

export default SlippyMapTooltip;

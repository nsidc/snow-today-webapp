import {FallbackProps} from 'react-error-boundary';

import '@src/style/error.css';
import RefreshPageButton from './RefreshPageButton';


export const ErrorFallbackComponent = (props: FallbackProps) => (
  <div role="alert" className="error">
    <h3>Whoops!</h3>

    <div className="error-message">{props.error.message}</div>

    <p>
     Something went wrong. This application is currently unavailable. Please try again later.
    </p>

    <p><b>
      {"If the error persists, copy the red error text and send to "}
      <a href="mailto:nsidc@nsidc.org">NSIDC User Services</a>.
    </b></p>

    <RefreshPageButton />
  </div>
);


export const ErrorFallbackTileComponent = (props: FallbackProps) => (
  <div role="alert" className="error tile-message">
    <h3>
      Unable to display this tile.
    </h3>

    <div className="error-message">{props.error.message}</div>
  
    <p><b>
      To recover, try changing the selected region, variable, or tile type.
    </b></p>
  </div>
);


export const ErrorFallbackRegionSelectorComponent = (props: FallbackProps) => (
  <div role="alert" className="error">
    <details>
      <summary>Failed to load sub-regions. Please select another region!</summary>
      <div className="error-message">{props.error.message}</div>
    </details>
  </div>
)


export default ErrorFallbackComponent;

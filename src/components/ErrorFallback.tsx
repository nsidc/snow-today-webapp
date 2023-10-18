type ErrorFallbackParams = {error: Error, resetErrorBoundary: () => void};
const ErrorFallbackComponent = ({error, resetErrorBoundary}: ErrorFallbackParams) => (
  <div role="alert" className="error">
    <h3>Woops!</h3>

    <div className="error-message">{error.message}</div>

    <p>
     Something went wrong. This application is currently unavailable. Please try again later.
     If the error persists, copy the red error text and send to NSIDC User Services at the link below.
    </p>

    <p><b>
      {"Please contact "}
      <a href="mailto:nsidc@nsidc.org">NSIDC User Services</a>
      {" if you need additional assistance."}
    </b></p>
  </div>
);

export default ErrorFallbackComponent;

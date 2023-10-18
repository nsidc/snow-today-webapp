type ErrorFallbackParams = {error: Error, resetErrorBoundary: () => void};
const ErrorFallbackComponent = ({error, resetErrorBoundary}: ErrorFallbackParams) => (
  <div role="alert" className="error">
    <h3>Whoops!</h3>

    <div className="error-message">{error.message}</div>

    <p>
     Something went wrong. This application is currently unavailable. Please try again later.
    </p>

    <p><b>
      {"If the error persists, copy the red error text and send to "}
      <a href="mailto:nsidc@nsidc.org">NSIDC User Services</a>.
    </b></p>
  </div>
);

export default ErrorFallbackComponent;

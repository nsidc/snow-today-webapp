type ErrorFallbackParams = {error: Error, resetErrorBoundary: () => void};
const ErrorFallbackComponent = ({error, resetErrorBoundary}: ErrorFallbackParams) => (
  <div role="alert" className="error">
    <h3>Whoops!</h3>

    <div className="error-message">{error.message}</div>

    <p>
     It's likely this application is down because other web services it depends on are currently down.
     Refresh the page later to try again.
    </p>

    <p><b>
      {"Please contact "}
      <a href="mailto:nsidc@nsidc.org">NSIDC User Services</a>
      {" if you need additional assistance."}
    </b></p>
  </div>
);

export default ErrorFallbackComponent;

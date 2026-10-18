import "./Error.css";

function Error({ message, onRetry }) {
  return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>

      <h2>Something went wrong</h2>

      <p>{message}</p>

      <button className="retry-button" onClick={onRetry}>
        Try Again
      </button>
    </div>
  );
}

export default Error;

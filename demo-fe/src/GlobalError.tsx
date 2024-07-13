import React from 'react';

interface GlobalErrorProps {
    error: Error;
    resetErrorBoundary: () => void;
};

const GlobalError: React.FC<GlobalErrorProps> = ({ error, resetErrorBoundary }) => {
    return (
        <div className="error-page">
            <h1>Oops! Something went wrong.</h1>
            <p>We're sorry for the inconvenience. Please try the following:</p>
            <ul>
                <li>Check your internet connection.</li>
                <li>Try refreshing the page.</li>
                <li>Go back to the <a href="/">homepage</a>.</li>
            </ul>
            <div className="error-details">
                <details>
                    <summary>Click for error details</summary>
                    <pre>{error.message}</pre>
                </details>
            </div>
            <button onClick={resetErrorBoundary}>Try Again</button>
        </div>
    );
};

export default GlobalError;

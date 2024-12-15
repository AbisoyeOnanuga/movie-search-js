import React from 'react';
import './ErrorMessage.css'; // Import styles for the error message

const ErrorMessage = ({ message, onRetry }) => {
    return (
        <div className="error-message">
            <p>{message}</p>
            <button onClick={onRetry}>Retry</button>
        </div>
    );
};

export default ErrorMessage; 
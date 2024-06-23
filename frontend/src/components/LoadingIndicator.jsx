import React from "react";

const LoadingIndicator = () => {
  return (
    <div className="text-center mb-2">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingIndicator;

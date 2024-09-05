import React from 'react';

const LoadMoreButton = ({ onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled} className="btn btn-primary button-uniform button-spacing">
      Load More
    </button>
  );
};

export default LoadMoreButton;

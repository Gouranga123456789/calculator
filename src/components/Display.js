import React from 'react';

const Display = ({ input, output }) => {
  return (
    <div className="display">
      <div className="input">{input}</div>
      <div className="output">{output}</div>
    </div>
  );
};

export default Display;

import React from 'react';

const History = ({ history, onClear }) => {
  return (
    <div className="history">
      <h2>History</h2>
      <ul>
        {history.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button className="clear-button" onClick={onClear}>
        Clear History
      </button>
    </div>
  );
};

export default History;

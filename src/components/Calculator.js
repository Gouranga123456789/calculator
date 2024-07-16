import React, { useState } from 'react';
import Button from './Button';
import Display from './Display';
import History from './History';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [history, setHistory] = useState([]);

  const calculateResult = (input) => {
    // Replace -- with + and ++ with + to handle cases like 5--2 and 5++2
    const sanitizedInput = input.replace(/--/g, '+').replace(/\+\+/g, '+');

    try {
      // eslint-disable-next-line no-new-func
      const result = new Function(`return (${sanitizedInput})`)();
      return result;
    } catch {
      return 'Error';
    }
  };

  const handleButtonClick = (value) => {
    if (value === '=') {
      const result = calculateResult(input);
      setOutput(result);
      setHistory([...history, `${input} = ${result}`]);
    } else if (value === 'C') {
      setInput('');
      setOutput('');
    } else {
      setInput((prev) => prev + value);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        <Display input={input} output={output} />
        <div className="button-panel">
          {['7', '8', '9', '/'].map((btn) => (
            <Button key={btn} value={btn} onClick={handleButtonClick} />
          ))}
          {['4', '5', '6', '*'].map((btn) => (
            <Button key={btn} value={btn} onClick={handleButtonClick} />
          ))}
          {['1', '2', '3', '-'].map((btn) => (
            <Button key={btn} value={btn} onClick={handleButtonClick} />
          ))}
          {['0', '.', '=', '+'].map((btn) => (
            <Button key={btn} value={btn} onClick={handleButtonClick} />
          ))}
          <Button value="C" onClick={handleButtonClick} />
        </div>
      </div>
      <History history={history} onClear={handleClearHistory} />
    </div>
  );
};

export default Calculator;

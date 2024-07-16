import React, { useState } from 'react';
import Button from './Button';
import Display from './Display';
import History from './History';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [history, setHistory] = useState([]);

  const calculateResult = (input) => {
    const sanitizedInput = input.replace(/--/g, '+').replace(/\+\+/g, '+');

    try {
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
    } else if (value === 'AC') {
      setInput(input.slice(0, -1));
    } else if (value === '√') {
      const result = Math.sqrt(parseFloat(input));
      setOutput(result);
      setHistory([...history, `√${input} = ${result}`]);
    } else if (value === 'x²') {
      const result = Math.pow(parseFloat(input), 2);
      setOutput(result);
      setHistory([...history, `${input}² = ${result}`]);
    } else if (value === 'x³') {
      const result = Math.pow(parseFloat(input), 3);
      setOutput(result);
      setHistory([...history, `${input}³ = ${result}`]);
    } else if (value === '∛') {
      const result = Math.cbrt(parseFloat(input));
      setOutput(result);
      setHistory([...history, `∛${input} = ${result}`]);
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
          <Button value="√" onClick={handleButtonClick} />
          <Button value="x²" onClick={handleButtonClick} />
          <Button value="x³" onClick={handleButtonClick} />
          <Button value="∛" onClick={handleButtonClick} />
          <Button value="C" onClick={handleButtonClick} />
          <Button value="AC" onClick={handleButtonClick} />
        </div>
      </div>
      <History history={history} onClear={handleClearHistory} />
    </div>
  );
};

export default Calculator;

import React, { useState } from 'react';
import { Display } from './Display';
import { Button } from './Button';
import { ButtonType } from '../types';

export const Calculator: React.FC = () => {
  const [currentValue, setCurrentValue] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [historyDisplay, setHistoryDisplay] = useState('');

  const handleNumber = (num: string) => {
    if (waitingForNewValue) {
      setCurrentValue(num);
      setWaitingForNewValue(false);
    } else {
      setCurrentValue(currentValue === '0' ? num : currentValue + num);
    }
  };

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setCurrentValue('0.');
      setWaitingForNewValue(false);
      return;
    }
    if (!currentValue.includes('.')) {
      setCurrentValue(currentValue + '.');
    }
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return a / b;
      default: return b;
    }
  };

  const handleOperator = (op: string) => {
    const current = parseFloat(currentValue);

    if (operator && waitingForNewValue) {
      setOperator(op);
      setHistoryDisplay(previousValue + ' ' + op);
      return;
    }

    if (previousValue == null) {
      setPreviousValue(currentValue);
      setHistoryDisplay(currentValue + ' ' + op);
    } else if (operator) {
      const prev = parseFloat(previousValue);
      const result = calculate(prev, current, operator);
      setPreviousValue(String(result));
      setCurrentValue(String(result));
      setHistoryDisplay(String(result) + ' ' + op);
    }

    setOperator(op);
    setWaitingForNewValue(true);
  };

  const handleEqual = () => {
    if (!operator || previousValue === null) return;

    const current = parseFloat(currentValue);
    const prev = parseFloat(previousValue);
    const result = calculate(prev, current, operator);

    // Format result to avoid long decimals if possible
    const formattedResult = parseFloat(result.toFixed(8)).toString();

    setHistoryDisplay(`${previousValue} ${operator} ${currentValue} =`);
    setCurrentValue(formattedResult);
    setPreviousValue(null);
    setOperator(null);
    setWaitingForNewValue(true);
  };

  const handleClear = () => {
    setCurrentValue('0');
    setPreviousValue(null);
    setOperator(null);
    setWaitingForNewValue(false);
    setHistoryDisplay('');
  };

  const handleSignChange = () => {
    const val = parseFloat(currentValue);
    if (val === 0) return;
    setCurrentValue(String(val * -1));
  };

  const handlePercent = () => {
    const val = parseFloat(currentValue);
    setCurrentValue(String(val / 100));
  };

  return (
    <div className="flex flex-col h-full bg-white p-6 rounded-3xl shadow-card border border-google-gray-200">
      <Display value={currentValue} history={historyDisplay} />
      
      <div className="grid grid-cols-4 gap-3 flex-1">
        {/* Row 1 */}
        <Button label="AC" type={ButtonType.FUNCTION} onClick={handleClear} />
        <Button label="+/-" type={ButtonType.FUNCTION} onClick={handleSignChange} />
        <Button label="%" type={ButtonType.FUNCTION} onClick={handlePercent} />
        <Button label="÷" type={ButtonType.OPERATOR} onClick={handleOperator} />

        {/* Row 2 */}
        <Button label="7" onClick={handleNumber} />
        <Button label="8" onClick={handleNumber} />
        <Button label="9" onClick={handleNumber} />
        <Button label="×" type={ButtonType.OPERATOR} onClick={handleOperator} />

        {/* Row 3 */}
        <Button label="4" onClick={handleNumber} />
        <Button label="5" onClick={handleNumber} />
        <Button label="6" onClick={handleNumber} />
        <Button label="-" type={ButtonType.OPERATOR} onClick={handleOperator} />

        {/* Row 4 */}
        <Button label="1" onClick={handleNumber} />
        <Button label="2" onClick={handleNumber} />
        <Button label="3" onClick={handleNumber} />
        <Button label="+" type={ButtonType.OPERATOR} onClick={handleOperator} />

        {/* Row 5 */}
        <Button label="0" doubleWidth onClick={handleNumber} className="pl-8 !justify-start" />
        <Button label="." onClick={handleDecimal} />
        <Button label="=" type={ButtonType.ACTION} onClick={handleEqual} />
      </div>
    </div>
  );
};
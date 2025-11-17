/**
 * 计算器键盘组件
 */

import React from 'react';
import { CalculatorButton } from './CalculatorButton';
import { useCalculatorStore } from '@/stores/calculatorStore';

export const CalculatorKeyboard: React.FC = () => {
  const {
    inputDigit,
    inputDecimal,
    inputOperation,
    performCalculation,
    clear,
    clearEntry,
    performTrigonometric,
    performScientific,
    toggleSign,
    percentage,
    square,
    squareRoot,
    reciprocal,
  } = useCalculatorStore();

  // 数字按钮
  const renderNumberButtons = () => {
    const digits = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];
    return digits.map((digit) => (
      <CalculatorButton
        key={digit}
        label={digit}
        onClick={() => inputDigit(digit)}
        variant="secondary"
      />
    ));
  };

  // 基本运算按钮
  const renderBasicOperationButtons = () => {
    const operations = [
      { label: '÷', action: () => inputOperation('÷') },
      { label: '×', action: () => inputOperation('×') },
      { label: '-', action: () => inputOperation('-') },
      { label: '+', action: () => inputOperation('+') },
      { label: '=', action: performCalculation },
    ];

    return operations.map((op) => (
      <CalculatorButton
        key={op.label}
        label={op.label}
        onClick={op.action}
        variant="primary"
      />
    ));
  };

  // 科学函数按钮
  const renderScientificButtons = () => {
    const scientificFunctions = [
      { label: 'sin', action: () => performTrigonometric('sin') },
      { label: 'cos', action: () => performTrigonometric('cos') },
      { label: 'tan', action: () => performTrigonometric('tan') },
      { label: 'ln', action: () => performScientific('ln') },
      { label: 'log', action: () => performScientific('log') },
      { label: '√', action: squareRoot },
      { label: 'x²', action: square },
      { label: '1/x', action: reciprocal },
    ];

    return scientificFunctions.map((func) => (
      <CalculatorButton
        key={func.label}
        label={func.label}
        onClick={func.action}
        variant="scientific"
      />
    ));
  };

  // 控制按钮
  const renderControlButtons = () => {
    const controls = [
      { label: 'C', action: clear, variant: 'danger' as const },
      { label: 'CE', action: clearEntry, variant: 'danger' as const },
      { label: '±', action: toggleSign, variant: 'secondary' as const },
      { label: '%', action: percentage, variant: 'secondary' as const },
    ];

    return controls.map((control) => (
      <CalculatorButton
        key={control.label}
        label={control.label}
        onClick={control.action}
        variant={control.variant}
      />
    ));
  };

  return (
    <div className="space-y-4">
      {/* 科学函数区域 */}
      <div className="grid grid-cols-4 gap-2">
        {renderScientificButtons()}
      </div>

      {/* 分隔线 */}
      <hr className="border-gray-300" />

      {/* 主键盘区域 */}
      <div className="grid grid-cols-4 gap-2">
        {/* 第一行：控制按钮 */}
        {renderControlButtons()}
        
        {/* 第二行：7,8,9,÷ */}
        <CalculatorButton label="7" onClick={() => inputDigit('7')} variant="secondary" />
        <CalculatorButton label="8" onClick={() => inputDigit('8')} variant="secondary" />
        <CalculatorButton label="9" onClick={() => inputDigit('9')} variant="secondary" />
        <CalculatorButton label="÷" onClick={() => inputOperation('÷')} variant="primary" />
        
        {/* 第三行：4,5,6,× */}
        <CalculatorButton label="4" onClick={() => inputDigit('4')} variant="secondary" />
        <CalculatorButton label="5" onClick={() => inputDigit('5')} variant="secondary" />
        <CalculatorButton label="6" onClick={() => inputDigit('6')} variant="secondary" />
        <CalculatorButton label="×" onClick={() => inputOperation('×')} variant="primary" />
        
        {/* 第四行：1,2,3,- */}
        <CalculatorButton label="1" onClick={() => inputDigit('1')} variant="secondary" />
        <CalculatorButton label="2" onClick={() => inputDigit('2')} variant="secondary" />
        <CalculatorButton label="3" onClick={() => inputDigit('3')} variant="secondary" />
        <CalculatorButton label="-" onClick={() => inputOperation('-')} variant="primary" />
        
        {/* 第五行：0,.,=,+ */}
        <CalculatorButton label="0" onClick={() => inputDigit('0')} variant="secondary" className="col-span-2" />
        <CalculatorButton label="." onClick={inputDecimal} variant="secondary" />
        <CalculatorButton label="+" onClick={() => inputOperation('+')} variant="primary" />
        
        {/* 第六行：= */}
        <CalculatorButton label="=" onClick={performCalculation} variant="primary" className="col-span-4" />
      </div>
    </div>
  );
};
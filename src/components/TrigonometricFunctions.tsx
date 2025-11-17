/**
 * 三角函数专项功能组件
 * 提供反三角函数和高级三角函数功能
 */

import React, { useState } from 'react';
import { CalculatorButton } from './CalculatorButton';
import { useCalculatorStore } from '@/stores/calculatorStore';

export const TrigonometricFunctions: React.FC = () => {
  const { performTrigonometric } = useCalculatorStore();
  const [showInverse, setShowInverse] = useState(false);

  // 基本三角函数
  const basicTrigFunctions = [
    { label: 'sin', action: () => performTrigonometric('sin') },
    { label: 'cos', action: () => performTrigonometric('cos') },
    { label: 'tan', action: () => performTrigonometric('tan') },
    { label: 'cot', action: () => performTrigonometric('cot') },
    { label: 'sec', action: () => performTrigonometric('sec') },
    { label: 'csc', action: () => performTrigonometric('csc') },
  ];

  // 反三角函数
  const inverseTrigFunctions = [
    { label: 'arcsin', action: () => performTrigonometric('arcsin') },
    { label: 'arccos', action: () => performTrigonometric('arccos') },
    { label: 'arctan', action: () => performTrigonometric('arctan') },
    { label: 'arccot', action: () => performTrigonometric('arccot') },
    { label: 'arcsec', action: () => performTrigonometric('arcsec') },
    { label: 'arccsc', action: () => performTrigonometric('arccsc') },
  ];

  // 双曲函数
  const hyperbolicFunctions = [
    { label: 'sinh', action: () => performTrigonometric('sinh') },
    { label: 'cosh', action: () => performTrigonometric('cosh') },
    { label: 'tanh', action: () => performTrigonometric('tanh') },
  ];

  const currentFunctions = showInverse ? inverseTrigFunctions : basicTrigFunctions;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">三角函数</h3>
        <div className="space-x-2">
          <button
            onClick={() => setShowInverse(!showInverse)}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              showInverse 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {showInverse ? '反函数' : '基本函数'}
          </button>
        </div>
      </div>

      {/* 主要三角函数 */}
      <div className="grid grid-cols-3 gap-2">
        {currentFunctions.map((func) => (
          <CalculatorButton
            key={func.label}
            label={func.label}
            onClick={func.action}
            variant="trigonometric"
          />
        ))}
      </div>

      {/* 双曲函数 */}
      {!showInverse && (
        <div>
          <h4 className="text-md font-medium mb-2">双曲函数</h4>
          <div className="grid grid-cols-3 gap-2">
            {hyperbolicFunctions.map((func) => (
              <CalculatorButton
                key={func.label}
                label={func.label}
                onClick={func.action}
                variant="scientific"
              />
            ))}
          </div>
        </div>
      )}

      {/* 三角函数说明 */}
      <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
        <p className="font-medium mb-1">使用说明：</p>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>输入角度值后点击三角函数按钮</li>
          <li>支持角度制、弧度制、梯度制切换</li>
          <li>反三角函数返回值为对应的角度</li>
          <li>双曲函数使用实数输入</li>
        </ul>
      </div>
    </div>
  );
};
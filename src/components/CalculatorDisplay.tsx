/**
 * 计算器显示屏组件
 */

import React from 'react';
import { useCalculatorStore } from '@/stores/calculatorStore';

export const CalculatorDisplay: React.FC = () => {
  const { display, angleMode } = useCalculatorStore();
  
  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg mb-4">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm text-gray-400">
          角度模式: {angleMode === 'deg' ? '度' : angleMode === 'rad' ? '弧度' : '梯度'}
        </div>
      </div>
      <div className="text-right text-3xl font-mono overflow-hidden">
        {display}
      </div>
    </div>
  );
};
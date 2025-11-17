/**
 * 计算历史组件
 */

import React, { useState } from 'react';
import { useCalculatorStore } from '@/stores/calculatorStore';

export const CalculatorHistory: React.FC = () => {
  const { history, clearHistory } = useCalculatorStore();
  const [isOpen, setIsOpen] = useState(false);

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">计算历史</h3>
        <div className="space-x-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            {isOpen ? '隐藏' : '显示'}
          </button>
          <button
            onClick={clearHistory}
            className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          >
            清除
          </button>
        </div>
      </div>
      
      {isOpen && (
        <div className="bg-gray-100 rounded-lg p-3 max-h-40 overflow-y-auto">
          {history.slice().reverse().map((entry, index) => (
            <div key={index} className="py-1 text-sm font-mono border-b border-gray-200 last:border-b-0">
              {entry}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
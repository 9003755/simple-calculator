/**
 * 角度模式切换组件
 */

import React from 'react';
import { useCalculatorStore } from '@/stores/calculatorStore';
import { AngleMode } from '@/lib/calculatorEngine';

export const AngleModeSelector: React.FC = () => {
  const { angleMode, setAngleMode } = useCalculatorStore();

  const modes: { value: AngleMode; label: string }[] = [
    { value: 'deg', label: '度 (°)' },
    { value: 'rad', label: '弧度 (rad)' },
    { value: 'grad', label: '梯度 (grad)' },
  ];

  return (
    <div className="flex space-x-2 mb-4">
      {modes.map((mode) => (
        <button
          key={mode.value}
          onClick={() => setAngleMode(mode.value)}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            angleMode === mode.value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
};
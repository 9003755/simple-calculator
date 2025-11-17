/**
 * 计算器主组件
 */

import React, { useState } from 'react';
import { CalculatorDisplay } from '@/components/CalculatorDisplay';
import { CalculatorKeyboard } from '@/components/CalculatorKeyboard';
import { AngleModeSelector } from '@/components/AngleModeSelector';
import { CalculatorHistory } from '@/components/CalculatorHistory';
import { TrigonometricFunctions } from '@/components/TrigonometricFunctions';
import { FunctionPlotter } from '@/components/FunctionPlotter';
import { ThemeToggle } from '@/components/ThemeToggle';
import { CalculatorSettings } from '@/components/CalculatorSettings';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

export const Calculator: React.FC = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showPlotter, setShowPlotter] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // 启用键盘快捷键
  useKeyboardShortcuts();

  return (
    <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          多功能计算器
        </h1>
        <ThemeToggle />
      </div>
      
      <div className="flex justify-center space-x-4 mb-4 flex-wrap gap-2">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            showAdvanced
              ? 'bg-purple-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          {showAdvanced ? '隐藏高级功能' : '显示高级功能'}
        </button>
        <button
          onClick={() => setShowPlotter(!showPlotter)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            showPlotter
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          {showPlotter ? '隐藏函数图像' : '显示函数图像'}
        </button>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            showSettings
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          {showSettings ? '隐藏设置' : '显示设置'}
        </button>
      </div>

      {/* 设置面板 */}
      {showSettings && (
        <div className="mb-6">
          <CalculatorSettings />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 主计算器 */}
        <div className="space-y-4">
          <CalculatorDisplay />
          <AngleModeSelector />
          <CalculatorHistory />
          <CalculatorKeyboard />
        </div>

        {/* 高级功能 */}
        {showAdvanced && (
          <div className="space-y-4">
            <TrigonometricFunctions />
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 dark:text-white">使用提示</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• 点击数字按钮输入数值</li>
                <li>• 选择角度模式（度/弧度/梯度）</li>
                <li>• 使用三角函数进行科学计算</li>
                <li>• 查看计算历史记录</li>
                <li>• 支持键盘输入操作</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* 函数图像绘制 */}
      {showPlotter && (
        <div className="mt-8">
          <FunctionPlotter />
        </div>
      )}
      
      <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        支持三角函数、科学计算和基本运算 • 精度达到15位有效数字
      </div>
    </div>
  );
};
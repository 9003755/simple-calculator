/**
 * 计算器设置组件
 */

import React, { useState } from 'react';
import { useCalculatorStore } from '@/stores/calculatorStore';
import { Settings, ChevronDown, ChevronUp } from 'lucide-react';

export const CalculatorSettings: React.FC = () => {
  const { precision, engine } = useCalculatorStore();
  const [isOpen, setIsOpen] = useState(false);
  const [localPrecision, setLocalPrecision] = useState(precision);

  const handlePrecisionChange = (newPrecision: number) => {
    setLocalPrecision(newPrecision);
    // 这里可以更新引擎的精度设置
    // engine.setPrecision(newPrecision); // 需要在引擎中添加此方法
  };

  const settings = [
    {
      id: 'precision',
      label: '计算精度',
      description: '设置计算结果的小数位数',
      value: `${localPrecision} 位`,
      action: (
        <div className="flex items-center space-x-2">
          <input
            type="range"
            min="5"
            max="20"
            value={localPrecision}
            onChange={(e) => handlePrecisionChange(parseInt(e.target.value))}
            className="w-20"
          />
          <span className="text-sm text-gray-600">{localPrecision}</span>
        </div>
      ),
    },
    {
      id: 'history',
      label: '历史记录',
      description: '保存最近的计算历史',
      value: '已启用',
      action: (
        <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
          清除历史
        </button>
      ),
    },
    {
      id: 'keyboard',
      label: '键盘快捷键',
      description: '启用键盘输入支持',
      value: '已启用',
      action: (
        <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
          查看快捷键
        </button>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Settings size={20} className="text-gray-600" />
          <div className="text-left">
            <h3 className="font-medium text-gray-900">计算器设置</h3>
            <p className="text-sm text-gray-500">自定义计算器的各项参数</p>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp size={20} className="text-gray-400" />
        ) : (
          <ChevronDown size={20} className="text-gray-400" />
        )}
      </button>

      {isOpen && (
        <div className="border-t border-gray-200 p-4 space-y-4">
          {settings.map((setting) => (
            <div key={setting.id} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="font-medium text-gray-900">{setting.label}</div>
                <div className="text-sm text-gray-500">{setting.description}</div>
                <div className="text-sm text-gray-600">{setting.value}</div>
              </div>
              <div className="ml-4">{setting.action}</div>
            </div>
          ))}

          <div className="pt-4 border-t border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">使用提示</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 计算精度越高，计算结果越精确</li>
              <li>• 建议日常使用设置为10-15位精度</li>
              <li>• 科学计算可设置为15-20位精度</li>
              <li>• 过高精度可能影响计算性能</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
/**
 * 主题切换组件
 */

import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { Sun, Moon, Monitor } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme, isDark } = useTheme();

  const themes = [
    { value: 'light', label: '浅色', icon: Sun },
    { value: 'dark', label: '深色', icon: Moon },
    { value: 'system', label: '系统', icon: Monitor },
  ];

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-gray-700">主题:</span>
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {themes.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setTheme(value as any)}
            className={`flex items-center space-x-1 px-3 py-1 rounded-md text-sm transition-colors ${
              theme === value
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            title={label}
          >
            <Icon size={16} />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
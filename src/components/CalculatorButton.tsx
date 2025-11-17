/**
 * 计算器按钮组件
 */

import React from 'react';

interface CalculatorButtonProps {
  onClick: () => void;
  label: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'scientific' | 'trigonometric';
  disabled?: boolean;
}

export const CalculatorButton: React.FC<CalculatorButtonProps> = ({
  onClick,
  label,
  className = '',
  variant = 'primary',
  disabled = false,
}) => {
  const baseClasses = 'h-12 rounded-lg font-semibold text-lg transition-all duration-150 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    scientific: 'bg-green-600 hover:bg-green-700 text-white',
    trigonometric: 'bg-purple-600 hover:bg-purple-700 text-white',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {label}
    </button>
  );
};
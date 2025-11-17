/**
 * 键盘快捷键Hook
 * 为计算器提供键盘输入支持
 */

import { useEffect } from 'react';
import { useCalculatorStore } from '@/stores/calculatorStore';

export const useKeyboardShortcuts = () => {
  const {
    inputDigit,
    inputDecimal,
    inputOperation,
    performCalculation,
    clear,
    performTrigonometric,
    performScientific,
    toggleSign,
    percentage,
    square,
    squareRoot,
    reciprocal,
  } = useCalculatorStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // 防止在输入框中触发
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      const key = event.key;
      const shiftKey = event.shiftKey;

      // 数字键
      if (key >= '0' && key <= '9') {
        inputDigit(key);
        return;
      }

      // 基本运算
      switch (key) {
        case '+':
        case '-':
          inputOperation(key === '+' ? '+' : '-');
          break;
        case '*':
          inputOperation('×');
          break;
        case '/':
          inputOperation('÷');
          break;
        case '^':
          inputOperation('^');
          break;
        case 'Enter':
        case '=':
          performCalculation();
          break;
        case '.':
        case ',':
          inputDecimal();
          break;
        case 'Escape':
        case 'c':
        case 'C':
          clear();
          break;
        case '%':
          percentage();
          break;
      }

      // Shift + 键组合
      if (shiftKey) {
        switch (key) {
          case 'S':
            performTrigonometric('sin');
            break;
          case 'C':
            performTrigonometric('cos');
            break;
          case 'T':
            performTrigonometric('tan');
            break;
          case 'L':
            performScientific('ln');
            break;
          case 'G':
            performScientific('log');
            break;
          case '2':
            square();
            break;
          case 'R':
            squareRoot();
            break;
          case 'I':
            reciprocal();
            break;
          case 'N':
            toggleSign();
            break;
        }
      }

      // 字母快捷键（不带shift）
      if (!shiftKey) {
        switch (key) {
          case 's':
            performScientific('sqrt');
            break;
          case 'l':
            performScientific('ln');
            break;
          case 'p':
            square();
            break;
          case 'r':
            reciprocal();
            break;
          case 'n':
            toggleSign();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    inputDigit,
    inputDecimal,
    inputOperation,
    performCalculation,
    clear,
    performTrigonometric,
    performScientific,
    toggleSign,
    percentage,
    square,
    squareRoot,
    reciprocal,
  ]);
};

// 键盘快捷键帮助信息
export const getKeyboardShortcuts = () => [
  { keys: '0-9', description: '输入数字' },
  { keys: '+, -, *, /, ^', description: '基本运算' },
  { keys: 'Enter, =', description: '计算结果' },
  { keys: '. ,', description: '小数点' },
  { keys: 'Esc, C', description: '清除' },
  { keys: '%', description: '百分比' },
  { keys: 'Shift+S', description: '正弦函数' },
  { keys: 'Shift+C', description: '余弦函数' },
  { keys: 'Shift+T', description: '正切函数' },
  { keys: 'Shift+L', description: '自然对数' },
  { keys: 'Shift+G', description: '常用对数' },
  { keys: 'Shift+2', description: '平方' },
  { keys: 'Shift+R', description: '平方根' },
  { keys: 'Shift+I', description: '倒数' },
  { keys: 'Shift+N', description: '正负号切换' },
  { keys: 's', description: '平方根' },
  { keys: 'l', description: '自然对数' },
  { keys: 'p', description: '平方' },
  { keys: 'r', description: '倒数' },
  { keys: 'n', description: '正负号切换' },
];
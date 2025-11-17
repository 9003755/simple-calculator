/**
 * 计算器状态管理
 * 使用Zustand管理计算器的状态
 */

import { create } from 'zustand';
import { CalculatorEngine, AngleMode } from '@/lib/calculatorEngine';

export interface CalculatorState {
  // 显示相关
  display: string;
  previousValue: number | null;
  currentValue: number | null;
  
  // 操作相关
  operation: string | null;
  waitingForOperand: boolean;
  
  // 计算器配置
  angleMode: AngleMode;
  precision: number;
  
  // 历史记录
  history: string[];
  
  // 计算器引擎
  engine: CalculatorEngine;
}

export interface CalculatorActions {
  // 数字输入
  inputDigit: (digit: string) => void;
  inputDecimal: () => void;
  
  // 操作符
  inputOperation: (nextOperation: string) => void;
  performCalculation: () => void;
  clear: () => void;
  clearEntry: () => void;
  
  // 三角函数
  performTrigonometric: (func: string) => void;
  
  // 科学函数
  performScientific: (func: string) => void;
  
  // 配置
  setAngleMode: (mode: AngleMode) => void;
  
  // 历史
  addToHistory: (entry: string) => void;
  clearHistory: () => void;
  
  // 特殊功能
  toggleSign: () => void;
  percentage: () => void;
  square: () => void;
  squareRoot: () => void;
  reciprocal: () => void;
}

export type CalculatorStore = CalculatorState & CalculatorActions;

export const useCalculatorStore = create<CalculatorStore>((set, get) => ({
  // 初始状态
  display: '0',
  previousValue: null,
  currentValue: null,
  operation: null,
  waitingForOperand: false,
  angleMode: 'deg',
  precision: 15,
  history: [],
  engine: new CalculatorEngine(),

  // 数字输入
  inputDigit: (digit: string) => {
    const { display, waitingForOperand } = get();
    
    if (waitingForOperand) {
      set({
        display: digit,
        waitingForOperand: false,
      });
    } else {
      set({
        display: display === '0' ? digit : display + digit,
      });
    }
  },

  inputDecimal: () => {
    const { display, waitingForOperand } = get();
    
    if (waitingForOperand) {
      set({
        display: '0.',
        waitingForOperand: false,
      });
    } else if (display.indexOf('.') === -1) {
      set({
        display: display + '.',
      });
    }
  },

  // 操作符
  inputOperation: (nextOperation: string) => {
    const { display, previousValue, currentValue, operation, engine } = get();
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      set({
        previousValue: inputValue,
        operation: nextOperation,
        waitingForOperand: true,
      });
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = performCalculation(currentValue, inputValue, operation, engine);
      
      set({
        display: String(newValue),
        previousValue: newValue,
        operation: nextOperation,
        waitingForOperand: true,
      });
    }
  },

  performCalculation: () => {
    const { display, previousValue, operation, engine } = get();
    
    if (previousValue !== null && operation) {
      const inputValue = parseFloat(display);
      const currentValue = previousValue;
      const newValue = performCalculation(currentValue, inputValue, operation, engine);
      
      set({
        display: String(newValue),
        previousValue: null,
        currentValue: newValue,
        operation: null,
        waitingForOperand: true,
      });
      
      // 添加到历史记录
      const historyEntry = `${currentValue} ${operation} ${inputValue} = ${newValue}`;
      get().addToHistory(historyEntry);
    }
  },

  clear: () => {
    set({
      display: '0',
      previousValue: null,
      currentValue: null,
      operation: null,
      waitingForOperand: false,
    });
  },

  clearEntry: () => {
    set({
      display: '0',
      waitingForOperand: true,
    });
  },

  // 三角函数
  performTrigonometric: (func: string) => {
    const { display, engine } = get();
    const value = parseFloat(display);
    
    try {
      let result: number;
      
      switch (func) {
        case 'sin':
          result = engine.sin(value);
          break;
        case 'cos':
          result = engine.cos(value);
          break;
        case 'tan':
          result = engine.tan(value);
          break;
        case 'cot':
          result = engine.cot(value);
          break;
        case 'sec':
          result = engine.sec(value);
          break;
        case 'csc':
          result = engine.csc(value);
          break;
        case 'arcsin':
          result = engine.arcsin(value);
          break;
        case 'arccos':
          result = engine.arccos(value);
          break;
        case 'arctan':
          result = engine.arctan(value);
          break;
        case 'arccot':
          result = engine.divide(1, engine.arctan(value));
          break;
        case 'arcsec':
          result = engine.arccos(engine.divide(1, value));
          break;
        case 'arccsc':
          result = engine.arcsin(engine.divide(1, value));
          break;
        case 'sinh':
          result = engine.sinh(value);
          break;
        case 'cosh':
          result = engine.cosh(value);
          break;
        case 'tanh':
          result = engine.tanh(value);
          break;
        default:
          throw new Error(`未知的三角函数: ${func}`);
      }
      
      set({
        display: String(result),
        waitingForOperand: true,
      });
      
      // 添加到历史记录
      const historyEntry = `${func}(${value}) = ${result}`;
      get().addToHistory(historyEntry);
    } catch (error) {
      set({
        display: '错误',
        waitingForOperand: true,
      });
    }
  },

  // 科学函数
  performScientific: (func: string) => {
    const { display, engine } = get();
    const value = parseFloat(display);
    
    try {
      let result: number;
      
      switch (func) {
        case 'ln':
          result = engine.ln(value);
          break;
        case 'log':
          result = engine.log10(value);
          break;
        case 'sqrt':
          result = engine.sqrt(value);
          break;
        case 'x²':
          result = engine.power(value, 2);
          break;
        case 'x³':
          result = engine.power(value, 3);
          break;
        case '1/x':
          result = engine.divide(1, value);
          break;
        case 'e^x':
          result = engine.exp(value);
          break;
        case '10^x':
          result = engine.exp10(value);
          break;
        case 'n!':
          result = engine.factorial(value);
          break;
        default:
          throw new Error(`未知的科学函数: ${func}`);
      }
      
      set({
        display: String(result),
        waitingForOperand: true,
      });
      
      // 添加到历史记录
      const historyEntry = `${func}(${value}) = ${result}`;
      get().addToHistory(historyEntry);
    } catch (error) {
      set({
        display: '错误',
        waitingForOperand: true,
      });
    }
  },

  // 配置
  setAngleMode: (mode: AngleMode) => {
    const { engine } = get();
    engine.setAngleMode(mode);
    set({ angleMode: mode });
  },

  // 历史
  addToHistory: (entry: string) => {
    const { history } = get();
    const newHistory = [...history, entry];
    // 限制历史记录数量
    if (newHistory.length > 100) {
      newHistory.shift();
    }
    set({ history: newHistory });
  },

  clearHistory: () => {
    set({ history: [] });
  },

  // 特殊功能
  toggleSign: () => {
    const { display } = get();
    const value = parseFloat(display);
    set({
      display: String(-value),
    });
  },

  percentage: () => {
    const { display } = get();
    const value = parseFloat(display);
    set({
      display: String(value / 100),
      waitingForOperand: true,
    });
  },

  square: () => {
    const { display, engine } = get();
    const value = parseFloat(display);
    try {
      const result = engine.power(value, 2);
      set({
        display: String(result),
        waitingForOperand: true,
      });
      
      const historyEntry = `${value}² = ${result}`;
      get().addToHistory(historyEntry);
    } catch (error) {
      set({
        display: '错误',
        waitingForOperand: true,
      });
    }
  },

  squareRoot: () => {
    const { display, engine } = get();
    const value = parseFloat(display);
    try {
      const result = engine.sqrt(value);
      set({
        display: String(result),
        waitingForOperand: true,
      });
      
      const historyEntry = `√${value} = ${result}`;
      get().addToHistory(historyEntry);
    } catch (error) {
      set({
        display: '错误',
        waitingForOperand: true,
      });
    }
  },

  reciprocal: () => {
    const { display, engine } = get();
    const value = parseFloat(display);
    try {
      const result = engine.divide(1, value);
      set({
        display: String(result),
        waitingForOperand: true,
      });
      
      const historyEntry = `1/${value} = ${result}`;
      get().addToHistory(historyEntry);
    } catch (error) {
      set({
        display: '错误',
        waitingForOperand: true,
      });
    }
  },
}));

/**
 * 执行计算
 */
function performCalculation(firstValue: number, secondValue: number, operation: string, engine: CalculatorEngine): number {
  switch (operation) {
    case '+':
      return engine.add(firstValue, secondValue);
    case '-':
      return engine.subtract(firstValue, secondValue);
    case '×':
      return engine.multiply(firstValue, secondValue);
    case '÷':
      return engine.divide(firstValue, secondValue);
    case '^':
      return engine.power(firstValue, secondValue);
    default:
      return secondValue;
  }
}
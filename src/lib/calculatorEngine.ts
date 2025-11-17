/**
 * 多功能计算器引擎
 * 支持基本运算、科学计算、三角函数等
 */

export type AngleMode = 'deg' | 'rad' | 'grad';

export interface CalculatorConfig {
  angleMode: AngleMode;
  precision: number;
}

export class CalculatorEngine {
  private config: CalculatorConfig;
  
  constructor(config: CalculatorConfig = { angleMode: 'deg', precision: 15 }) {
    this.config = config;
  }

  /**
   * 设置角度模式
   */
  setAngleMode(mode: AngleMode): void {
    this.config.angleMode = mode;
  }

  /**
   * 获取角度模式
   */
  getAngleMode(): AngleMode {
    return this.config.angleMode;
  }

  /**
   * 角度转换
   */
  private toRadians(angle: number): number {
    switch (this.config.angleMode) {
      case 'deg':
        return angle * Math.PI / 180;
      case 'grad':
        return angle * Math.PI / 200;
      case 'rad':
      default:
        return angle;
    }
  }

  private fromRadians(radians: number): number {
    switch (this.config.angleMode) {
      case 'deg':
        return radians * 180 / Math.PI;
      case 'grad':
        return radians * 200 / Math.PI;
      case 'rad':
      default:
        return radians;
    }
  }

  /**
   * 基本数学运算
   */
  add(a: number, b: number): number {
    return this.round(a + b);
  }

  subtract(a: number, b: number): number {
    return this.round(a - b);
  }

  multiply(a: number, b: number): number {
    return this.round(a * b);
  }

  divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error('除数不能为零');
    }
    return this.round(a / b);
  }

  power(base: number, exponent: number): number {
    return this.round(Math.pow(base, exponent));
  }

  sqrt(value: number): number {
    if (value < 0) {
      throw new Error('负数不能开平方');
    }
    return this.round(Math.sqrt(value));
  }

  /**
   * 三角函数计算
   */
  sin(angle: number): number {
    const radians = this.toRadians(angle);
    return this.round(Math.sin(radians));
  }

  cos(angle: number): number {
    const radians = this.toRadians(angle);
    return this.round(Math.cos(radians));
  }

  tan(angle: number): number {
    const radians = this.toRadians(angle);
    const cosValue = Math.cos(radians);
    if (Math.abs(cosValue) < 1e-15) {
      throw new Error('tan函数在此角度无定义');
    }
    return this.round(Math.tan(radians));
  }

  cot(angle: number): number {
    const tanValue = this.tan(angle);
    if (Math.abs(tanValue) < 1e-15) {
      throw new Error('cot函数在此角度无定义');
    }
    return this.round(1 / tanValue);
  }

  sec(angle: number): number {
    const cosValue = this.cos(angle);
    if (Math.abs(cosValue) < 1e-15) {
      throw new Error('sec函数在此角度无定义');
    }
    return this.round(1 / cosValue);
  }

  csc(angle: number): number {
    const sinValue = this.sin(angle);
    if (Math.abs(sinValue) < 1e-15) {
      throw new Error('csc函数在此角度无定义');
    }
    return this.round(1 / sinValue);
  }

  /**
   * 反三角函数
   */
  arcsin(value: number): number {
    if (value < -1 || value > 1) {
      throw new Error('arcsin函数的输入必须在[-1, 1]范围内');
    }
    const result = Math.asin(value);
    return this.round(this.fromRadians(result));
  }

  arccos(value: number): number {
    if (value < -1 || value > 1) {
      throw new Error('arccos函数的输入必须在[-1, 1]范围内');
    }
    const result = Math.acos(value);
    return this.round(this.fromRadians(result));
  }

  arctan(value: number): number {
    const result = Math.atan(value);
    return this.round(this.fromRadians(result));
  }

  arctan2(y: number, x: number): number {
    const result = Math.atan2(y, x);
    return this.round(this.fromRadians(result));
  }

  /**
   * 双曲函数
   */
  sinh(value: number): number {
    return this.round(Math.sinh(value));
  }

  cosh(value: number): number {
    return this.round(Math.cosh(value));
  }

  tanh(value: number): number {
    return this.round(Math.tanh(value));
  }

  /**
   * 对数和指数函数
   */
  ln(value: number): number {
    if (value <= 0) {
      throw new Error('ln函数的输入必须大于0');
    }
    return this.round(Math.log(value));
  }

  log10(value: number): number {
    if (value <= 0) {
      throw new Error('log10函数的输入必须大于0');
    }
    return this.round(Math.log10(value));
  }

  log(base: number, value: number): number {
    if (base <= 0 || base === 1) {
      throw new Error('对数的底数必须大于0且不等于1');
    }
    if (value <= 0) {
      throw new Error('对数的真数必须大于0');
    }
    return this.round(Math.log(value) / Math.log(base));
  }

  exp(value: number): number {
    return this.round(Math.exp(value));
  }

  exp10(value: number): number {
    return this.round(Math.pow(10, value));
  }

  /**
   * 其他数学函数
   */
  abs(value: number): number {
    return Math.abs(value);
  }

  floor(value: number): number {
    return Math.floor(value);
  }

  ceil(value: number): number {
    return Math.ceil(value);
  }

  round(value: number): number {
    const factor = Math.pow(10, this.config.precision);
    return Math.round(value * factor) / factor;
  }

  factorial(n: number): number {
    if (n < 0 || !Number.isInteger(n)) {
      throw new Error('阶乘函数的输入必须是非负整数');
    }
    if (n > 170) {
      throw new Error('阶乘函数的输入不能大于170');
    }
    if (n === 0 || n === 1) {
      return 1;
    }
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return this.round(result);
  }

  /**
   * 常数
   */
  get PI(): number {
    return Math.PI;
  }

  get E(): number {
    return Math.E;
  }

  /**
   * 表达式计算（简化版）
   */
  evaluateExpression(expression: string): number {
    try {
      // 这里可以实现更复杂的表达式解析
      // 目前使用简单的eval实现（生产环境需要更安全的解析器）
      const sanitized = expression.replace(/[^0-9+\-*/().^\s]/g, '');
      const result = Function('"use strict"; return (' + sanitized + ')')();
      return this.round(result);
    } catch (error) {
      throw new Error('表达式计算错误: ' + error);
    }
  }

  /**
   * 获取函数值（用于图像绘制）
   */
  evaluateFunction(func: string, x: number): number {
    try {
      // 将x代入函数表达式
      const expression = func.replace(/x/g, x.toString());
      return this.evaluateExpression(expression);
    } catch (error) {
      throw new Error('函数计算错误: ' + error);
    }
  }
}

// 创建全局实例
export const calculator = new CalculatorEngine();
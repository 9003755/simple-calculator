/**
 * 函数图像绘制组件
 * 使用Canvas绘制函数图像
 */

import React, { useRef, useEffect, useState } from 'react';
import { useCalculatorStore } from '@/stores/calculatorStore';

interface FunctionPlotterProps {
  width?: number;
  height?: number;
}

export const FunctionPlotter: React.FC<FunctionPlotterProps> = ({
  width = 600,
  height = 400,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { engine } = useCalculatorStore();
  const [functionExpr, setFunctionExpr] = useState('sin(x)');
  const [xMin, setXMin] = useState('-10');
  const [xMax, setXMax] = useState('10');
  const [yMin, setYMin] = useState('-5');
  const [yMax, setYMax] = useState('5');
  const [isPlotting, setIsPlotting] = useState(false);

  // 绘制坐标轴
  const drawAxes = (ctx: CanvasRenderingContext2D, xScale: number, yScale: number, centerX: number, centerY: number) => {
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;

    // X轴
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();

    // Y轴
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();

    // 刻度
    ctx.font = '12px Arial';
    ctx.fillStyle = '#666';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // X轴刻度
    const xStep = Math.pow(10, Math.floor(Math.log10(width / xScale / 10))) * 10;
    for (let x = Math.ceil(-centerX / xScale / xStep) * xStep; x <= (width - centerX) / xScale; x += xStep) {
      if (x === 0) continue;
      const screenX = centerX + x * xScale;
      ctx.beginPath();
      ctx.moveTo(screenX, centerY - 3);
      ctx.lineTo(screenX, centerY + 3);
      ctx.stroke();
      ctx.fillText(x.toString(), screenX, centerY + 15);
    }

    // Y轴刻度
    const yStep = Math.pow(10, Math.floor(Math.log10(height / yScale / 10))) * 10;
    for (let y = Math.ceil(-centerY / yScale / yStep) * yStep; y <= (height - centerY) / yScale; y += yStep) {
      if (y === 0) continue;
      const screenY = centerY - y * yScale;
      ctx.beginPath();
      ctx.moveTo(centerX - 3, screenY);
      ctx.lineTo(centerX + 3, screenY);
      ctx.stroke();
      ctx.fillText(y.toString(), centerX - 15, screenY);
    }
  };

  // 绘制函数
  const plotFunction = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsPlotting(true);

    try {
      const minX = parseFloat(xMin);
      const maxX = parseFloat(xMax);
      const minY = parseFloat(yMin);
      const maxY = parseFloat(yMax);

      if (isNaN(minX) || isNaN(maxX) || isNaN(minY) || isNaN(maxY)) {
        alert('请输入有效的数值范围');
        setIsPlotting(false);
        return;
      }

      // 清空画布
      ctx.clearRect(0, 0, width, height);

      // 计算比例
      const xScale = width / (maxX - minX);
      const yScale = height / (maxY - minY);
      const centerX = -minX * xScale;
      const centerY = maxY * yScale;

      // 绘制坐标轴
      drawAxes(ctx, xScale, yScale, centerX, centerY);

      // 绘制函数
      ctx.strokeStyle = '#2563eb';
      ctx.lineWidth = 2;
      ctx.beginPath();

      let firstPoint = true;
      const step = (maxX - minX) / width;

      for (let i = 0; i <= width; i++) {
        const x = minX + i * step;
        try {
          const y = engine.evaluateFunction(functionExpr, x);
          
          if (isNaN(y) || !isFinite(y)) {
            firstPoint = true;
            continue;
          }

          const screenX = i;
          const screenY = centerY - y * yScale;

          if (screenY < -height || screenY > 2 * height) {
            firstPoint = true;
            continue;
          }

          if (firstPoint) {
            ctx.moveTo(screenX, screenY);
            firstPoint = false;
          } else {
            ctx.lineTo(screenX, screenY);
          }
        } catch (error) {
          firstPoint = true;
        }
      }

      ctx.stroke();
    } catch (error) {
      alert('函数表达式错误或计算错误: ' + error);
    } finally {
      setIsPlotting(false);
    }
  };

  useEffect(() => {
    plotFunction();
  }, []);

  const predefinedFunctions = [
    'sin(x)',
    'cos(x)',
    'tan(x)',
    'x^2',
    'x^3',
    'sqrt(x)',
    'ln(x)',
    'exp(x)',
    '1/x',
    'abs(x)',
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">函数图像绘制</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">函数表达式:</label>
          <input
            type="text"
            value={functionExpr}
            onChange={(e) => setFunctionExpr(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="例如: sin(x), x^2, ln(x)"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">快速选择:</label>
          <select
            value={functionExpr}
            onChange={(e) => setFunctionExpr(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {predefinedFunctions.map((func) => (
              <option key={func} value={func}>
                {func}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">X最小值:</label>
          <input
            type="number"
            value={xMin}
            onChange={(e) => setXMin(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">X最大值:</label>
          <input
            type="number"
            value={xMax}
            onChange={(e) => setXMax(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Y最小值:</label>
          <input
            type="number"
            value={yMin}
            onChange={(e) => setYMin(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Y最大值:</label>
          <input
            type="number"
            value={yMax}
            onChange={(e) => setYMax(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={plotFunction}
          disabled={isPlotting}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPlotting ? '绘制中...' : '绘制图像'}
        </button>
        <button
          onClick={() => {
            setFunctionExpr('sin(x)');
            setXMin('-10');
            setXMax('10');
            setYMin('-5');
            setYMax('5');
          }}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          重置为sin(x)
        </button>
      </div>

      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="block"
        />
      </div>

      <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
        <p className="font-medium mb-1">使用说明:</p>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>支持的函数: sin, cos, tan, ln, sqrt, exp, abs 等</li>
          <li>使用 ^ 表示幂运算，例如 x^2, x^3</li>
          <li>可以组合多个函数，例如 sin(x) + cos(x)</li>
          <li>调整坐标范围以获得最佳显示效果</li>
        </ul>
      </div>
    </div>
  );
};
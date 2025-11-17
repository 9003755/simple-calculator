import { useState } from 'react';

interface SimpleCalculatorProps {
  onAuthorClick?: () => void;
}

type CalcMode = 'basic' | 'triangle' | 'bearing' | 'speed';
type SpeedUnit = 'kmh' | 'kmm' | 'ms' | 'mmin';
type TriangleAngle = 'A' | 'B' | 'C';

export default function SimpleCalculator({ onAuthorClick }: SimpleCalculatorProps) {
  // 基础计算器状态
  const [mode, setMode] = useState<CalcMode>('basic');
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  // 三角形计算状态
  const [angleA, setAngleA] = useState('');
  const [angleB, setAngleB] = useState('');
  const [knownSide, setKnownSide] = useState('');
  const [knownSideAngle, setKnownSideAngle] = useState<TriangleAngle>('C');
  const [triangleResult, setTriangleResult] = useState<string | null>(null);

  // 两点之间航向角计算状态
  const [lat1, setLat1] = useState('');
  const [lon1, setLon1] = useState('');
  const [lat2, setLat2] = useState('');
  const [lon2, setLon2] = useState('');
  const [coordFormat, setCoordFormat] = useState<'deg' | 'dms'>('deg');
  const [bearingResult, setBearingResult] = useState<string | null>(null);

  // 速度换算状态
  const [speedInput, setSpeedInput] = useState('');
  const [speedInputUnit, setSpeedInputUnit] = useState<SpeedUnit>('kmh');
  const [speedOutputUnit, setSpeedOutputUnit] = useState<SpeedUnit>('ms');
  const [speedResult, setSpeedResult] = useState<string | null>(null);

  // 基础计算器函数
  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);
    
    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);
      
      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }
    
    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);
    
    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const deleteLast = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const calculateSquare = () => {
    const value = parseFloat(display);
    setDisplay(String(value * value));
  };

  const calculateSquareRoot = () => {
    const value = parseFloat(display);
    if (value >= 0) {
      setDisplay(String(Math.sqrt(value)));
    } else {
      setDisplay('Error');
    }
  };

  // 三角形计算函数
  const calculateTriangle = () => {
    const a = parseFloat(angleA);
    const b = parseFloat(angleB);
    const side = parseFloat(knownSide);
    
    if (isNaN(a) || isNaN(b) || isNaN(side) || a <= 0 || b <= 0 || side <= 0) {
      setTriangleResult('请输入有效的角度和边长');
      return;
    }
    
    if (a + b >= 180) {
      setTriangleResult('两个角的和必须小于180度');
      return;
    }
    
    const c = 180 - a - b;
    const aRad = (a * Math.PI) / 180;
    const bRad = (b * Math.PI) / 180;
    const cRad = (c * Math.PI) / 180;
    
    let sideA, sideB, sideC;
    
    // 根据已知边对应的角来计算
    switch (knownSideAngle) {
      case 'A':
        sideA = side;
        sideB = (sideA * Math.sin(bRad)) / Math.sin(aRad);
        sideC = (sideA * Math.sin(cRad)) / Math.sin(aRad);
        break;
      case 'B':
        sideB = side;
        sideA = (sideB * Math.sin(aRad)) / Math.sin(bRad);
        sideC = (sideB * Math.sin(cRad)) / Math.sin(bRad);
        break;
      case 'C':
        sideC = side;
        sideA = (sideC * Math.sin(aRad)) / Math.sin(cRad);
        sideB = (sideC * Math.sin(bRad)) / Math.sin(cRad);
        break;
    }
    
    setTriangleResult(`
角C: ${c.toFixed(2)}°
边A: ${sideA.toFixed(2)}
边B: ${sideB.toFixed(2)}
边C: ${sideC.toFixed(2)}
    `.trim());
  };

  // 两点之间航向角计算函数
  const parseCoordinate = (value: string, format: 'deg' | 'dms'): number => {
    if (format === 'deg') {
      return parseFloat(value);
    } else {
      // 度分秒格式转换
      const parts = value.split(/[°'"\s]+/);
      if (parts.length >= 3) {
        const degrees = parseFloat(parts[0]) || 0;
        const minutes = parseFloat(parts[1]) || 0;
        const seconds = parseFloat(parts[2]) || 0;
        return degrees + minutes / 60 + seconds / 3600;
      }
      return parseFloat(value);
    }
  };

  const calculateBearing = () => {
    const lat1Deg = parseCoordinate(lat1, coordFormat);
    const lon1Deg = parseCoordinate(lon1, coordFormat);
    const lat2Deg = parseCoordinate(lat2, coordFormat);
    const lon2Deg = parseCoordinate(lon2, coordFormat);
    
    if (isNaN(lat1Deg) || isNaN(lon1Deg) || isNaN(lat2Deg) || isNaN(lon2Deg)) {
      setBearingResult('请输入有效的坐标');
      return;
    }
    
    // 转换为弧度
    const lat1Rad = (lat1Deg * Math.PI) / 180;
    const lon1Rad = (lon1Deg * Math.PI) / 180;
    const lat2Rad = (lat2Deg * Math.PI) / 180;
    const lon2Rad = (lon2Deg * Math.PI) / 180;
    
    // Haversine公式计算距离
    const R = 6371; // 地球半径（公里）
    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1Rad) * Math.cos(lat2Rad) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    
    // 计算航向角
    const y = Math.sin(lon2Rad - lon1Rad) * Math.cos(lat2Rad);
    const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) -
              Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(lon2Rad - lon1Rad);
    const bearing1 = (Math.atan2(y, x) * 180) / Math.PI;
    const bearing2 = (Math.atan2(-y, -x) * 180) / Math.PI;
    
    // 标准化角度到0-360度
    const normalizeBearing = (bearing: number): number => {
      return ((bearing % 360) + 360) % 360;
    };
    
    setBearingResult(`
距离: ${distance.toFixed(2)} 公里
A→B航向: ${normalizeBearing(bearing1).toFixed(2)}°
B→A航向: ${normalizeBearing(bearing2).toFixed(2)}°
    `.trim());
  };

  // 速度换算函数
  const convertSpeed = () => {
    const inputValue = parseFloat(speedInput);
    if (isNaN(inputValue)) {
      setSpeedResult('请输入有效的速度值');
      return;
    }
    
    // 转换为米/秒（标准单位）
    let metersPerSecond: number;
    switch (speedInputUnit) {
      case 'kmh':
        metersPerSecond = inputValue * 1000 / 3600;
        break;
      case 'kmm':
        metersPerSecond = inputValue * 1000 / 60;
        break;
      case 'ms':
        metersPerSecond = inputValue;
        break;
      case 'mmin':
        metersPerSecond = inputValue / 60;
        break;
    }
    
    // 从米/秒转换为目标单位
    let result: number;
    switch (speedOutputUnit) {
      case 'kmh':
        result = metersPerSecond * 3600 / 1000;
        break;
      case 'kmm':
        result = metersPerSecond * 60 / 1000;
        break;
      case 'ms':
        result = metersPerSecond;
        break;
      case 'mmin':
        result = metersPerSecond * 60;
        break;
    }
    
    setSpeedResult(`${result.toFixed(6)} ${getSpeedUnitName(speedOutputUnit)}`);
  };

  const getSpeedUnitName = (unit: SpeedUnit): string => {
    const names = {
      'kmh': '公里/小时',
      'kmm': '公里/分钟',
      'ms': '米/秒',
      'mmin': '米/分钟'
    };
    return names[unit];
  };

  // 渲染基础计算器
  const renderBasicCalculator = () => (
    <div className="space-y-4">
      <div className="bg-gray-900 text-white p-4 rounded-lg text-right text-2xl font-mono">
        {display}
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        <button onClick={clear} className="col-span-2 bg-red-500 text-white p-4 rounded-lg hover:bg-red-600">
          清除
        </button>
        <button onClick={deleteLast} className="bg-orange-500 text-white p-4 rounded-lg hover:bg-orange-600">
          删除
        </button>
        <button onClick={() => inputOperation('÷')} className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600">
          ÷
        </button>
        
        <button onClick={() => inputNumber('7')} className="bg-gray-700 text-white p-4 rounded-lg hover:bg-gray-600">
          7
        </button>
        <button onClick={() => inputNumber('8')} className="bg-gray-700 text-white p-4 rounded-lg hover:bg-gray-600">
          8
        </button>
        <button onClick={() => inputNumber('9')} className="bg-gray-700 text-white p-4 rounded-lg hover:bg-gray-600">
          9
        </button>
        <button onClick={() => inputOperation('×')} className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600">
          ×
        </button>
        
        <button onClick={() => inputNumber('4')} className="bg-gray-700 text-white p-4 rounded-lg hover:bg-gray-600">
          4
        </button>
        <button onClick={() => inputNumber('5')} className="bg-gray-700 text-white p-4 rounded-lg hover:bg-gray-600">
          5
        </button>
        <button onClick={() => inputNumber('6')} className="bg-gray-700 text-white p-4 rounded-lg hover:bg-gray-600">
          6
        </button>
        <button onClick={() => inputOperation('-')} className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600">
          -
        </button>
        
        <button onClick={() => inputNumber('1')} className="bg-gray-700 text-white p-4 rounded-lg hover:bg-gray-600">
          1
        </button>
        <button onClick={() => inputNumber('2')} className="bg-gray-700 text-white p-4 rounded-lg hover:bg-gray-600">
          2
        </button>
        <button onClick={() => inputNumber('3')} className="bg-gray-700 text-white p-4 rounded-lg hover:bg-gray-600">
          3
        </button>
        <button onClick={() => inputOperation('+')} className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600">
          +
        </button>
        
        <button onClick={() => inputNumber('0')} className="col-span-2 bg-gray-700 text-white p-4 rounded-lg hover:bg-gray-600">
          0
        </button>
        <button onClick={() => inputNumber('.')} className="bg-gray-700 text-white p-4 rounded-lg hover:bg-gray-600">
          .
        </button>
        <button onClick={performCalculation} className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-600">
          =
        </button>
        
        <button onClick={calculateSquare} className="bg-purple-500 text-white p-4 rounded-lg hover:bg-purple-600">
          x²
        </button>
        <button onClick={calculateSquareRoot} className="bg-purple-500 text-white p-4 rounded-lg hover:bg-purple-600">
          √x
        </button>
      </div>
    </div>
  );

  // 渲染三角形计算器
  const renderTriangleCalculator = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">角A (度)</label>
          <input
            type="number"
            value={angleA}
            onChange={(e) => setAngleA(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="输入角度"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">角B (度)</label>
          <input
            type="number"
            value={angleB}
            onChange={(e) => setAngleB(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="输入角度"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">已知边长</label>
          <input
            type="number"
            value={knownSide}
            onChange={(e) => setKnownSide(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="输入边长"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">对应角</label>
          <select
            value={knownSideAngle}
            onChange={(e) => setKnownSideAngle(e.target.value as TriangleAngle)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="A">角A</option>
            <option value="B">角B</option>
            <option value="C">角C</option>
          </select>
        </div>
      </div>
      
      <button
        onClick={calculateTriangle}
        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
      >
        计算三角形
      </button>
      
      {triangleResult && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <h4 className="font-medium mb-2">计算结果：</h4>
          <pre className="whitespace-pre-wrap text-sm">{triangleResult}</pre>
        </div>
      )}
    </div>
  );

  // 渲染两点之间航向角计算器
  const renderBearingCalculator = () => (
    <div className="space-y-4">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">坐标格式</label>
        <select
          value={coordFormat}
          onChange={(e) => setCoordFormat(e.target.value as 'deg' | 'dms')}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="deg">度 (Decimal)</option>
          <option value="dms">度分秒 (DMS)</option>
        </select>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium mb-2">点A</h4>
          <input
            type="text"
            value={lat1}
            onChange={(e) => setLat1(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
            placeholder={coordFormat === 'deg' ? '纬度 (如: 39.9042)' : '纬度 (如: 39°54′15″)'}
          />
          <input
            type="text"
            value={lon1}
            onChange={(e) => setLon1(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={coordFormat === 'deg' ? '经度 (如: 116.4074)' : '经度 (如: 116°24′26″)'}
          />
        </div>
        <div>
          <h4 className="font-medium mb-2">点B</h4>
          <input
            type="text"
            value={lat2}
            onChange={(e) => setLat2(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-2"
            placeholder={coordFormat === 'deg' ? '纬度 (如: 31.2304)' : '纬度 (如: 31°13′49″)'}
          />
          <input
            type="text"
            value={lon2}
            onChange={(e) => setLon2(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={coordFormat === 'deg' ? '经度 (如: 121.4737)' : '经度 (如: 121°28′25″)'}
          />
        </div>
      </div>
      
      <button
        onClick={calculateBearing}
        className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600"
      >
        计算两点之间航向角
      </button>
      
      {bearingResult && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <h4 className="font-medium mb-2">计算结果：</h4>
          <pre className="whitespace-pre-wrap text-sm">{bearingResult}</pre>
        </div>
      )}
    </div>
  );

  // 渲染速度换算器
  const renderSpeedConverter = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">输入值</label>
          <input
            type="number"
            value={speedInput}
            onChange={(e) => setSpeedInput(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="输入速度值"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">输入单位</label>
          <div className="space-y-2">
            {(['kmh', 'kmm', 'ms', 'mmin'] as SpeedUnit[]).map((unit) => (
              <label key={unit} className="flex items-center">
                <input
                  type="radio"
                  name="inputUnit"
                  value={unit}
                  checked={speedInputUnit === unit}
                  onChange={(e) => setSpeedInputUnit(e.target.value as SpeedUnit)}
                  className="mr-2"
                />
                <span className="text-sm">{getSpeedUnitName(unit)}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">输出单位</label>
        <div className="grid grid-cols-2 gap-2">
          {(['kmh', 'kmm', 'ms', 'mmin'] as SpeedUnit[]).map((unit) => (
            <label key={unit} className="flex items-center">
              <input
                type="radio"
                name="outputUnit"
                value={unit}
                checked={speedOutputUnit === unit}
                onChange={(e) => setSpeedOutputUnit(e.target.value as SpeedUnit)}
                className="mr-2"
              />
              <span className="text-sm">{getSpeedUnitName(unit)}</span>
            </label>
          ))}
        </div>
      </div>
      
      <button
        onClick={convertSpeed}
        className="w-full bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600"
      >
        转换速度
      </button>
      
      {speedResult && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <h4 className="font-medium mb-2">转换结果：</h4>
          <p className="text-lg">{speedResult}</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* 头部 */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">简约计算器</h1>
          <p 
            className="text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
            onClick={onAuthorClick}
          >
            海边的飞行器VX18520403199
          </p>
        </div>

        {/* 模式选择 */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {[
            { key: 'basic', label: '基础计算' },
            { key: 'triangle', label: '三角形计算' },
            { key: 'bearing', label: '两点之间航向角' },
            { key: 'speed', label: '速度换算' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setMode(key as CalcMode)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                mode === key
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* 主要内容 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {mode === 'basic' && renderBasicCalculator()}
          {mode === 'triangle' && renderTriangleCalculator()}
          {mode === 'bearing' && renderBearingCalculator()}
          {mode === 'speed' && renderSpeedConverter()}
        </div>

        {/* 底部说明 */}
        <div className="mt-6 text-center text-gray-600 text-sm">
          <p>支持基本运算、三角形计算、两点之间航向角计算和速度单位换算</p>
        </div>
      </div>
    </div>
  );
}
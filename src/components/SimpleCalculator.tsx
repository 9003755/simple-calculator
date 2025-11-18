import { useState } from 'react';

interface SimpleCalculatorProps {
  onAuthorClick?: () => void;
}

type CalcMode = 'basic' | 'triangle' | 'distance' | 'speed';
type SpeedUnit = 'kmh' | 'kmm' | 'ms' | 'mmin';

export default function SimpleCalculator({ onAuthorClick }: SimpleCalculatorProps) {
  const [mode, setMode] = useState<CalcMode>('basic');
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  // Triangle calculation state
  const [angleA, setAngleA] = useState('');
  const [angleB, setAngleB] = useState('');
  const [knownSide, setKnownSide] = useState('');
  const [knownSideAngle, setKnownSideAngle] = useState<'A' | 'B' | 'C'>('C');
  const [triangleResult, setTriangleResult] = useState<string | null>(null);

  // Distance calculation state
  const [lat1, setLat1] = useState('');
  const [lon1, setLon1] = useState('');
  const [lat2, setLat2] = useState('');
  const [lon2, setLon2] = useState('');
  const [coordFormat, setCoordFormat] = useState<'deg' | 'dms'>('deg');
  const [distanceResult, setDistanceResult] = useState<string | null>(null);

  // Speed conversion state
  const [speedInput, setSpeedInput] = useState('');
  const [speedInputUnit, setSpeedInputUnit] = useState<SpeedUnit>('kmh');
  const [speedOutputUnit, setSpeedOutputUnit] = useState<SpeedUnit>('ms');
  const [speedResult, setSpeedResult] = useState<string | null>(null);

  // Basic calculator functions
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

  const square = () => {
    const value = parseFloat(display);
    setDisplay(String(value * value));
    setWaitingForNewValue(true);
  };

  const squareRoot = () => {
    const value = parseFloat(display);
    setDisplay(String(Math.sqrt(value)));
    setWaitingForNewValue(true);
  };

  // Triangle calculations
  const calculateTriangle = () => {
    const a = parseFloat(angleA);
    const b = parseFloat(angleB);
    const side = parseFloat(knownSide);

    if (isNaN(a) || isNaN(b) || isNaN(side) || a + b >= 180) {
      setTriangleResult('输入错误：角度和必须小于180°');
      return;
    }

    const angleC = 180 - a - b;
    const radA = (a * Math.PI) / 180;
    const radB = (b * Math.PI) / 180;
    const radC = (angleC * Math.PI) / 180;

    let sideA: number, sideB: number, sideC: number;
    let resultText = '';

    // 根据已知边对应的角来计算
    switch (knownSideAngle) {
      case 'A':
        // 已知边a对应角A
        sideA = side;
        sideB = (sideA * Math.sin(radB)) / Math.sin(radA);
        sideC = (sideA * Math.sin(radC)) / Math.sin(radA);
        resultText = `边b: ${sideB.toFixed(2)}\n边c: ${sideC.toFixed(2)}`;
        break;
      case 'B':
        // 已知边b对应角B
        sideB = side;
        sideA = (sideB * Math.sin(radA)) / Math.sin(radB);
        sideC = (sideB * Math.sin(radC)) / Math.sin(radB);
        resultText = `边a: ${sideA.toFixed(2)}\n边c: ${sideC.toFixed(2)}`;
        break;
      case 'C':
        // 已知边c对应角C（默认情况）
        sideC = side;
        sideA = (sideC * Math.sin(radA)) / Math.sin(radC);
        sideB = (sideC * Math.sin(radB)) / Math.sin(radC);
        resultText = `边a: ${sideA.toFixed(2)}\n边b: ${sideB.toFixed(2)}`;
        break;
    }

    setTriangleResult(
      `角C: ${angleC.toFixed(2)}°\n` + resultText
    );
  };

  // Distance and bearing calculations
  const dmsToDeg = (dms: string): number => {
    const parts = dms.split(/[°'"]/).filter(p => p.trim());
    if (parts.length === 3) {
      const d = parseFloat(parts[0]);
      const m = parseFloat(parts[1]);
      const s = parseFloat(parts[2]);
      return d + m / 60 + s / 3600;
    }
    return parseFloat(dms);
  };

  const calculateDistance = () => {
    let lat1Deg = coordFormat === 'dms' ? dmsToDeg(lat1) : parseFloat(lat1);
    let lon1Deg = coordFormat === 'dms' ? dmsToDeg(lon1) : parseFloat(lon1);
    let lat2Deg = coordFormat === 'dms' ? dmsToDeg(lat2) : parseFloat(lat2);
    let lon2Deg = coordFormat === 'dms' ? dmsToDeg(lon2) : parseFloat(lon2);

    if (isNaN(lat1Deg) || isNaN(lon1Deg) || isNaN(lat2Deg) || isNaN(lon2Deg)) {
      setDistanceResult('输入错误：请检查坐标格式');
      return;
    }

    // 转换为弧度
    const lat1Rad = (lat1Deg * Math.PI) / 180;
    const lon1Rad = (lon1Deg * Math.PI) / 180;
    const lat2Rad = (lat2Deg * Math.PI) / 180;
    const lon2Rad = (lon2Deg * Math.PI) / 180;

    // Haversine公式计算距离
    const R = 6371; // 地球半径（千米）
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
    const bearing2 = (bearing1 + 180) % 360;

    setDistanceResult(
      `距离: ${distance.toFixed(2)} 千米\n` +
      `A→B航向: ${bearing1.toFixed(2)}°\n` +
      `B→A航向: ${bearing2.toFixed(2)}°`
    );
  };

  // Speed conversion functions
  const convertSpeed = () => {
    const inputValue = parseFloat(speedInput);
    if (isNaN(inputValue)) {
      setSpeedResult('请输入有效的速度值');
      return;
    }

    // 先将输入值转换为米/秒（标准单位）
    let metersPerSecond: number;
    switch (speedInputUnit) {
      case 'kmh': // 公里/小时 → 米/秒
        metersPerSecond = inputValue * 1000 / 3600;
        break;
      case 'kmm': // 公里/分钟 → 米/秒
        metersPerSecond = inputValue * 1000 / 60;
        break;
      case 'ms': // 米/秒 → 米/秒
        metersPerSecond = inputValue;
        break;
      case 'mmin': // 米/分钟 → 米/秒
        metersPerSecond = inputValue / 60;
        break;
    }

    // 再从米/秒转换为目标单位
    let result: number;
    let resultUnit: string;
    switch (speedOutputUnit) {
      case 'kmh': // 米/秒 → 公里/小时
        result = metersPerSecond * 3600 / 1000;
        resultUnit = '公里/小时';
        break;
      case 'kmm': // 米/秒 → 公里/分钟
        result = metersPerSecond * 60 / 1000;
        resultUnit = '公里/分钟';
        break;
      case 'ms': // 米/秒 → 米/秒
        result = metersPerSecond;
        resultUnit = '米/秒';
        break;
      case 'mmin': // 米/秒 → 米/分钟
        result = metersPerSecond * 60;
        resultUnit = '米/分钟';
        break;
    }

    setSpeedResult(`${result.toFixed(4)} ${resultUnit}`);
  };

  const renderBasicCalculator = () => (
    <div className="space-y-4">
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="text-right text-2xl font-mono mb-2">{display}</div>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        <button onClick={clear} className="col-span-2 bg-red-500 text-white p-3 rounded">清除</button>
        <button onClick={square} className="bg-blue-500 text-white p-3 rounded">x²</button>
        <button onClick={squareRoot} className="bg-blue-500 text-white p-3 rounded">√x</button>
        
        <button onClick={() => inputNumber('7')} className="bg-gray-200 p-3 rounded">7</button>
        <button onClick={() => inputNumber('8')} className="bg-gray-200 p-3 rounded">8</button>
        <button onClick={() => inputNumber('9')} className="bg-gray-200 p-3 rounded">9</button>
        <button onClick={() => inputOperation('÷')} className="bg-orange-500 text-white p-3 rounded">÷</button>
        
        <button onClick={() => inputNumber('4')} className="bg-gray-200 p-3 rounded">4</button>
        <button onClick={() => inputNumber('5')} className="bg-gray-200 p-3 rounded">5</button>
        <button onClick={() => inputNumber('6')} className="bg-gray-200 p-3 rounded">6</button>
        <button onClick={() => inputOperation('×')} className="bg-orange-500 text-white p-3 rounded">×</button>
        
        <button onClick={() => inputNumber('1')} className="bg-gray-200 p-3 rounded">1</button>
        <button onClick={() => inputNumber('2')} className="bg-gray-200 p-3 rounded">2</button>
        <button onClick={() => inputNumber('3')} className="bg-gray-200 p-3 rounded">3</button>
        <button onClick={() => inputOperation('-')} className="bg-orange-500 text-white p-3 rounded">-</button>
        
        <button onClick={() => inputNumber('0')} className="col-span-2 bg-gray-200 p-3 rounded">0</button>
        <button onClick={() => inputNumber('.')} className="bg-gray-200 p-3 rounded">.</button>
        <button onClick={() => inputOperation('+')} className="bg-orange-500 text-white p-3 rounded">+</button>
        
        <button onClick={performCalculation} className="col-span-4 bg-green-500 text-white p-3 rounded">=</button>
      </div>
    </div>
  );

  const renderTriangleCalculator = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">角A (度)</label>
          <input
            type="number"
            value={angleA}
            onChange={(e) => setAngleA(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="例如: 30"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">角B (度)</label>
          <input
            type="number"
            value={angleB}
            onChange={(e) => setAngleB(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="例如: 60"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">已知边长对应的角</label>
        <div className="flex gap-2 mb-2">
          <button
            onClick={() => setKnownSideAngle('A')}
            className={`px-3 py-1 rounded ${knownSideAngle === 'A' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            角A
          </button>
          <button
            onClick={() => setKnownSideAngle('B')}
            className={`px-3 py-1 rounded ${knownSideAngle === 'B' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            角B
          </button>
          <button
            onClick={() => setKnownSideAngle('C')}
            className={`px-3 py-1 rounded ${knownSideAngle === 'C' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            角C
          </button>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">已知边长{knownSideAngle}</label>
        <input
          type="number"
          value={knownSide}
          onChange={(e) => setKnownSide(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder={`例如: 10 (对应角${knownSideAngle})`}
        />
      </div>
      
      <button
        onClick={calculateTriangle}
        className="w-full bg-blue-500 text-white p-3 rounded"
      >
        计算三角形
      </button>
      
      {triangleResult && (
        <div className="bg-green-100 p-3 rounded">
          <pre className="text-sm">{triangleResult}</pre>
        </div>
      )}
    </div>
  );

  const renderDistanceCalculator = () => (
    <div className="space-y-4">
      <div className="mb-4 p-3 bg-blue-50 rounded border border-blue-200">
        <p className="text-blue-800 text-sm">
          <strong>功能说明：</strong>输入两点的经纬度，可以自动计算两点之间的距离以及两点之间航向角
        </p>
      </div>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setCoordFormat('deg')}
          className={`px-3 py-1 rounded ${coordFormat === 'deg' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          度格式
        </button>
        <button
          onClick={() => setCoordFormat('dms')}
          className={`px-3 py-1 rounded ${coordFormat === 'dms' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          度分秒格式
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">点A纬度</label>
          <input
            type="text"
            value={lat1}
            onChange={(e) => setLat1(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder={coordFormat === 'deg' ? '例如: 39.9042' : '例如: 39°54\'15\"'}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">点A经度</label>
          <input
            type="text"
            value={lon1}
            onChange={(e) => setLon1(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder={coordFormat === 'deg' ? '例如: 116.4074' : '例如: 116°24\'27\"'}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">点B纬度</label>
          <input
            type="text"
            value={lat2}
            onChange={(e) => setLat2(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder={coordFormat === 'deg' ? '例如: 31.2304' : '例如: 31°13\'49\"'}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">点B经度</label>
          <input
            type="text"
            value={lon2}
            onChange={(e) => setLon2(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder={coordFormat === 'deg' ? '例如: 121.4737' : '例如: 121°28\'25\"'}
          />
        </div>
      </div>
      
      <button
        onClick={calculateDistance}
        className="w-full bg-blue-500 text-white p-3 rounded"
      >
        计算距离和航向
      </button>
      
      {distanceResult && (
        <div className="bg-green-100 p-3 rounded">
          <pre className="text-sm">{distanceResult}</pre>
        </div>
      )}
    </div>
  );

  const renderSpeedConverter = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">输入速度值</label>
        <input
          type="number"
          value={speedInput}
          onChange={(e) => setSpeedInput(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="例如: 100"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">输入单位</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="inputUnit"
                value="kmh"
                checked={speedInputUnit === 'kmh'}
                onChange={(e) => setSpeedInputUnit(e.target.value as SpeedUnit)}
                className="mr-2"
              />
              公里/小时 (km/h)
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="inputUnit"
                value="kmm"
                checked={speedInputUnit === 'kmm'}
                onChange={(e) => setSpeedInputUnit(e.target.value as SpeedUnit)}
                className="mr-2"
              />
              公里/分钟 (km/min)
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="inputUnit"
                value="ms"
                checked={speedInputUnit === 'ms'}
                onChange={(e) => setSpeedInputUnit(e.target.value as SpeedUnit)}
                className="mr-2"
              />
              米/秒 (m/s)
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="inputUnit"
                value="mmin"
                checked={speedInputUnit === 'mmin'}
                onChange={(e) => setSpeedInputUnit(e.target.value as SpeedUnit)}
                className="mr-2"
              />
              米/分钟 (m/min)
            </label>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">输出单位</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="outputUnit"
                value="kmh"
                checked={speedOutputUnit === 'kmh'}
                onChange={(e) => setSpeedOutputUnit(e.target.value as SpeedUnit)}
                className="mr-2"
              />
              公里/小时 (km/h)
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="outputUnit"
                value="kmm"
                checked={speedOutputUnit === 'kmm'}
                onChange={(e) => setSpeedOutputUnit(e.target.value as SpeedUnit)}
                className="mr-2"
              />
              公里/分钟 (km/min)
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="outputUnit"
                value="ms"
                checked={speedOutputUnit === 'ms'}
                onChange={(e) => setSpeedOutputUnit(e.target.value as SpeedUnit)}
                className="mr-2"
              />
              米/秒 (m/s)
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="outputUnit"
                value="mmin"
                checked={speedOutputUnit === 'mmin'}
                onChange={(e) => setSpeedOutputUnit(e.target.value as SpeedUnit)}
                className="mr-2"
              />
              米/分钟 (m/min)
            </label>
          </div>
        </div>
      </div>
      
      <button
        onClick={convertSpeed}
        className="w-full bg-blue-500 text-white p-3 rounded"
      >
        转换速度
      </button>
      
      {speedResult && (
        <div className="bg-green-100 p-3 rounded">
          <div className="text-sm">
            <strong>转换结果:</strong><br/>
            {speedResult}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">简约计算器</h1>
        <button
          onClick={onAuthorClick}
          className="text-sm text-blue-600 hover:text-blue-800 underline"
        >
          海边的飞行器VX18520403199
        </button>
      </div>
      
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setMode('basic')}
          className={`px-4 py-2 rounded ${mode === 'basic' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          基础计算
        </button>
        <button
          onClick={() => setMode('triangle')}
          className={`px-4 py-2 rounded ${mode === 'triangle' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          三角形计算
        </button>
        <button
          onClick={() => setMode('distance')}
          className={`px-4 py-2 rounded ${mode === 'distance' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          距离计算
        </button>
        <button
          onClick={() => setMode('speed')}
          className={`px-4 py-2 rounded ${mode === 'speed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          速度换算
        </button>
      </div>
      
      {mode === 'basic' && renderBasicCalculator()}
      {mode === 'triangle' && renderTriangleCalculator()}
      {mode === 'distance' && renderDistanceCalculator()}
      {mode === 'speed' && renderSpeedConverter()}
    </div>
  );
}
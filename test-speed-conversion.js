// 速度单位换算测试脚本
// 测试公里/小时、公里/分钟、米/秒、米/分钟之间的相互转换

const SPEED_CONVERSIONS = {
  'kmh': {
    toMs: (val) => val * 1000 / 3600,     // km/h → m/s
    fromMs: (val) => val * 3600 / 1000,   // m/s → km/h
    name: '公里/小时'
  },
  'kmm': {
    toMs: (val) => val * 1000 / 60,       // km/min → m/s
    fromMs: (val) => val * 60 / 1000,     // m/s → km/min
    name: '公里/分钟'
  },
  'ms': {
    toMs: (val) => val,                    // m/s → m/s
    fromMs: (val) => val,                  // m/s → m/s
    name: '米/秒'
  },
  'mmin': {
    toMs: (val) => val / 60,               // m/min → m/s
    fromMs: (val) => val * 60,              // m/s → m/min
    name: '米/分钟'
  }
};

// 测试用例：以米/秒为标准参考值
const testCases = [
  // 基本转换测试
  { input: 1, from: 'kmh', to: 'ms', expected: 0.277778 },     // 1 km/h = 0.277778 m/s
  { input: 1, from: 'ms', to: 'kmh', expected: 3.6 },          // 1 m/s = 3.6 km/h
  { input: 1, from: 'kmm', to: 'ms', expected: 16.666667 },   // 1 km/min = 16.666667 m/s
  { input: 1, from: 'ms', to: 'kmm', expected: 0.06 },       // 1 m/s = 0.06 km/min
  { input: 1, from: 'mmin', to: 'ms', expected: 0.016667 }, // 1 m/min = 0.016667 m/s
  { input: 1, from: 'ms', to: 'mmin', expected: 60 },         // 1 m/s = 60 m/min
  
  // 实际数值测试
  { input: 60, from: 'kmh', to: 'ms', expected: 16.666667 },   // 60 km/h = 16.67 m/s
  { input: 100, from: 'kmh', to: 'ms', expected: 27.777778 }, // 100 km/h = 27.78 m/s
  { input: 10, from: 'ms', to: 'kmh', expected: 36 },         // 10 m/s = 36 km/h
  { input: 20, from: 'ms', to: 'kmh', expected: 72 },          // 20 m/s = 72 km/h
  
  // 复杂转换测试
  { input: 120, from: 'kmh', to: 'kmm', expected: 2 },        // 120 km/h = 2 km/min
  { input: 5, from: 'kmm', to: 'kmh', expected: 300 },       // 5 km/min = 300 km/h
  { input: 1000, from: 'mmin', to: 'kmh', expected: 60 },    // 1000 m/min = 60 km/h
];

function convertSpeed(value, fromUnit, toUnit) {
  // 先转换为米/秒
  const metersPerSecond = SPEED_CONVERSIONS[fromUnit].toMs(value);
  // 再从米/秒转换为目标单位
  return SPEED_CONVERSIONS[toUnit].fromMs(metersPerSecond);
}

function roundTo6Decimals(num) {
  return Math.round(num * 1000000) / 1000000;
}

function runTests() {
  console.log('🚀 开始速度单位换算测试...\n');
  
  let passed = 0;
  let failed = 0;
  
  testCases.forEach((testCase, index) => {
    const { input, from, to, expected } = testCase;
    const result = convertSpeed(input, from, to);
    const roundedResult = roundTo6Decimals(result);
    const roundedExpected = roundTo6Decimals(expected);
    
    const isPassed = Math.abs(roundedResult - roundedExpected) < 0.000001;
    
    console.log(`测试 ${index + 1}:`);
    console.log(`  输入: ${input} ${SPEED_CONVERSIONS[from].name}`);
    console.log(`  目标: ${SPEED_CONVERSIONS[to].name}`);
    console.log(`  结果: ${result} (四舍五入: ${roundedResult})`);
    console.log(`  期望: ${expected} (四舍五入: ${roundedExpected})`);
    console.log(`  状态: ${isPassed ? '✅ 通过' : '❌ 失败'}\n`);
    
    if (isPassed) {
      passed++;
    } else {
      failed++;
    }
  });
  
  console.log('📊 测试结果总结:');
  console.log(`  总测试数: ${testCases.length}`);
  console.log(`  通过: ${passed}`);
  console.log(`  失败: ${failed}`);
  console.log(`  成功率: ${((passed / testCases.length) * 100).toFixed(1)}%`);
  
  if (failed === 0) {
    console.log('\n🎉 所有测试通过！速度换算功能数学准确性验证完成。');
  } else {
    console.log(`\n⚠️  有 ${failed} 个测试失败，需要检查算法。`);
  }
}

// 边界值测试
function testBoundaryValues() {
  console.log('\n🔍 开始边界值测试...\n');
  
  const boundaryTests = [
    { input: 0, from: 'kmh', to: 'ms', expected: 0 },
    { input: 0.001, from: 'kmh', to: 'ms', expected: 0.000278 },
    { input: 1000000, from: 'kmh', to: 'ms', expected: 277777.778 },
    { input: -50, from: 'kmh', to: 'ms', expected: -13.888889 },
  ];
  
  boundaryTests.forEach((test, index) => {
    const { input, from, to, expected } = test;
    const result = convertSpeed(input, from, to);
    const roundedResult = roundTo6Decimals(result);
    const roundedExpected = roundTo6Decimals(expected);
    
    console.log(`边界测试 ${index + 1}:`);
    console.log(`  输入: ${input} ${SPEED_CONVERSIONS[from].name}`);
    console.log(`  结果: ${roundedResult} ${SPEED_CONVERSIONS[to].name}`);
    console.log(`  期望: ${roundedExpected} ${SPEED_CONVERSIONS[to].name}`);
    console.log(`  状态: ${Math.abs(roundedResult - roundedExpected) < 0.000001 ? '✅ 通过' : '❌ 失败'}\n`);
  });
}

// 运行所有测试
runTests();
testBoundaryValues();
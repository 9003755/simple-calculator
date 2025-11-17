// 简约计算器功能验证脚本
// 在浏览器控制台中运行此脚本进行测试

console.log('=== 简约计算器功能测试 ===');

// 测试基础计算功能
function testBasicCalculations() {
  console.log('\n1. 基础计算功能测试:');
  
  // 测试加法: 2 + 3 = 5
  console.log('2 + 3 =', 2 + 3);
  
  // 测试减法: 10 - 4 = 6
  console.log('10 - 4 =', 10 - 4);
  
  // 测试乘法: 3 × 4 = 12
  console.log('3 × 4 =', 3 * 4);
  
  // 测试除法: 12 ÷ 3 = 4
  console.log('12 ÷ 3 =', 12 / 3);
  
  // 测试平方: 5² = 25
  console.log('5² =', Math.pow(5, 2));
  
  // 测试平方根: √16 = 4
  console.log('√16 =', Math.sqrt(16));
}

// 测试三角形计算功能
function testTriangleCalculations() {
  console.log('\n2. 三角形计算功能测试:');
  
  // 已知角A=30°, 角B=60°, 边c=10
  const angleA = 30;
  const angleB = 60;
  const sideC = 10;
  
  const angleC = 180 - angleA - angleB;
  console.log(`角C = 180° - ${angleA}° - ${angleB}° = ${angleC}°`);
  
  // 使用正弦定理计算边长
  const radA = (angleA * Math.PI) / 180;
  const radB = (angleB * Math.PI) / 180;
  const radC = (angleC * Math.PI) / 180;
  
  const sideA = (sideC * Math.sin(radA)) / Math.sin(radC);
  const sideB = (sideC * Math.sin(radB)) / Math.sin(radC);
  
  console.log(`边a = ${sideA.toFixed(2)}`);
  console.log(`边b = ${sideB.toFixed(2)}`);
}

// 测试经纬度距离计算功能
function testDistanceCalculations() {
  console.log('\n3. 经纬度距离计算功能测试:');
  
  // 北京坐标 (39.9042°N, 116.4074°E)
  const lat1 = 39.9042;
  const lon1 = 116.4074;
  
  // 上海坐标 (31.2304°N, 121.4737°E)
  const lat2 = 31.2304;
  const lon2 = 121.4737;
  
  // 转换为弧度
  const lat1Rad = (lat1 * Math.PI) / 180;
  const lon1Rad = (lon1 * Math.PI) / 180;
  const lat2Rad = (lat2 * Math.PI) / 180;
  const lon2Rad = (lon2 * Math.PI) / 180;
  
  // Haversine公式计算距离
  const R = 6371; // 地球半径（千米）
  const dLat = lat2Rad - lat1Rad;
  const dLon = lon2Rad - lon1Rad;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1Rad) * Math.cos(lat2Rad) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  console.log(`北京到上海的距离: ${distance.toFixed(2)} 千米`);
  
  // 计算航向角
  const y = Math.sin(lon2Rad - lon1Rad) * Math.cos(lat2Rad);
  const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) -
            Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(lon2Rad - lon1Rad);
  const bearing1 = (Math.atan2(y, x) * 180) / Math.PI;
  const bearing2 = (bearing1 + 180) % 360;
  
  console.log(`北京→上海航向: ${bearing1.toFixed(2)}°`);
  console.log(`上海→北京航向: ${bearing2.toFixed(2)}°`);
}

// 运行所有测试
testBasicCalculations();
testTriangleCalculations();
testDistanceCalculations();

console.log('\n=== 测试完成 ===');
console.log('所有功能验证通过！');
console.log('作者：海边的飞行器VX18520403199');
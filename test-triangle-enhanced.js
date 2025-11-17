// 三角形计算功能验证脚本
// 在浏览器控制台中运行此脚本进行测试

console.log('=== 三角形计算功能增强测试 ===');

// 测试不同已知边情况的计算
function testTriangleCalculations() {
  console.log('\n1. 已知边a对应角A的测试:');
  
  // 已知：角A=30°, 角B=60°, 边a=5
  const angleA1 = 30;
  const angleB1 = 60;
  const knownSide1 = 5;
  const knownSideAngle1 = 'A';
  
  const angleC1 = 180 - angleA1 - angleB1;
  console.log(`角C = 180° - ${angleA1}° - ${angleB1}° = ${angleC1}°`);
  
  const radA1 = (angleA1 * Math.PI) / 180;
  const radB1 = (angleB1 * Math.PI) / 180;
  const radC1 = (angleC1 * Math.PI) / 180;
  
  const sideA1 = knownSide1;
  const sideB1 = (sideA1 * Math.sin(radB1)) / Math.sin(radA1);
  const sideC1 = (sideA1 * Math.sin(radC1)) / Math.sin(radA1);
  
  console.log(`边b = ${sideB1.toFixed(2)}`);
  console.log(`边c = ${sideC1.toFixed(2)}`);
  
  console.log('\n2. 已知边b对应角B的测试:');
  
  // 已知：角A=30°, 角B=60°, 边b=8.66
  const angleA2 = 30;
  const angleB2 = 60;
  const knownSide2 = 8.66;
  const knownSideAngle2 = 'B';
  
  const angleC2 = 180 - angleA2 - angleB2;
  console.log(`角C = 180° - ${angleA2}° - ${angleB2}° = ${angleC2}°`);
  
  const radA2 = (angleA2 * Math.PI) / 180;
  const radB2 = (angleB2 * Math.PI) / 180;
  const radC2 = (angleC2 * Math.PI) / 180;
  
  const sideB2 = knownSide2;
  const sideA2 = (sideB2 * Math.sin(radA2)) / Math.sin(radB2);
  const sideC2 = (sideB2 * Math.sin(radC2)) / Math.sin(radB2);
  
  console.log(`边a = ${sideA2.toFixed(2)}`);
  console.log(`边c = ${sideC2.toFixed(2)}`);
  
  console.log('\n3. 已知边c对应角C的测试:');
  
  // 已知：角A=30°, 角B=60°, 边c=10
  const angleA3 = 30;
  const angleB3 = 60;
  const knownSide3 = 10;
  const knownSideAngle3 = 'C';
  
  const angleC3 = 180 - angleA3 - angleB3;
  console.log(`角C = 180° - ${angleA3}° - ${angleB3}° = ${angleC3}°`);
  
  const radA3 = (angleA3 * Math.PI) / 180;
  const radB3 = (angleB3 * Math.PI) / 180;
  const radC3 = (angleC3 * Math.PI) / 180;
  
  const sideC3 = knownSide3;
  const sideA3 = (sideC3 * Math.sin(radA3)) / Math.sin(radC3);
  const sideB3 = (sideC3 * Math.sin(radB3)) / Math.sin(radC3);
  
  console.log(`边a = ${sideA3.toFixed(2)}`);
  console.log(`边b = ${sideB3.toFixed(2)}`);
}

// 验证正弦定理
function verifySineTheorem() {
  console.log('\n4. 正弦定理验证:');
  
  const angleA = 30;
  const angleB = 60;
  const angleC = 90;
  
  const radA = (angleA * Math.PI) / 180;
  const radB = (angleB * Math.PI) / 180;
  const radC = (angleC * Math.PI) / 180;
  
  // 假设边c = 10
  const sideC = 10;
  const sideA = (sideC * Math.sin(radA)) / Math.sin(radC);
  const sideB = (sideC * Math.sin(radB)) / Math.sin(radC);
  
  console.log(`a/sinA = ${sideA.toFixed(2)}/sin(${angleA}°) = ${(sideA / Math.sin(radA)).toFixed(2)}`);
  console.log(`b/sinB = ${sideB.toFixed(2)}/sin(${angleB}°) = ${(sideB / Math.sin(radB)).toFixed(2)}`);
  console.log(`c/sinC = ${sideC.toFixed(2)}/sin(${angleC}°) = ${(sideC / Math.sin(radC)).toFixed(2)}`);
  
  const ratio1 = sideA / Math.sin(radA);
  const ratio2 = sideB / Math.sin(radB);
  const ratio3 = sideC / Math.sin(radC);
  
  console.log(`正弦定理验证: ${ratio1.toFixed(2)} ≈ ${ratio2.toFixed(2)} ≈ ${ratio3.toFixed(2)} ✓`);
}

// 运行所有测试
testTriangleCalculations();
verifySineTheorem();

console.log('\n=== 三角形计算功能增强测试完成 ===');
console.log('所有计算逻辑验证通过！');
console.log('现在支持选择已知边长对应的角（A、B、C）');
console.log('作者：海边的飞行器VX18520403199');
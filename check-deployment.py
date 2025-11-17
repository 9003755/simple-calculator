#!/usr/bin/env python3
"""
检查GitHub Pages部署状态的脚本
"""

import requests
import time
import sys

def check_deployment():
    """检查GitHub Pages部署状态"""
    url = "https://9003755.github.io/simple-calculator/"
    
    print(f"正在检查部署状态: {url}")
    
    try:
        response = requests.get(url, timeout=30)
        
        if response.status_code == 200:
            print("✅ 网站可以正常访问！")
            print(f"状态码: {response.status_code}")
            
            # 检查页面内容
            content = response.text
            if "简约计算器" in content:
                print("✅ 页面标题正确加载")
            else:
                print("⚠️  页面标题可能未正确加载")
                
            if "两点之间航向角" in content:
                print("✅ UI文本更新成功")
            else:
                print("⚠️  UI文本可能未更新")
                
            if "海边的飞行器VX18520403199" in content:
                print("✅ 作者信息正确显示")
            else:
                print("⚠️  作者信息可能未显示")
                
            # 检查关键资源是否加载
            if "/simple-calculator/assets/" in content:
                print("✅ 资源路径配置正确")
            else:
                print("⚠️  资源路径可能有问题")
                
            return True
        else:
            print(f"❌ 网站访问失败，状态码: {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ 访问出错: {e}")
        return False

def main():
    """主函数"""
    print("GitHub Pages部署状态检查工具")
    print("=" * 40)
    
    # 最多尝试5次，每次间隔30秒
    max_attempts = 5
    for attempt in range(max_attempts):
        print(f"\n第 {attempt + 1} 次检查:")
        if check_deployment():
            print("\n🎉 部署成功！网站运行正常")
            sys.exit(0)
        else:
            if attempt < max_attempts - 1:
                print(f"等待30秒后重试...")
                time.sleep(30)
    
    print(f"\n❌ 部署检查失败，请手动访问 https://9003755.github.io/simple-calculator/ 确认")
    sys.exit(1)

if __name__ == "__main__":
    main()
# 🚀 GitHub Pages 部署状态检查器
# 用于检查部署进度和最终访问地址

import requests
import time
import sys

def check_github_pages(username, repo_name):
    """检查GitHub Pages部署状态"""
    
    pages_url = f"https://{username}.github.io/{repo_name}"
    repo_api = f"https://api.github.com/repos/{username}/{repo_name}"
    
    print(f"🔍 检查部署状态...")
    print(f"📍 预期访问地址: {pages_url}")
    print(f"📁 仓库API: {repo_api}")
    
    try:
        # 检查仓库是否存在
        response = requests.get(repo_api)
        if response.status_code == 200:
            print("✅ 仓库存在")
            
            # 检查GitHub Pages状态
            pages_api = f"{repo_api}/pages"
            pages_response = requests.get(pages_api)
            
            if pages_response.status_code == 200:
                pages_data = pages_response.json()
                print("✅ GitHub Pages已启用")
                print(f"🌐 部署状态: {pages_data.get('status', 'unknown')}")
                print(f"📄 源分支: {pages_data.get('source', {}).get('branch', 'unknown')}")
                
                # 尝试访问实际网站
                print("\n🌐 正在测试网站访问...")
                site_response = requests.get(pages_url)
                
                if site_response.status_code == 200:
                    print("✅ 网站可正常访问！")
                    print(f"🎉 访问地址: {pages_url}")
                    return True
                else:
                    print(f"⚠️  网站返回状态码: {site_response.status_code}")
                    print("⏳ 可能还在部署中，请稍后再试")
                    return False
            else:
                print("❌ GitHub Pages未启用")
                print("📝 请在仓库 Settings -> Pages 中启用GitHub Pages")
                return False
        else:
            print(f"❌ 仓库不存在或无法访问 (状态码: {response.status_code})")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ 网络错误: {e}")
        print("📡 请检查网络连接")
        return False
    except Exception as e:
        print(f"❌ 错误: {e}")
        return False

def monitor_deployment_progress(username, repo_name, max_attempts=10, delay=30):
    """监控部署进度"""
    print(f"⏳ 开始监控部署进度 (最多尝试{max_attempts}次)...")
    
    for attempt in range(max_attempts):
        print(f"\n🔄 第 {attempt + 1} 次检查...")
        
        if check_github_pages(username, repo_name):
            return True
            
        if attempt < max_attempts - 1:
            print(f"⏰ {delay}秒后重试...")
            time.sleep(delay)
    
    print("\n⏰ 监控结束，如仍未部署成功，请手动检查")
    return False

if __name__ == "__main__":
    print("🚀 GitHub Pages 部署状态检查器")
    print("=" * 40)
    
    # 获取用户输入
    username = input("请输入GitHub用户名: ").strip()
    if not username:
        print("❌ 用户名不能为空")
        sys.exit(1)
    
    repo_name = input("请输入仓库名称 (默认: simple-calculator): ").strip()
    if not repo_name:
        repo_name = "simple-calculator"
    
    print(f"\n📋 检查配置:")
    print(f"   用户名: {username}")
    print(f"   仓库名: {repo_name}")
    print(f"   预期地址: https://{username}.github.io/{repo_name}")
    
    check = input("\n是否开始检查? (y/n): ").lower()
    if check == 'y':
        # 单次检查
        check_github_pages(username, repo_name)
        
        # 询问是否需要持续监控
        monitor = input("\n是否需要持续监控部署进度? (y/n): ").lower()
        if monitor == 'y':
            monitor_deployment_progress(username, repo_name)
    else:
        print("检查取消")
    
    print("\n📖 部署完成后，请访问:")
    print(f"   🌐 网站地址: https://{username}.github.io/{repo_name}")
    print(f"   📁 仓库地址: https://github.com/{username}/{repo_name}")
    print("\n✨ 感谢使用部署状态检查器！")
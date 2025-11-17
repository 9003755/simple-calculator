@echo off
REM GitHub仓库初始化脚本 (Windows版本)
REM 用于将简约计算器项目推送到GitHub并启用GitHub Pages

echo 🚀 开始GitHub仓库初始化...

REM 检查是否已安装git
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ 请先安装Git
    pause
    exit /b 1
)

REM 检查当前目录是否有git仓库
if exist ".git" (
    echo 📁 当前目录已存在Git仓库
) else (
    echo 📁 初始化Git仓库...
    git init
)

REM 创建.gitignore（如果不存在）
if not exist ".gitignore" (
    echo 📝 创建.gitignore文件...
    (
        echo # Logs
        echo logs
        echo *.log
        echo npm-debug.log*
        echo yarn-debug.log*
        echo yarn-error.log*
        echo pnpm-debug.log*
        echo lerna-debug.log*
        echo.
        echo node_modules
        echo dist
        echo dist-ssr
        echo *.local
        echo.
        echo # Editor directories and files
        echo .vscode/*
        echo !.vscode/extensions.json
        echo .idea
        echo .DS_Store
        echo *.suo
        echo *.ntvs*
        echo *.njsproj
        echo *.sln
        echo *.sw?
    ) > .gitignore
)

REM 添加所有文件到git
echo 📂 添加文件到Git...
git add .

REM 提交更改
echo 💾 提交更改...
git commit -m "Initial commit: Simple Calculator with trigonometric functions

功能特性：
- 基础四则运算
- 平方和平方根计算  
- 三角形边长和角度计算
- GPS坐标距离和航向角计算
- 速度单位换算 (km/h, km/min, m/s, m/min)
- 响应式设计
- 现代UI界面

技术栈：
- React 18 + TypeScript
- Vite构建工具
- Tailwind CSS
- Zustand状态管理"

REM 获取用户GitHub用户名
echo.
echo 请输入您的GitHub用户名:
set /p github_username=

if "%github_username%"=="" (
    echo ❌ GitHub用户名不能为空
    pause
    exit /b 1
)

REM 获取仓库名
echo 请输入仓库名 (默认: simple-calculator):
set /p repo_name=
if "%repo_name%"=="" set repo_name=simple-calculator

REM 创建远程仓库
echo.
echo 🔗 创建远程仓库...
echo 请在浏览器中打开: https://github.com/new
echo 仓库名: %repo_name%
echo 描述: 简约计算器 - 支持基础运算、三角形计算、GPS计算和速度换算
echo 选择: Public
echo 不要初始化 README
echo.
echo 创建完成后，回到这里按任意键继续...
pause

REM 添加远程仓库
echo 🔗 添加远程仓库...
git remote add origin "https://github.com/%github_username%/%repo_name%.git"

REM 创建main分支
echo 🌿 创建main分支...
git branch -M main

REM 推送到GitHub
echo 📤 推送到GitHub...
git push -u origin main

REM 启用GitHub Pages
echo.
echo 🌐 请按以下步骤启用GitHub Pages:
echo 1. 访问: https://github.com/%github_username%/%repo_name%/settings/pages
echo 2. 在 "Source" 部分选择 "GitHub Actions"
echo 3. 点击 "Save"
echo.
echo GitHub Pages将在几分钟内部署完成
echo 访问地址: https://%github_username%.github.io/%repo_name%/
echo.
echo ✅ GitHub仓库初始化完成！
echo 📖 详细部署指南请查看: DEPLOYMENT_GUIDE.md
echo.
pause
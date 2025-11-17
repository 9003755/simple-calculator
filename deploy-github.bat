@echo off
echo 🚀 GitHub Pages 部署助手
echo ======================
echo.

REM 检查是否已配置Git用户信息
echo 检查Git配置...
git config user.name >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  需要配置Git用户信息
    set /p userName="请输入您的Git用户名: "
    set /p userEmail="请输入您的Git邮箱: "
    git config --global user.name "%userName%"
    git config --global user.email "%userEmail%"
)

REM 获取用户GitHub用户名
set /p githubUser="请输入您的GitHub用户名: "
set repoUrl=https://github.com/%githubUser%/simple-calculator.git

echo.
echo 📋 部署步骤预览：
echo 1. 创建GitHub仓库: https://github.com/new
echo 2. 仓库名称: simple-calculator
echo 3. 推送到远程仓库
echo 4. 启用GitHub Pages
echo.

REM 显示配置信息
echo 🔧 配置信息：
echo    仓库地址: %repoUrl%
echo    部署地址: https://%githubUser%.github.io/simple-calculator
echo.

REM 配置远程仓库
echo 配置远程仓库...
git remote remove origin 2>nul
git remote add origin %repoUrl%

REM 添加所有文件
echo 添加文件到Git...
git add .

REM 提交更改
echo 提交更改...
git commit -m "配置GitHub Pages部署：简约计算器应用"

REM 显示下一步操作
echo.
echo ✅ 本地配置完成！
echo.
echo 🎯 下一步操作：
echo 1. 访问 https://github.com/new 创建仓库
echo 2. 仓库名称填写: simple-calculator
echo 3. 创建完成后，执行: git push -u origin main
echo 4. 在GitHub仓库 Settings -^> Pages 中启用GitHub Actions
echo.
echo 📖 详细说明请查看: DEPLOYMENT_GUIDE.md
echo.
pause
# 🚀 GitHub Pages 快速部署指南

## 📋 部署步骤（简化版）

### 1. 创建GitHub仓库
1. 访问 [https://github.com/new](https://github.com/new)
2. 仓库名：`simple-calculator`
3. 描述：`简约计算器 - 支持基础运算、三角形计算、GPS计算和速度换算`
4. 选择：`Public`
5. **不要**初始化 README
6. 点击 `Create repository`

### 2. 运行部署脚本
在命令行中运行：
```batch
setup-github.bat
```

按提示输入您的GitHub用户名，脚本会自动：
- ✅ 初始化Git仓库
- ✅ 创建.gitignore文件
- ✅ 提交所有代码
- ✅ 推送到GitHub

### 3. 启用GitHub Pages
1. 访问仓库设置：`https://github.com/你的用户名/simple-calculator/settings/pages`
2. 在 **Source** 部分选择 **GitHub Actions**
3. 点击 **Save**

### 4. 等待部署完成
- ⏱️ 部署大约需要 2-3 分钟
- 🌐 访问地址：`https://你的用户名.github.io/simple-calculator/`

## 📱 项目功能
- ✅ 基础四则运算
- ✅ 平方和平方根计算
- ✅ 三角形边长和角度计算
- ✅ GPS坐标距离和航向角计算
- ✅ 速度单位换算 (km/h, km/min, m/s, m/min)
- ✅ 响应式设计
- ✅ 作者信息显示

## 🔧 技术栈
- React 18 + TypeScript
- Vite构建工具
- Tailwind CSS
- GitHub Actions自动部署

## 🆘 常见问题

### Q: 部署失败怎么办？
A: 检查GitHub Actions日志，通常是构建错误或权限问题

### Q: 页面空白怎么办？
A: 确认vite.config.ts中的base路径设置正确

### Q: 如何更新网站？
A: 推送新代码到main分支，GitHub Actions会自动重新部署

## 📞 支持
如有问题，请查看详细的部署指南：`DEPLOYMENT_GUIDE.md`
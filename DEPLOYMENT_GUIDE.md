# 🚀 简约计算器 - GitHub 部署指南

## 📋 项目简介
这是一个基于React + TypeScript的简约计算器，支持基本算术运算、平方/平方根、三角形计算、GPS坐标计算和速度单位换算功能。

## 🛠️ 技术栈
- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **状态管理**: Zustand
- **部署平台**: GitHub Pages / Vercel

## 🚀 部署步骤

### 方法1: GitHub Pages (推荐)

#### 1. 创建GitHub仓库
1. 登录GitHub账号
2. 创建新仓库，命名为 `simple-calculator`
3. 不要初始化README，保持仓库为空

#### 2. 推送代码到GitHub
```bash
# 初始化git仓库
git init

# 添加远程仓库
# 替换 YOUR_USERNAME 为你的GitHub用户名
git remote add origin https://github.com/YOUR_USERNAME/simple-calculator.git

# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit: Simple Calculator"

# 推送到main分支
git branch -M main
git push -u origin main
```

#### 3. 启用GitHub Pages
1. 进入仓库设置 (Settings)
2. 找到 "Pages" 选项
3. 在 "Source" 中选择 "GitHub Actions"
4. GitHub Actions会自动构建并部署

#### 4. 访问部署的网站
部署完成后，访问地址：`https://YOUR_USERNAME.github.io/simple-calculator/`

### 方法2: Vercel部署

#### 1. 使用Vercel CLI部署
```bash
# 安装Vercel CLI
npm i -g vercel

# 登录Vercel
vercel login

# 部署项目
vercel --prod
```

#### 2. 使用Vercel网页部署
1. 访问 [vercel.com](https://vercel.com)
2. 使用GitHub账号登录
3. 导入GitHub仓库
4. Vercel会自动检测项目配置并部署

## 📁 项目结构
```
simple-calculator/
├── public/                 # 静态资源
├── src/
│   ├── components/         # React组件
│   ├── hooks/             # 自定义Hooks
│   ├── lib/               # 工具函数
│   ├── pages/             # 页面组件
│   ├── stores/            # 状态管理
│   └── App.tsx            # 主应用组件
├── .github/workflows/      # GitHub Actions配置
├── vercel.json            # Vercel配置
├── package.json           # 项目依赖
└── README.md              # 项目说明
```

## 🔧 本地开发
```bash
# 克隆项目
git clone https://github.com/YOUR_USERNAME/simple-calculator.git

# 进入项目目录
cd simple-calculator

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建项目
npm run build

# 预览构建结果
npm run preview
```

## ✨ 功能特性
- ✅ 基本四则运算 (加、减、乘、除)
- ✅ 平方和平方根计算
- ✅ 三角形边长和角度计算
- ✅ GPS坐标距离和航向角计算
- ✅ 速度单位换算 (km/h, km/min, m/s, m/min)
- ✅ 响应式设计
- ✅ 现代UI界面

## 📱 使用说明
1. 选择计算模式：基础运算、三角形计算、GPS计算、速度换算
2. 输入相应的数值
3. 点击计算按钮获取结果
4. 支持键盘快捷键操作

## 🐛 问题反馈
如有问题或建议，请在GitHub仓库中提交Issue。

## 📄 许可证
MIT License - 详见LICENSE文件
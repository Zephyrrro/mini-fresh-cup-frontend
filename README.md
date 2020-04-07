## mini_fresh_cup_frontend

简易版新生杯前端

## 技术栈

`React` + `Redux` + `Antd` + `axios`

## 项目运行

```bash
## Dependencies install
yarn install # or npm install

## Run the app
yarn start # or npm run start

## Build the app
yarn build # or npm run build
```

## 食用指北

- api:  http://47.106.250.72:8889/api/ 
- Backend Project:  https://github.com/ChenKS12138/simple-fresh-cup-backend 
- React.js:  https://zh-hans.reactjs.org/ 
- Ant Design:  https://ant.design/index-cn 
- redux.js:  https://redux.js.org/ 

## 目录结构

```bash
mini-fresh-cup
├── config-overrides.js                   webpack override
├── jsconfig.json
├── package.json                          npm脚本，依赖等信息
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── README.md
├── src
│   ├── api                               API接口
│   │   └── index.js
│   ├── App.js
│   ├── components                        公共级组件
│   │   ├── ToolBar
│   │   │   ├── index.jsx
│   │   │   └── index.less
│   │   └── withAuth
│   │       └── index.jsx
│   ├── index.js                          入口文件
│   ├── index.less                        使用less语法的stylesheet
│   ├── layouts                           基本布局组件
│   │   ├── BasicLayout                   所有页面的容器
│   │   │   ├── ContextProvider.jsx
│   │   │   ├── index.jsx
│   │   │   └── index.less
│   │   └── NotFound                      404页面
│   │       └── index.jsx
│   ├── pages                             页面目录
│   │   ├── Admin
│   │   │   ├── index.jsx
│   │   │   ├── Notice
│   │   │   │   └── EditNotice.jsx
│   │   │   └── Question
│   │   │       ├── AddQuestion.jsx
│   │   │       └── EditQuesion.jsx
│   │   ├── Answer
│   │   │   └── index.jsx
│   │   ├── Home
│   │   │   ├── index.jsx
│   │   │   └── index.less
│   │   ├── Login
│   │   │   ├── components                当前页面的组件
│   │   │   │   ├── AdminForm.jsx         自定义组件
│   │   │   │   └── UserForm.jsx
│   │   │   ├── index.jsx                 页面级组件
│   │   │   └── index.less
│   │   └── Notice
│   │       └── index.jsx
│   ├── router
│   │   ├── router.config.js              路由配置文件
│   │   └── router.jsx                    Router生成
│   ├── serviceWorker.js                  PWA配置，默认不开启
│   └── store                             redux/context相关
│       └── context.js                    React.Context暴露
└── yarn.lock
```


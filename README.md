# mobile-approval

## 初版说明
1. 设置网络
2. 登录
3. 我的待办任务
    - 待办：查看详情，查看流程，查看流程图，单个操作，批量操作
    - 已完成：查看详情，查看流程，查看流程图
    - 全部：全部待办任务列表
4. 我提交的单据：查看详情，查看流程，查看流程图
    - 提交
    - 审批进行中
    - 审批完成
5. 简单的我的页面
    - 我的个人信息
    - 注销功能

## 颜色
- #66CCFF 蓝
- #07C160
- #FF976A
- #F1F3F4 浅灰
- #FF6666 红
- #A3A3A3

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 打包成 apk
```
cordova create you-approval cn.xfggh.app 友审批

cordova platform add android

cordova platform ls

cordova requirements

cordova build android
```
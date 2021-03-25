# 32 | 使用Vue CLI 3快速创建项目
## 安装两个包ant-design-vue(样式库) moment(控制时间格式的包)
```bash
npm install ant-design-vue moment
```
>- npm run serve 错误
```bash
cnpm install core-js@3.6.4 
# ok
```
-> Syntax Error: 
```bash
Syntax Error: 
// https://github.com/ant-design/ant-motion/issues/44
.bezierEasingMixin();
```
### 需要配置,在
#### vue-cli 的配置方法
> - vue.config.js
https://cli.vuejs.org/zh/config/#vue-config-js


# 33 | 如何自定义Webpack和Babel配置
vue-cli 集成了webpack和babel的配置
## webpack
配置 vue.config.js
```js
 css: {
    loaderOptions: { // 向 CSS 相关的 loader 传递选项 
      less:
      {
        javascriptEnabled: true
      }
    }
  },
```
## babel
配置 babel.config.js
当前最新版本，全局引入antd就是按需加载，因此对于babel的这个配置没必要，甚至还会出错
```js
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],//cli 默认 配置默认即可
  "plugins": [
    ["import", { "libraryName": "ant-design-vue", "libraryDirectory": "es", "style": "css" }] // `style: true` 会加载 less 文件
  ]
};
```

# 34 | 如何设计一个高扩展性的路由
## 实现登录与注册

```js
component: resolve => require(["@/layouts/UserLayout"], resolve), //异步加载
component: () =>import(/* webpackChunkName: "layout" */ "../layouts/UserLayout"), //异步加载 webpack分包 注释会被webpack生成打包的名字
component: {render: h => h("router-view")}, //同步加载
// 前两个异步加载 第二个异步加载会被webpack分包

```
## 添加加载动画效果
就是页面顶端的那一条进度线
```bash
npm install nprogress
```
>- src/router/index.js
```js
router.beforeEach((to,from,next) => {
  Nprogress.start()
  next()
});
router.afterEach(()=>{
  Nprogress.done()
})
``
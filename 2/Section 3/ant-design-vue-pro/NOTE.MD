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
```

# 35 | 实现一个可动态改变的页面布局
在官网上搜索控件，然后引入代码，修改属性
https://www.antdv.com/components/radio-cn/
## src/layouts/BasicLayout.vue
自定义控件 整体的布局
collapsed
```html
<!-- a-layout-sider 侧边栏属性 :trigger="null" 不显示按钮 -->
<a-layout-sider :trigger="null" v-model="collapsed" collapsible>
<!-- 自定义侧边栏按钮 -->
<a-icon
  class="trigger"
  :type="collapsed ? 'menu-unfold' : 'menu-fold'"
  @click="collapsed = !collapsed"
></a-icon>
```

## src/components/SettingDrawer/index.vue
自定义控件 右侧抽屉
注意这里取值是 $route.query 赋值是 this.$router.push 的，而且其中的query修改的时候用的也是  ...this.$route.query,
>- 取不到值默认
 :value="$route.query.navTheme || 'dark'"
>- 修改触发事件，传入事件当前值
 @change="(e) => handleSettingChange('navTheme', e.target.value)"
>- 传值修改方法
```js
  handleSettingChange(type, value) {
      this.$router.push({
        query: {
          ...this.$route.query,
          [type]: value
        }
      })
    }
  },
```

# 36 | 如何将菜单和路由结合

## 一个概念
> - 带default-xxx的这种设计，类似于受控组件的形式，是组件库给定的一个初始值
default-selected-keys
default-open-keys

selected-keys
open-keys
## 实现一个根据父组件传值改变子组件样式的实例
> - src/layouts/BasicLayout.vue 父组件给子组件传值
  <SiderMenu :theme="navTheme" :collapsed="collapsed" />

> - src/layouts/SiderMenu.vue 子组件watch值的修改 作为props传递给孙组件
```js
  watch: {
    collapsed: function (val) {
      this.openKeys = val ? [] : this.openKeysMap[this.$route.path];
    },
  },
    props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
```
> - src/layouts/SubMenu.vue   
继承从父级传来的props
```js
export default {
  props: ["menuInfo"],
};
```
使用
```html 
:type="props.menuInfo.meta.icon"
```
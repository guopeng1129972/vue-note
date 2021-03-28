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

# 37 | 如何使用路由管理用户权限
> - src/utils/auth.js 权限校验
```js
export function getCurrentAuthority() {
  // 模拟获取当前用户
export function check(authority) {
  // 检查当前用户是否有权限
export function isLogin() {
  // 检查当前用户是否登录
```
> - src/router/index.js
```bash
npm install lodash
```
使用 notification 模块完成 通知提示框的调用
```js
import { notification } from "ant-design-vue";
 notification.error({
        message: "403",
        description: "没有权限，请联系管理员",
      });
// 配置当前路由的访问权限 authority: ["user", "admin"] 
 {
    path: "/",
    meta: { authority: ["user", "admin"] },
    component: () =>
```
> - src/views/403.vue 
创建的一个403 无权限访问的页面

# 38 | 更加精细化的权限设计（权限组件、权限指令）
> - 用了Vue实例的组件就可以用use注册组件

## src/components/Authorized.vue
使用render函数写的函数式组件
```js
  props: {
    authority: {
      type: Array,
      required: true,
    },
  },
  render(h, context) {
    // 解构 context 提取 props, scopedSlots
    const { props, scopedSlots } = context;
    // 返回当前check的结果，如果为true 则渲染 scopedSlots.default() 否则 不动
    return check(props.authority) ? scopedSlots.default() : null;
  },
};
```
## src/components/direct/auth.js
使用全局的方式注册组件（全局注册的组件在全局都可以调用）
```js
import { check } from "../../utils/auth";
// vue注册全局组件
function install(Vue, options = {}) {
  // <a-icon
  // v-auth="['admin']" 调用方式
  Vue.directive(options.name || "auth", {
    inserted(el, binding) {
      if (!check(binding.value)) {
        // 如果不是admin,就删除当前组件，在 parentNode 上找 el
        el.parentNode && el.parentNode.removeChild(el);
      }
    },
  });
}
export default { install };
```
## src/layouts/BasicLayout.vue
两种使用注册的组件的方式（都有利弊）
```html
<!-- 1.全局注册的方式 -->
<a-icon
        v-auth="['admin']"
<!-- 2.插件式注册组件的方式 -->
<Authorized :authority="['admin']">
  <SettingDrawer />
</Authorized>
```

## src/main.js
```js
import Authorized from "./components/Authorized";
import Auth from "./components/directives/auth";

// 没有用到Vue实例的注册方式
Vue.component("Authorized", Authorized);
// 用到Vue实例的注册方式
Vue.use(Auth);
```

# 39 | 如何在组件中使用ECharts、Antv等其他第三方库
```bash
cnpm install echarts
```
## 一个问题 两个方案
> - 1
如果consle提示：TypeError: Cannot read property 'init' of undefined"，
请在mounted()语句块开始加一句：var echarts = require("echarts"); 
同时去掉视频中组件中对应的import语句。这和echarts版本有关。
> - 2
import * as echarts from "echarts";
## 监听chartDom的大小变化
```bash
cnpm install resize-detector
```

## src/components/Chart.vue
> - 如何在vue中gc中删除？性能优化方式
  beforeDestroy() {
    // 在组件销毁时，移除监听，在GC中删除
    removeListener(this.$refs.chartDom, this.resize);
    this.chart.dispose();
    this.chart = null;
  },

> - 使用echarts性能优化，如何监听图表渲染位置？让其在最后渲染到正确的位置上？

```js
import * as echarts from "echarts";
import { removeListener, addListener } from "resize-detector";
import debounce from "lodash/debounce";
export default {
//  1. 创建阶段
  created() {
    this.resize = debounce(this.resize, 300);
  },
  watch: {
    // 普通监听
    option(val) {
      this.chart.setOption(val);
    },
    // 深度监听 深度监听很耗费性能，另一个方式是还是使用普通监听 在父组件中数据变化之后重新赋值
    // option: {
    //   handler(val) {
    //     this.chart.setOption(val);
    //   },
    //   deep: true,
    // },
  },
  // 2. mounted阶段添加 addListener 从resize-detector中导入的
  mounted() {
    this.renderChart();
    addListener(this.$refs.chartDom, this.resize);
  },
  // 3. 在beforeDestroy中删除
    beforeDestroy() {
    // 在组件销毁时，移除监听，在GC中删除
    removeListener(this.$refs.chartDom, this.resize);
    this.chart.dispose();
    this.chart = null;
  },

```
> - 性能优化方式 深度监听的优化方式？
 深度监听 深度监听很耗费性能，
 另一个方式是还是使用普通监听，
 在父组件中数据变化之后重新赋值
```js
    this.interval = setInterval(() => {
      // 这里访问data的chartOption数据的调用方法是 this.chartOption,而不是 this.data.chartOption
      this.chartOption.series[0].data = this.chartOption.series[0].data.map(
        () => random(100)
      );
      // 数据变化重新赋值
      this.chartOption = { ...this.chartOption };
    }, 3000);
```

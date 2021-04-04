# 32 | 使用 Vue CLI 3 快速创建项目

## 安装两个包 ant-design-vue(样式库) moment(控制时间格式的包)

```bash
npm install ant-design-vue moment
```

> - npm run serve 错误

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
>   https://cli.vuejs.org/zh/config/#vue-config-js

# 33 | 如何自定义 Webpack 和 Babel 配置

vue-cli 集成了 webpack 和 babel 的配置

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
当前最新版本，全局引入 antd 就是按需加载，因此对于 babel 的这个配置没必要，甚至还会出错

```js
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"], //cli 默认 配置默认即可
  plugins: [
    [
      "import",
      { libraryName: "ant-design-vue", libraryDirectory: "es", style: "css" },
    ], // `style: true` 会加载 less 文件
  ],
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

> - src/router/index.js

```js
router.beforeEach((to, from, next) => {
  Nprogress.start();
  next();
});
router.afterEach(() => {
  Nprogress.done();
});
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
  ></a-icon
></a-layout-sider>
```

## src/components/SettingDrawer/index.vue

自定义控件 右侧抽屉
注意这里取值是 $route.query 赋值是 this.$router.push 的，而且其中的 query 修改的时候用的也是 ...this.$route.query,

> - 取不到值默认
>   :value="$route.query.navTheme || 'dark'"
> - 修改触发事件，传入事件当前值
>   @change="(e) => handleSettingChange('navTheme', e.target.value)"
> - 传值修改方法

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

> - 带 default-xxx 的这种设计，类似于受控组件的形式，是组件库给定的一个初始值
>   default-selected-keys
>   default-open-keys

selected-keys
open-keys

## 实现一个根据父组件传值改变子组件样式的实例

> - src/layouts/BasicLayout.vue 父组件给子组件传值
>   <SiderMenu :theme="navTheme" :collapsed="collapsed" />

> - src/layouts/SiderMenu.vue 子组件 watch 值的修改 作为 props 传递给孙组件

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
>   继承从父级传来的 props

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
>   创建的一个 403 无权限访问的页面

# 38 | 更加精细化的权限设计（权限组件、权限指令）

> - 用了 Vue 实例的组件就可以用 use 注册组件

## src/components/Authorized.vue

使用 render 函数写的函数式组件

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
<a-icon v-auth="['admin']" <!-- 2.插件式注册组件的方式 -->
  <Authorized :authority="['admin']"> <SettingDrawer /> </Authorized
></a-icon>
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

# 39 | 如何在组件中使用 ECharts、Antv 等其他第三方库

```bash
cnpm install echarts
```

## 一个问题 两个方案

> - 1
>   如果 consle 提示：TypeError: Cannot read property 'init' of undefined"，
>   请在 mounted()语句块开始加一句：var echarts = require("echarts");
>   同时去掉视频中组件中对应的 import 语句。这和 echarts 版本有关。
> - 2
>   import \* as echarts from "echarts";

## 监听 chartDom 的大小变化

```bash
cnpm install resize-detector
```

## src/components/Chart.vue

> - 如何在 vue 中 gc 中删除？性能优化方式
>   beforeDestroy() {

    // 在组件销毁时，移除监听，在GC中删除
    removeListener(this.$refs.chartDom, this.resize);
    this.chart.dispose();
    this.chart = null;

},

> - 使用 echarts 性能优化，如何监听图表渲染位置？让其在最后渲染到正确的位置上？

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
>   深度监听 深度监听很耗费性能，
>   另一个方式是还是使用普通监听，
>   在父组件中数据变化之后重新赋值

```js
this.interval = setInterval(() => {
  // 这里访问data的chartOption数据的调用方法是 this.chartOption,而不是 this.data.chartOption
  this.chartOption.series[0].data = this.chartOption.series[0].data.map(() =>
    random(100)
  );
  // 数据变化重新赋值
  this.chartOption = { ...this.chartOption };
}, 3000);
```

# 40 | 如何高效地使用 Mock 数据进行开发

## vue.config.js

配置 webpack

```js
  devServer: {
    proxy: {
      // http://localhost:8080/dashboard/api/dashboard/chart?ID=12345
      "/api": {
        target: "http://localhost:8080",
        bypass: function (req, res) {
          if (req.headers.accept.indexOf("html") !== -1) {
            console.log("Skipping proxy for browser request.");
            return "/index.html";
          } else {
            // 处理url
            const name = req.path.split("/api/")[1].split("/").join("_");
            // 引入请求的数据  const mock = require(`./mock/dashboard_chart.js`);
            const mock = require(`./mock/${name}`);
            const result = mock(req.method);
            delete require.cache[require.resolve(`./mock/${name}`)];
            return res.send(result);
          }
        },
      },
    },
  },

```

## mock/dashboard_chart.js

```bash
cnpm install axios --save-dev
```

## src/views/Dashboard/Analysis.vue

```js
 methods: {
    getChartData() {
      // 用axios获取数据
      axios
        .get("api/dashboard/chart", { params: { ID: 12345 } })
        .then((response) => {
          this.chartOption = {
        //  ....
            series: [
              {
                name: "销量",
                type: "bar",
                data: response.data,
              },
            ],
          };
        });
    },
  },
```

# 41 | 如何与服务端进行交互（Axios）

## 创建 ant-design-vue-pro-server

../ant-design-vue-pro-server

## package.json

```bash
cnpm install cross-env
```

添加 serve:no-mock 来区别，是不是用 mock，不用的话从服务器获取

```js
"scripts": {
    "serve": "vue-cli-service serve",
    "serve:no-mock": "cross-env MOCK=node vue-cli-service serve",
```

## 配置 jsx 完成对提示框样式的自定义

https://github.com/vuejs/jsx/

```bash
npm install @vue/babel-preset-jsx @vue/babel-helper-vue-jsx-merge-props
```

> - Then add the preset to babel.config.js:

```js
module.exports = {
  presets: ["@vue/babel-preset-jsx"],
};
```

## src/utils/require.js

封装 axios ，使用 jsx 就是为啥要装 jsx 的 babel

```js
// 使用封装axios的方法
require({
  url: "http://localhost:3000/api/dashboard/chart",
  methods: "get",
  params: { ID: 12345 },
}).then((response) => {
```

## 创建服务端代码

../ant-design-vue-pro-server/NOTE.MD

# 42 | 创建一个普通表单

官网复制表单

## src/views/Forms/BasicForm.vue

根据官网文档添加属性 并 bind
validateStatus: 校验状态，可选 ‘success’, ‘warning’, ‘error’, ‘validating’。
help：设置校验文案。

```html
<a-form-item :validateStatus="fieldAStatus" :help="fieldAHelp">
  <!-- 动态绑定值 -->
  <a-input v-model="fieldA" placeholder="input placeholder" />
  <!-- 添加 Submit的事件handleSubmit -->
  <a-button type="primary" @click="handleSubmit">
    Submit
  </a-button></a-form-item
>
```

```js
export default {
  data() {
    return {
      fieldA: "",
      fieldAStatus: "",
      fieldAHelp: "必须大于5个字符",
    };
  },
   watch: {
    //  watch数据变化
    fieldA(val) {
      if (val.length <= 5) {
        this.fieldAStatus = "error";
        this.fieldAHelp = "必须大于5个字符";
      } else {
        this.fieldAStatus = "";
        this.fieldAHelp = "";
      }
    },
  },
   methods: {
    //  添加Submit的事件handleSubmit
    handleSubmit() {
      if (this.fieldA.length <= 5) {
        this.fieldAStatus = "error";
        this.fieldAHelp = "必须大于5个字符";
      } else {
        console.log({ fieldA: this.fieldA, fieldB: this.fieldB });
      }
    },
  },
```

# 43 | 初始数据、自动校验、动态赋值

## 表单校验的方式

> - 1.修改数据，映射表单表单数据
>   data+rule ==>form
> - 2.修改数据，映射表单表单数据 （当前数据不止表单这一处使用）
>   data+rule ==>form,other
> - 3.复制（有必要是深克隆）数据在 form 组件，submit 成功之后同步给 data
>   cloneData+data+rule ==> cloneData=>form =submit>data=cloneData

                    ==> data =>other

> - 4.antd 的实现方式
>   ant 封装的 form 组件，通过 API 去获取、修改数据
>   data+rule ==> form =submit>data ==>data=form.getFieldsValue()
>   data+rule ==> data =>other

## src/views/Forms/BasicForm.vue

```html
<a-input <!-- 使用 v-decorator 添加监听 -->
  v-decorator="[ 'fieldA', { // 使用initialValue
  的初始值，和default的形式一样，只会生效一次 initialValue: fieldA, //required:
  true 表示必填 rules: [{ required: true, min: 6, message: '必须大于5个字符' }],
  }, ]" placeholder="input placeholder" /></a-input
>
```

```js
  data() {
    // 将库中的this.$form复制到当前组件，操作数据
    this.form = this.$form.createForm(this);
    // ...
 mounted() {
    setInterval(() => {
      // 设置值用 api的 this.form.setFieldsValue({key:value})
      this.form.setFieldsValue({
        fieldA: `hello ${Math.floor(Math.random() * 100)}`,
      });
    }, 2000);
  },
methods: {
  handleSubmit() {
     //验证的API方法  this.form.validateFields（cb）
    this.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        // 将值合并到当前组件
        Object.assign(this, values);
      }
    });
  },
```

# 44 | 创建一个分步表单

## mock/form.js

创建当前数据的 mock cmd 规范

## src/store/modules/form.js

form 的 store

```js
export default {
  // namespaced 全部为小写
  namespaced: true,
  state,
```

## src/views/Forms/StepForm/Step1.vue

```html
<template>
  <div>
  <!-- :form="form" 必须表明数据来源 -->
    <a-form layout="horizontal" :form="form">
      <a-form-item
```

```js
  data() {
    // 复制form应该在什么生命周期？ 只要在使用“form前”，实例化“this后”创建即可
    this.form = this.$form.createForm(this);
```

## src/views/Forms/StepForm/Step2.vue

## src/views/Forms/StepForm/Step3.vue

# 45 | 自己封装一个支持自动校验的表单项

## src/components/ReceiverAccount.vue

```js

  data() {
    // 解构赋值 当前下 的 { type, number } 为 this.value 的  { type, number } 没有为{}
    const { type, number } = this.value || {};
    return {
      type: type || "alipay",
      number: number || "",
    };
  watch: {
    value(val) {
      Object.assign(this, val);
    },
  },
  methods: {
    handleNumberChange(e) {
      // 传值修改  change 事件 修改 ...this.value 的 number 为 e.target.value
      this.$emit("change", { ...this.value, number: e.target.value });
    },
```

## src/views/Forms/StepForm/Step1.vue

```jsx
<ReceiverAccount
  v-decorator="[
            'receiverAccount',
            {
              // 绑定值 step.receiverAccount,
              initialValue: step.receiverAccount,
              rules: [
                {
                  required: true,
                  message: '请输入收款账号',
                  //  添加 validator 
                  validator: (rule, value, callback) => {
                    if (value && value.number) {
                      callback();
                    } else {
                      callback(false);
                    }
                  },
                },
              ],
            },
          ]"
  placeholder="请输入收款账号"
/>
```

# 46 | 如何管理系统中使用的图标

## 常用方法

> - 1.css 精灵
>   优点 省地方 通过 css 设置位置 大小
>   缺点 拼接图片 而且放大会模糊
> - 2.font-icon
>   优点 方便使用 但是不能使用多色图标
> - 3.svg （封装后的最好）
>   优点 封装后 使用方便 并且可以使用多色图标

## 使用

### 获取图标

https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=2458558
选择图标 获取地址
//at.alicdn.com/t/font_2458558_9dpxy8xegfu.js

### ant 上使用

https://www.antdv.com/components/icon-cn/#%E8%87%AA%E5%AE%9A%E4%B9%89-font-%E5%9B%BE%E6%A0%87

## src/main.js

```js
// 引入
import Icon from "ant-design-vue/lib/icon";
Vue.use(Icon);
// 挂载
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2458558_35zlnhu43ze.js", // 在 iconfont.cn 上生成
});
```

## src/views/403.vue

## src/views/404.vue

使用

```jsx
<IconFont type="icon-403" style="font-size: 100px" />
```

## 按组件传入 svg

```bash
npm install vue-svg-loader --save-dev
```

### vue.config.js

```js
  chainWebpack: (config) => {
    const svgRule = config.module.rule("svg");

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear();

    // 添加要替换的 loader
    svgRule.use("vue-svg-loader").loader("vue-svg-loader");
  },
```

## 查看当前项目都安装了哪些 loader?

```bash
vue inspect > output.js
```

# 47 | 如何定制主题及动态切换主题

https://www.antdv.com/docs/vue/customize-theme-cn/#Ant-Design-Vue-%E7%9A%84%E6%A0%B7%E5%BC%8F%E5%8F%98%E9%87%8F
安装 antd 相关的插件

##

```bash
cnpm install antd-theme-webpack-plugin --save-dev
```

## src/components/SettingDrawer/index.less

配置 less

```css
@import "~ant-design-vue/lib/style/themes/default.less";
/* .setting-drawer-handle { */
position: absolute;
top: 240px;
right: 300px;
width: 48px;
height: 48px;
background: @primary-color;
color: white;
```

## vue.config.js

```js
const path = require("path");
// AntDesignThemePlugin ant配置plugin
const AntDesignThemePlugin = require("antd-theme-webpack-plugin");

const options = {
  antDir: path.join(__dirname, "./node_modules/ant-design-vue"),
  stylesDir: path.join(__dirname, "./src"),
  varFile: path.join(
    __dirname,
    "./node_modules/ant-design-vue/lib/style/themes/default.less"
  ),
  themeVariables: ["@primary-color"],
  generateOnce: false,
  lessUrl: "https://cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js",
  publicPath: "",
  customColorRegexArray: [], // An array of regex codes to match your custom color variable values so that code can identify that it's a valid color. Make sure your regex does not adds false positives.
};

const themePlugin = new AntDesignThemePlugin(options);
module.exports = {
  // 引用
  configureWebpack: {
    plugins: [
      themePlugin
    ]
  },
  loaderOptions: {
  // 向 CSS 相关的 loader 传递选项
  less: {
    modifyVars: {
      "primary-color": "#1DA57A",
    },
    javascriptEnabled: true,
  },
},
```

## public/index.html

按照插件的描述配置 index.html

```html
<script>
  window.less = {
    async: false,
    env: "production",
    javascriptEnabled: true,
    modifyVars: {
      "primary-color": "#1DA57A",
    },
  };
</script>
<script
  type="text/javascript"
  src="https://cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js"
></script>
```

# 48 | 如何做好国际化

国际化字符的库

```bash
cnpm install vue-i18n --save-dev
```

处理字符串的库

```bash
cnpm install query-string --save-dev
```

## src/App.vue

```jsx
// 引入国际化语言
    <a-config-provider :locale="locale">
      <router-view></router-view>
    </a-config-provider>
```

```js
// 引入两个自定义语言库
import enUS from "ant-design-vue/lib/locale-provider/en_US";
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import moment from "moment";
export default {
  data() {
    return {
      locale: zhCN,
    };
  },
  watch: {
    "$route.query.locale": function (val) {
      this.locale = val === "enUS" ? enUS : zhCN;
      // 同步传值给第三方库
      moment.locale(val === "enUS" ? "en" : "zh-cn");
    },
  },
};
```

> - 使用自定义语言国际化

## src/main.js

```js
//引入
import VueI18n from "vue-i18n";
import zhCN from "../src/locale/zhCN";
import enUS from "../src/locale/enUS";
import queryString from "query-string";
//挂载
Vue.use(VueI18n);
//实例化
const i18n = new VueI18n({
  locale: queryString.parse(location.search).locale || "zhCN",
  messages: {
    zhCN: { message: zhCN },
    enUS: { message: enUS },
  },
});
//初始化
new Vue({
  router,
  i18n,
```

## src/layouts/Header.vue

```jsx
// 挂载UI
    <a-dropdown>
      <a-icon type="global"></a-icon>
      <a-menu slot="overlay" :selectedKeys="[$route.query.locale || 'zhCN']">
        <a-menu-item key="zhCN" @click="localeChange"> 中文 </a-menu-item>
```

```js
  methods: {
    localeChange({ key }) {
      // 给antd传值,修改当前可以在库中修改的语言
      this.$router.push({ query: { ...this.$route.query, locale: key } });
      // 给 i18n 传值应用当前自定义的语言文件
      this.$i18n.locale = key;
    },
  },
};
```

## src/locale/enUS.js

两个自定义语言库

## src/views/Dashboard/Analysis.vue

```jsx
// 调用自定义的国家化语言库
    {{ $t("message")["app.dashboard.analysis.timeLable"] }}:
    <a-date-picker></a-date-picker>
```

# 49 | 如何高效地构建打包发布

## 如何优化打包构建？

> - 1.babel.config.js 中按需加载
>   babel.config.js
> - 2.路由懒加载 和拆包
>   src/router/index.js

```js
  import(/* webpackChunkName: "layout" */ "../layouts/UserLayout.vue"),
```

> - 3.  按需引入 引入时，引入到具体的包名，而不是整个包都引入
>       src/components/Chart.vue

```js
import debounce from "lodash/debounce";
```

## 查看当前项目 包的分析情况

```bash
npm run build -- --report
```

## 根据当前包的占用情况，来优化

按需加载 操作方式的 issues
https://github.com/vueComponent/ant-design-vue/issues/325

## vue.config.js

配置只打需要的包的方法

## src/icons.js

按照 GitHub 上的配置 icons.js 主要是需要用的一些 icon

## src/App.vue

按需引入需要的包

## src/components/Chart.vue

如果不全部引入 会出错

# 50 | 如何构建可交互的组件文档

> - 1.  自己写一个 loader 处理，比较高端
> - 2.  当做静态文件，单独处理
>       将代码打出来，这样比较容易使用

```bash
# 用于实现静态资源内联 raw-loader 将代码打出来
cnpm install raw-loader --save-dev
# 用于代码高亮 vue 封装了highlightjs的库
cnpm install vue-highlightjs --save-dev
```

## src/main.js

按需引入 挂载 使用的样式按照 github 的样式

```js
import VueHighlightjs from "vue-highlightjs";
import "highlight.js/styles/github.css";
Vue.use(VueHighlightjs);
```

## src/views/Dashboard/Analysis.vue

按照语法高亮显示 格式为 html

```jsx
<pre v-highlightjs="ChartCode">
  <code class="html"></code>
</pre>
```

引入需要打出来的代码的子组件一份，ChartCode 挂载到 data 上

```js
// !!raw-loader!../../components/Chart 按照静态文件处理
import ChartCode from "!!raw-loader!../../components/Chart";
export default {
  components: { Chart },
  data() {
    return {
      ChartCode,
    };
  },
```

# 51 | 如何做好组件的单元测试

```bash
npm run test:unit --watch
```

## jest 快速入门及实践教程

https://zhuanlan.zhihu.com/p/282835230

### 3.3 断言函数

测试即运行结果是否与我们预期结果一致 断言函数用来验证结果是否正确

```js
exspect(运行结果).toBe(期望的结果);
//常见断言方法
expect({ a: 1 }).toBe({ a: 1 }); //判断两个对象是否相等
expect(1).not.toBe(2); //判断不等
expect({ a: 1, foo: { b: 2 } }).toEqual({ a: 1, foo: { b: 2 } });
expect(n).toBeNull(); //判断是否为null
expect(n).toBeUndefined(); //判断是否为undefined
expect(n).toBeDefined(); //判断结果与toBeUndefined相反
expect(n).toBeTruthy(); //判断结果为true
expect(n).toBeFalsy(); //判断结果为false
expect(value).toBeGreaterThan(3); //大于3
expect(value).toBeGreaterThanOrEqual(3.5); //大于等于3.5
expect(value).toBeLessThan(5); //小于5
expect(value).toBeLessThanOrEqual(4.5); //小于等于4.5
expect(value).toBeCloseTo(0.3); // 浮点数判断相等
expect("Christoph").toMatch(/stop/); //正则表达式判断
expect(["one", "two"]).toContain("one"); //不解释
```

### 3.5 常见命令

```json
{
  "nocache": "jest --no-cache", //清除缓存
  "watch": "jest --watchAll", //实时监听
  "coverage": "jest --coverage", //生成覆盖测试文档
  "verbose": "npx jest --verbose" //显示测试描述
}
```

## 四、基础测试

### 4.1 对象等值测试

```js
describe("对象测试", () => {
  it("是否同一个对象", () => {
    const foo = { a: 1 };
    expect(foo).toBe(foo);
  });

  it("对象值是否相等", () => {
    expect({ a: 1, foo: { b: 2 } }).toEqual({ a: 1, foo: { b: 2 } });
  });

  test("对象赋值", () => {
    const data = { one: 1 };
    data["two"] = 2;
    expect(data).toEqual({ one: 1, two: 2 });
  });
});
```

### 4.2 异步测试

异步测试脚本执行完，单元测试就结束了，如果需要延时才能断言的结果，单元测试函数需要设置 done 形参，在定时回调函数中调用，显示的通过单元测试已完成。

```js
describe("异步操作测试", () => {
  function foo(callback) {
    console.log("foo...");
    setTimeout(() => {
      callback && callback();
    }, 1000);
  }
  it("异步测试", (done) => {
    function bar() {
      console.log("bar..");
      done();
    }
    foo(bar);
  });
});
```

### 4.3 定时器测试（异步测试）及断言

基于 jest 提供的两个方法 jest.useFakeTimers 和 jest.runAllTimers 可以更优雅的对延时功能的测试。

```js
describe("定时器相关测试", () => {
  // 开启定时函数模拟
  jest.useFakeTimers();

  function foo(callback) {
    console.log("foo...");
    setTimeout(() => {
      callback && callback();
    }, 1000);
  }
  it("断言异步测试", () => {
    //创建mock函数，用于断言函数被执行或是执行次数的判断
    const callback = jest.fn();
    foo(callback);
    expect(callback).not.toBeCalled();
    //快进，使所有定时器回调
    jest.runAllTimers();
    expect(callback).toBeCalled();
  });
});
```

五、Vue 测试
5.1 安装 unit-jest
mount 和 shallowMount 的区别

- shallowMount 只挂载指定组件，不挂载子组件
- mount 挂载所有组件
  Vue 的渲染机制 默认情况下 Vue 会异步地批量执行更新 (在下一轮 tick)，
  以避免不必要的 DOM 重绘或者是观察者计算

## src/utils/auth.spec.js

练习写了一个 auth 的测试内容

## jest.config.js

添加对 jest 的配置

```js
module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  testMatch: ["**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"],
  testURL: "http://localhost/",
  collectCoverage: process.env.COVERAGE === " true",
  collectCoverageFrom: ["srx/**/*.{js,vue}", "!**/node_modules/**"],
};
```

## tests/functions.spec.js
## src/function.js

练习内容



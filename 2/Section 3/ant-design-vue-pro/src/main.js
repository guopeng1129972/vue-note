import Vue from "vue";
import VueI18n from "vue-i18n";
import Antd from "ant-design-vue";
import Icon from "ant-design-vue/lib/icon";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "ant-design-vue/dist/antd.less";
// import "ant-design-vue/lib/button/style"
import Authorized from "./components/Authorized";
import Auth from "./components/direct/auth";
import zhCN from "../src/locale/zhCN";
import enUS from "../src/locale/enUS";
import queryString from "query-string";
import VueHighlightjs from "vue-highlightjs";
import "highlight.js/styles/github.css";
Vue.config.productionTip = false;
// 全局注册 Antd
Vue.use(Antd);
Vue.use(Icon);
Vue.use(Auth);
Vue.use(VueI18n);
Vue.use(VueHighlightjs);
Vue.component("Authorized", Authorized);

const i18n = new VueI18n({
  // 解析当前的 url
  locale: queryString.parse(location.search).locale || "zhCN",
  messages: {
    zhCN: { message: zhCN },
    enUS: { message: enUS },
  },
});

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2458558_7itrbjh30kn.js", // 在 iconfont.cn 上生成
});

Vue.component("IconFont", IconFont);
new Vue({
  router,
  i18n,
  store,
  VueHighlightjs,
  render: (h) => h(App),
}).$mount("#app");

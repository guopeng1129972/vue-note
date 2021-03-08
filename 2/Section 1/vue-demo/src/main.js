import Vue from 'vue'
import App from './App.vue'
import router from './router.js'

import antd from "ant-design-vue";
import ref from "vue-ref";
import store from "./store";
import "ant-design-vue/dist/antd.css";

Vue.config.productionTip = false;

Vue.use(antd);
Vue.use(ref,{name:"ant-ref"});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

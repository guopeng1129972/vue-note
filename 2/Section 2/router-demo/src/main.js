import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './routes'
Vue.config.productionTip = false
Vue.use(VueRouter);

const router=new VueRouter({
  // mode:history,
  // 加#就当成页面锚点来存储url history模式就要设置服务端的路由允许 不然就当成访问资源 可能造成404
  //mode：hash 默认为hash 就是加#的形式
  routes,
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

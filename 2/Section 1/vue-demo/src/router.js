import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router);
export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: Home
  },
  {path: '/1.7',
    name: '指令',
    component: ()=>import('./views/1.7')
  },
  {path: '/1.8',
  name: 'provie/inject',
  component: ()=>import('./views/1.8')
}
 ]
})
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import First from '@/components/First'
import A from '@/components/A'
import B from '@/components/B'
import A1 from '@/components/A1'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'First',
      component: First
    },
    {
      path: '/a',
      name: 'A',
      component: A,
      children: [
        { path: '/A1', component: A1 }
      ]
    },
    {
      path: '/b',
      name: 'B',
      component: B
    }
  ]
})

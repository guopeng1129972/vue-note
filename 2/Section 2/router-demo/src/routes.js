import RouterDemo from './components/RouterDemo.vue'
import RouterChildrenDemo from './components/RouterChildrenDemo.vue'

const routes = [
  { path: '/foo', component: RouterDemo, name: '1' },
  { path: '/bar', component: RouterDemo, name: '2' },
  {
    path: '/user/:id',
    component: RouterDemo,
    name: '3',
    props: true,
    children: [
      {
        path: 'profile',
        component: RouterChildrenDemo,
        name: '3-1'
      },
      {
        path: 'props',
        component: RouterChildrenDemo,
        name: '3-2'
      }
    ]
  },
  // 重定向 /a 到 /bar
  { path: '/a', redirect: '/bar' },
  { path: '*', component: RouterDemo, name: '404' }
]

export default routes
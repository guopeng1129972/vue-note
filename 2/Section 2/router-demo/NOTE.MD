# 第二章：生态篇 (13讲)


# 22 | Vue Router的使用场景
## 传统单页面（spa）开发模式
- www.xxx.com ->index.html
- www.xxx.com/about =>index.html
- www.xxx.com/xxx =>index.html
## Vue Router解决的问题
- 监听URL的变化，并在变化前后执行相应的逻辑
- 不同URL对应不同的组件
- 提供多种方式改变URL的API（URL的改变不能导致浏览器刷新）
### 使用方式
- 提供一个路由配置表，不同URL对应不同组件的配置
- 初始化路由实例 new VueRouter()
- 挂载到Vue实例上
- 提供一个路由占位，用来挂载URL匹配到的组件

- 配置路由列表 main.js
```js
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter);
const router=new VueRouter({
  // mode:history,
  // 加#就当成页面锚点来存储url history模式就要设置服务端的路由允许 不然就当成访问资源 可能造成404
  //mode：hash 默认为hash 就是加#的形式
  routes,
})
new Vue({
  router,
```
- App.vue 
```html
<router-view></router-view>
```
<router-view></router-view> 写在什么地方 routes.js中的
{path:'/foo',component:RouterDemo,name:'1'} 就渲染到什么地方


# 23 | 选择何种模式的路由及底层原理

## 路由类型
- Hash模式 不好看，无法使用锚点定位
- History 模式 需要后端配合，IE9不兼容（可以使用强制刷新处理）
  - 就是在IE9的模式下，不采用AJAX的方式去获取，而是通过强制刷新页面的方式
## 路由底层逻辑
![路由底层逻辑](./img/1.jpg)
>router-link,$router.push,a href,浏览器刷新、后退,手动更改URL
触发 updateRoute
触发响应式数据 Vue.util.defineReactive 把_route的数据变成响应式的
执行router-view 根据URL匹配想要渲染的组件
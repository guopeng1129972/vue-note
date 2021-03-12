### Vuex是通过什么方式提供响应式数据的？

# 19 | 如何在Vue中使用Vuex

>Vuex原理 也是一个单向的一个数据流：
Vuex 提供数据 `State` 来驱动我们的视图（`Vue Components`）的渲染（`Render`），
然后再通过视图派发（ `Dispatch` ）我们的 `Action` ，
我们在 `Action` 中可以进一步的进行一些异步的操作，譬如我们通过 `Ajax` 
去后端去获取一些我们想要的一些后端的一些数据。
然后我们通过 `commit` 的形式将 `Action` 提交给我们的 `Mutations` ，
最后由 `Mutations` 处理完毕后，再来最终更改我们的 `State`中的数据，如此循环。

## 如何应用？
- 安装
```bash
npm install vuex
```
- main.js 中引入
```js
import Vuex from 'vuex'
import App from './App.vue'
// use 让Vuex可以访问Vue
Vue.use(Vuex);
```
- `mutations`
commit increment 到 Vuex.Store.mutations 
- `actions` 
dispatch increment 到 Vuex.Store.actions 
- getters 起到一个缓存的作用
直接调用，与获取`state`一样 
this.$store.getters.doubleCount

## 问题： $store.是如何挂载到实例this上去的？


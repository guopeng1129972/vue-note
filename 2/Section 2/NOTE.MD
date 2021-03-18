@@ -1,46 +0,0 @@
# 第二章：生态篇 (13讲)

# 18 | 为什么需要Vuex
## 什么是Vuex？
vue的状态管理机制
>Vuex原理 也是一个单向的一个数据流：
Vuex 提供数据 `State` 来驱动我们的视图（`Vue Components`）的渲染（`Render`），
然后再通过视图派发（ `Dispatch` ）我们的 `Action` ，
我们在 `Action` 中可以进一步的进行一些异步的操作，譬如我们通过 `Ajax` 
去后端去获取一些我们想要的一些后端的一些数据。
然后我们通过 `commit` 的形式将 `Action` 提交给我们的 `Mutations` ，
最后由 `Mutations` 处理完毕后，再来最终更改我们的 `State`中的数据，如此循环。

![Vuex运行机制](/img/2.jpg)
## 为什么需要状态管理？
项目中在很多地方需要一份数据的时候，需要同步更新
## vue有哪些状态管理机制可以实现？
- 在共同的父组件上提供公用数据
层层传递，这样不行的，项目非常脆弱
- provide/inject 
在顶层 provide 在子组件inject，这样避免了层层传递,不是动态绑定
- Vuex 比较全面
  - 动态注册响应式数据
  - 命名空间管理数据
  - 通过插件记录数据的修改 方便调试
![Vuex运行机制](/img/1.jpg)
## 问题
### Vuex是通过什么方式提供响应式数据的？


# 20 | Vuex核心概念及底层原理

* [Vuex核心概念及底层原理](/vuex-demo2/NOTE.MD)
# 21 | Vuex最佳实践
## 核心概念
- State
this.$store.state.xxx  mapState取值
- Getters
this.$store.getters.xxx mapGetters取值
- Mutation
this.$store.commit("xxx") mapMutations赋值
- Actions
this.$store.dispatch("xxx") mapActions赋值
- Module
## 使用常量代替Mutation事件类型
![使用常量代替Mutation事件类型](/img/3.jpg)

# 26 | UI组件库对比：Element UI、Ant Design Vue、iView
![常用的组件库](/img/4.jpg)
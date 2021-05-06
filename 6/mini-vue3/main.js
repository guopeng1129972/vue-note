// @vue/reactivity
// mini-vue

// import {
//   ref,
//   reactive,
//   effect,
// } from "./node_modules/@vue/reactivity/dist/reactivity.esm-browser.prod.js";

// effect
// vue3 -> wactch computed watch ->通过effect实现的

// const a = ref(10);
// console.log(a);
// let b;
// effect(() => {
//   b = a.value + 10;
//   console.log(b);
// });

// // update a

// a.value = 20;
// // console 20 30

// 2. 使用视图实现

// const a = ref(10);
// window.a = a;
// const b = () => {
//   document.querySelector("#app").textContent = "";
//   const div = document.createElement("div");
//   div.textContent = a.value;
//   document.querySelector("#app").append(div);
// };

// effect(() => {
//   b();
// });

// console a.value++  回显11

// 3. 类似于vue的实现方式
// const App = {
//   //template->render
//   render(context) {
//     // view
//     //view 1.视图 写死的 -》dom
//     // ！dom
//     // 1.公共的逻辑 比如都调用了effect 都调用了render，
//     // 但是这两个方法是个组件都会调用的，需要抽离
//     // 2.如何只更新需要更新的view呢？
//     // 到那个需要渲染的dom不是单一的时候，却会更新所有元素，比如p1 p2的例子，不合理
//     // 2.1 实现-vdom
//     // 2.2 实现-diff算法
//     effect(() => {
//       document.querySelector("#app").textContent = "";
//       const div = document.createElement("div");
//       div.textContent = context.state.count;
//       // p1 p2 的例子start
//       const p = document.createElement("p");
//       p.textContent = "p1";
//       div.append(p);
//       const p2 = document.createElement("p");
//       p2.textContent = "p2 -------" + context.state.count;
//       div.append(p2);
//       // p1 p2 的例子end
//       document.querySelector("#app").append(div);
//     });
//   },
//   setup() {
//     const state = reactive({
//       count: 1,
//     });
//     window.state = state;
//     return {
//       state,
//     };
//   },
// };
// App.render(App.setup());

// 4.按照vue3的实现方法

import { createApp } from "./core/index.js";

import App from "./app.js";
createApp(App).mount(document.querySelector("#app"));

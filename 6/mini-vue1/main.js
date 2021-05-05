// @vue/reactivity
// mini-vue

import {
  ref,
  reactive,
  effect,
} from "./node_modules/@vue/reactivity/dist/reactivity.esm-browser.prod.js";

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

const a = ref(10);
window.a = a;
const b = () => {
  document.querySelector("#app").textContent = "";
  const div = document.createElement("div");
  div.textContent = a.value;
  document.querySelector("#app").append(div);
};

effect(() => {
  b();
});

// console a.value++  回显11

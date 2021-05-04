// @vue/reactivity
// mini-vue

import {
  ref,
  reactive,
  effect,
} from "./node_modules/@vue/reactivity/dist/reactivity.esm-browser.prod.js";

// effect
// vue3 -> wactch computed watch ->通过effect实现的

const a = ref(10);
console.log(a);
let b;
effect(() => {
  b = a.value + 10;
  console.log(b);
});

// update a

a.value = 20;
// console 20 30


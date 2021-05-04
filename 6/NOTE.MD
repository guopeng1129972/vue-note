# vue3 原理解析

## 安装环境

```bash
yarn add @vue/reactivity
```

# vue 3 重点核心 收集依赖和触发依赖

## mini-vue/main.js
0. 定义 const a = ref(10);
1. 函数执行 effect 函数 ，effect函数a.value触发get方法，这个时候会将这个fn收集进a下面
2. update，a.value=20，触发set方法，执行a收集的所有依赖，触发fn,输出b
```js
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
```

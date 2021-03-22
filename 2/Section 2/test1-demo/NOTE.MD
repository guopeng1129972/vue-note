@@ -1,46 +0,0 @@
# 第二章：生态篇 (13讲)


# 28 | 单元测试的重要性及其使用
## 重要性
>- 保证研发质量
>- 提高项目的稳定性
>- 提高开发速度
## 使用方式(用的jest)
>- jest 或mocha 
>- @vue/test-utils
>- sinon
  - 测试多次触发 引入的一个库
### jest.config.js
```js
module.exports = {
  preset: '@vue/cli-plugin-unit-jest', //cli默认
  moduleFileExtensions: ["js", "jsx", "json", "vue"], //指定测试的文件类型
  transform: {
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.jsx?$": "babel-jest"
  }, //类似于webpack的loader 什么文件让什么包处理
  transformIgnorePatterns: ["/node_modules/"],//忽略测试的文件
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },// @ <==> <rootDir>/src/$1 指定路径 类似于alace
  snapshotSerializers: ["jest-serializer-vue"],//快照格式化
  testMatch: [
    "**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"
  ],//对那些文件进行测试
  testURL: "http://localhost/" //测试地址
};
```
### tests/unit/example.spec.js
- 渲染
shallowMount 浅渲染，就是只渲染当前组件（子组件不管）
Mount 渲染，就是也渲染子组件
- 断言
 expect(wrapper.text()).toMatch(msg);

### src/components/Counter.vue
```html
<button @click="count++">count++</button>
```
### tests/unit/Counter.spec.js
```js
import { mount } from '@vue/test-utils';

    const wrapper = mount(Counter);
    expect(wrapper.html()).toMatchSnapshot();
```
### tests/unit/__snapshots__/Counter.spec.js.snap
在 jest.config.js的 snapshotSerializers 配置会生成这项配置 内容就是渲染的html
```js
snapshotSerializers: ["jest-serializer-vue"],//快照格式化
```
### 需要测试多次点击的事件时候，使用sinon
```bash
npm install sinon
```


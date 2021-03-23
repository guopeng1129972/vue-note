github watch=>relace 
# 31 | Ant Design Pro介绍
项目地址：
https://github.com/vueComponent/ant-design-vue-pro
上库方法
https://segmentfault.com/a/1190000000736629
>- 项目为响应式
## fork guopeng1129972/ant-design-vue-pro
### Fork 项目
```bash
git clone https://github.com/guopeng1129972/ant-design-vue-pro.git
# 获取原项目代码
cd ant-design-vue-pro
git remote add upstream https://github.com/guopeng1129972/ant-design-vue-pro.git
# 获取 ant-design-vue-pro 最新源码
git pull upstream master
```
### 创建分支
>- 好了, 现在可以开始贡献我们的代码了
按照国际惯例, 我们一般不在 master 上提交新代码, 而需要为新增的功能或者fixbug建立新分支, 再合并到 master 上, 使用以下代码创建分支
```bash
git checkout -b branch1
```
>- 现在我们可以在分支上更改代码了
假设我们已经添加了一些代码, 提交到代码库
```bash
git commit -a -m "new commit"
```

# 32 | 使用Vue CLI 3快速创建项目
## 安装配置
```bash
? Please pick a preset: Manually select features
? Check the features needed for your project: Choose Vue version, Babel, Router, Vuex, CSS Pre-processors, Linter, Unit
? Choose a version of Vue.js that you want to start the project with 2.x
? Use history mode for router? (Requires proper server setup for index fallback in production) Yes
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Less
? Pick a linter / formatter config: Prettier
? Pick additional lint features: Lint on save
? Pick a unit testing solution: Jest
? Where do you prefer placing config for Babel, ESLint, etc.? In dedicated config files
? Save this as a preset for future projects? Yes
? Save preset as: ant-design-vue-pro
```
## 2/Section 3/ant-design-vue-pro
```bash
npm install ant-design-vue moment
```

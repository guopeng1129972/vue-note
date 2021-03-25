<template>
  <div id="app">
    <a-button>按钮</a-button>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/user/login">login</router-link> |
      <router-link to="/user/register">register</router-link> |
      <router-link to="/dashboard">dashboard</router-link> |
      <router-link to="/dashboard/analysis">dashboard/analysis</router-link> |
      <router-link to="/form">form</router-link> |
      <router-link to="/form/basic-form">form/basic-form</router-link> |
      <router-link to="/form/step-form">form/step-form</router-link> |
      <router-link to="/form/step-form/info">form/step-form/info</router-link> |
      <router-link to="/form/step-form/confirm">form/step-form/confirm</router-link> |
      <router-link to="/form/step-form/result">form/step-form/result</router-link> |
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="less">
</style>

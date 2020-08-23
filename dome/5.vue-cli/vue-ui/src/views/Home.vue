<template>
  <div>
    <router-view></router-view>
    <ul>
      <li><router-link to="{name:'List'}">新闻列表</router-link></li>
      <li><router-link to="{name:'User'}">用户中心</router-link></li>
    </ul>
  </div>
</template>

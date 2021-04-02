<template>
  <div class="header">
    <a-dropdown>
      <a-icon type="global"></a-icon>
      <a-menu slot="overlay" :selectedKeys="[$route.query.locale || 'zhCN']">
        <a-menu-item key="zhCN" @click="localeChange"> 中文 </a-menu-item>
        <a-menu-item key="enUS" @click="localeChange"> english </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
export default {
  methods: {
    localeChange({ key }) {
      this.$router.push({ query: { ...this.$route.query, locale: key } });
      this.$i18n.locale = key;
    },
  },
};
</script>

<style scoped>
.header {
  float: right;
  margin-right: 30px;
  cursor: pointer;
}
</style>

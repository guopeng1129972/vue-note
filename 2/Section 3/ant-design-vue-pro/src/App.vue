<template>
  <div id="app">
    <a-config-provider :locale="locale">
      <router-view></router-view>
    </a-config-provider>
  </div>
</template>
<script>
import enUS from "ant-design-vue/lib/locale-provider/en_US";
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
export default {
  data() {
    return {
      locale: zhCN,
    };
  },
  watch: {
    "$route.query.locale": function (val) {
      this.locale = val === "enUS" ? enUS : zhCN;
      moment.locale(val === "enUS" ? "en" : "zh-cn");
    },
  },
};
</script>
<style lang="less"></style>

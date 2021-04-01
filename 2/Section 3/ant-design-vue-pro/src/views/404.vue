<template>
  <div class="iconFontClass">
    <IconFont class="IconFont" type="icon-404" />
    <Logo />
  </div>
</template>
<script>
import Logo from "../assets/logo.svg";
export default {
  components: { Logo },
  data() {
    return {};
  },
};
</script>

<style>
.iconFontClass {
  text-align: center;
}
.IconFont {
  font-size: 400px;
}
</style>

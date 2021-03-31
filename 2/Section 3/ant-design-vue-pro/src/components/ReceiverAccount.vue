<template>
  <div>
    <a-input-group compact>
      <a-select v-model="type" style="width: 100px" @change="handleTypeChange">
        <a-select-option value="alipay"> 支付宝 </a-select-option>
        <a-select-option value="bank"> 银行 </a-select-option>
      </a-select>
      <a-input
        style="width: 50%"
        v-model="number"
        @change="handleNumberChange"
      />
    </a-input-group>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
    },
  },
  data() {
    // 解构赋值 当前下 的 { type, number } 为 this.value 的  { type, number } 没有为{}
    const { type, number } = this.value || {};
    return {
      type: type || "alipay",
      number: number || "",
    };
  },
  watch: {
    value(val) {
      Object.assign(this, val);
    },
  },
  methods: {
    handleTypeChange(val) {
      this.$emit("change", { ...this.value, type: val });
    },
    handleNumberChange(e) {
      // 传值修改  change 事件 修改 ...this.value 的 number 为 e.target.value
      this.$emit("change", { ...this.value, number: e.target.value });
    },
  },
};
</script>

<style></style>

<template>
  <div ref="chartDom"></div>
</template>

<script>
import * as echarts from "echarts";
import { removeListener, addListener } from "resize-detector";
import debounce from "lodash/debounce";
export default {
  props: {
    option: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    console.log("created");
    this.resize = debounce(this.resize, 300);
  },
  watch: {
    // 普通监听
    option(val) {
      this.chart.setOption(val);
    },
    // 深度监听 深度监听很耗费性能，另一个方式是还是使用普通监听 在父组件中数据变化之后重新赋值
    // option: {
    //   handler(val) {
    //     this.chart.setOption(val);
    //   },
    //   deep: true,
    // },
  },
  mounted() {
    this.renderChart();
    addListener(this.$refs.chartDom, this.resize);
  },
  beforeDestroy() {
    // 在组件销毁时，移除监听，在GC中删除
    removeListener(this.$refs.chartDom, this.resize);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    resize() {
      console.log("resize");
      this.chart.resize();
    },
    renderChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(this.$refs.chartDom);
      // 使用刚指定的配置项和数据显示图表。
      this.chart.setOption(this.option);
    },
  },
};
</script>

<style></style>

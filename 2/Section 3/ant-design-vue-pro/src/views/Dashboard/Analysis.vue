<template>
  <div><Chart :option="chartOption" style="height: 400px" /></div>
</template>

<script>
import random from "lodash/random";
import Chart from "../../components/Chart";
export default {
  components: { Chart },
  data() {
    return {
      chartOption: {
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        legend: {
          data: ["销量"],
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      },
    };
  },
  mounted() {
    this.interval = setInterval(() => {
      // 这里访问data的chartOption数据的调用方法是 this.chartOption,而不是 this.data.chartOption
      this.chartOption.series[0].data = this.chartOption.series[0].data.map(
        () => random(100)
      );
      // 数据变化重新赋值
      this.chartOption = { ...this.chartOption };
    }, 3000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>

<style></style>

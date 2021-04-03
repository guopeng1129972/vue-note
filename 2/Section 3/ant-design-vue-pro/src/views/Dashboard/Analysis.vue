<template>
  <div>
    {{ $t("message")["app.dashboard.analysis.timeLable"] }}:
    <a-date-picker></a-date-picker>
    <Chart :option="chartOption" style="height: 400px" />
    <pre v-highlightjs="ChartCode"><code class="html"></code></pre>
  </div>
</template>

<script>
import request from "../../utils/request";
import Chart from "../../components/Chart";
import ChartCode from "!!raw-loader!../../components/Chart";
export default {
  components: { Chart },
  data() {
    return {
      chartOption: {},
      ChartCode,
    };
  },
  mounted() {
    this.getChartData();
    this.interval = setInterval(() => {
      this.getChartData();
    }, 3000);
  },
  methods: {
    getChartData() {
      // 使用封装axios的方法
      request({
        url: "http://localhost:3000/api/dashboard/chart",
        methods: "get",
        params: { ID: 12345 },
      }).then((response) => {
        this.chartOption = {
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
              data: response.data,
            },
          ],
        };
      });
    },
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>

<style></style>

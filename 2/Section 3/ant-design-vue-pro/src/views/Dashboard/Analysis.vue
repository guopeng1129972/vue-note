<template>
  <div><Chart :option="chartOption" style="height: 400px" /></div>
</template>

<script>
import Chart from "../../components/Chart";
import axios from "axios";
export default {
  components: { Chart },
  data() {
    return {
      chartOption: {},
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
      // 用axios获取数据
      axios
        .get("api/dashboard/chart", { params: { ID: 12345 } })
        .then((response) => {
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

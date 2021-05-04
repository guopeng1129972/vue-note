// AntDesignThemePlugin ant配置plugin
// const AntDesignThemePlugin = require("antd-theme-webpack-plugin");

module.exports = {
  css: {
    loaderOptions: {
      // 向 CSS 相关的 loader 传递选项
      less: {
        modifyVars: {
          "primary-color": "#1DA57A",
        },
        javascriptEnabled: true,
      },
    },
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule("svg");

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear();

    // 添加要替换的 loader
    svgRule.use("vue-svg-loader").loader("vue-svg-loader");
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        bypass: function (req, res) {
          // console.log('process.env.MOCK',process.env.MOCK)
          if (req.headers.accept.indexOf("html") !== -1) {
            console.log("Skipping proxy for browser request.");
            return "/index.html";
          } else if (process.env.MOCK !== "none") {
            // 处理url
            console.log("req.path",req.path);
            const name = req.path.split("/api/")[1].split("/").join("_");
            // 引入请求的数据  const mock = require(`./mock/dashboard_chart.js`);
            const mock = require(`./mock/${name}`);
            const result = mock(req.method);
            delete require.cache[require.resolve(`./mock/${name}`)];
            return res.send(result);
          }
        },
      },
    },
  },
};

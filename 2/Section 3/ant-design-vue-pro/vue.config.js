module.exports = {
  css: {
    loaderOptions: {
      // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true,
      },
    },
  },
  devServer: {
    proxy: {
      // http://localhost:8080/dashboard/api/dashboard/chart?ID=12345
      "/api": {
        target: "http://localhost:8080",
        bypass: function (req, res) {
          if (req.headers.accept.indexOf("html") !== -1) {
            console.log("Skipping proxy for browser request.");
            return "/index.html";
          } else {
            // 处理url
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

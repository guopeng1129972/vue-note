function chart(method) {
  let res = null;
  switch (method) {
    case "GET":
      res = [1000, 40, 78, 10, 30, 48];
      break;
    // case "POST":
    //   res = [20, 40, 78, 10, 30, 48];
    //   break;
    default:
      res = null;
  }
  return res;
}
// node 环境下运行，cmd规范
module.exports = chart;

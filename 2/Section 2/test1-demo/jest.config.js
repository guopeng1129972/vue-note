module.exports = {
  preset: '@vue/cli-plugin-unit-jest', //cli默认
  moduleFileExtensions: ["js", "jsx", "json", "vue"], //指定测试的文件类型
  transform: {
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.jsx?$": "babel-jest"
  }, //类似于webpack的loader 什么文件让什么包处理
  transformIgnorePatterns: ["/node_modules/"],//忽略测试的文件
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },// @ <==> <rootDir>/src/$1 指定路径 类似于alace
  snapshotSerializers: ["jest-serializer-vue"],//快照格式化
  testMatch: [
    "**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"
  ],//对那些文件进行测试
  testURL: "http://localhost/" //测试地址
};

module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  testMatch: ["**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"],
  testURL: "http://localhost/",
  collectCoverage: process.env.COVERAGE === " true",
  collectCoverageFrom: ["srx/**/*.{js,vue}", "!**/node_modules/**"],
};

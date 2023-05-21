const scanner = require("sonarqube-scanner");
scanner(
  {
    serverUrl: "http://localhost:9000",
    token: "sqp_8702c1b760c1861fd1b68d3691c96fedef13b836",
    password: "tecsus",
    options: {
      "sonar.sources": "./src",
    },
  },
  () => process.exit()
);
const scanner = require("sonarqube-scanner");
// sqp_c67769cebb2b311676cc646d92bc6385dbe9fd45

scanner(
  {
    serverUrl: "http://localhost:9000",
    //token: "sqp_154f75766d1957e4e6103215aa3c547cf489087b",
    login: "admin",
    password: "tecsus",
    options: {
      "sonar.sources": "./src",
    },
  },
  () => process.exit()
);
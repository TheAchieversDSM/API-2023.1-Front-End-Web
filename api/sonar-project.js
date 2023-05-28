const sonarqubeScanner = require("sonarqube-scanner");

sonarqubeScanner(
    {
        serverUrl: "http://localhost:9000",
        options: {
            "sonar.sources": "./src",
            "sonar.tests": "./src",
            "sonar.inclusions": "./src/**/*.ts,src/**/*.tsx",
            "sonar.test.inclusions": "./src/cypress/**/*.cy.ts",
            "sonar.login": "admin",
            "sonar.password": "tecsus",
            "sonar.javascript.lcov.reportPaths": "./coverage/lcov.info"
        },
    },
    () => {
        console.log("Error Occurred while scanning");
    }
);
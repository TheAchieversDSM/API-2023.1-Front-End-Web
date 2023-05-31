const sonarqubeScanner = require("sonarqube-scanner");


sonarqubeScanner(
    {
        serverUrl: "https://sonarcloud.io",
        options: {
            "sonar.sources": "./src",
            "sonar.tests": "./src",
            "sonar.inclusions": "./src/**/*.ts,src/**/*.tsx",
            "sonar.test.inclusions": "./src/cypress/**/*.cy.ts",
            "sonar.key": "api-2023-1-front-end            ",
            "sonar.login": process.env.SONAR_LOGIN,
            "sonar.javascript.lcov.reportPaths": "./coverage/lcov.info"
        },
    },
    () => {
        console.log("Error Occurred while scanning");
    }
);
const sonarqubeScanner = require("sonarqube-scanner");


sonarqubeScanner(
    {
        serverUrl: "https://sonarcloud.io",
        token: process.env.SONAR_LOGIN,
        options: {
            "sonar.projectName": "API-2023.1-Front-End-Web",
            "sonar.sources": "./src",
            "sonar.tests": "./src",
            "sonar.inclusions": "./src/**/*.ts,src/**/*.tsx",
            "sonar.test.inclusions": "./src/cypress/**/*.cy.ts",
            "sonar.key": "achievers",
            "sonar.login": process.env.SONAR_LOGIN,
            "sonar.javascript.lcov.reportPaths": "./coverage/lcov.info",
            "sonar.organization": "achievers",
            "sonar.branch": "main"
        },
    },
    () => {
        console.log("Error Occurred while scanning");
    }
);
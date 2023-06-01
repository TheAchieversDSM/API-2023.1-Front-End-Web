const sonarqubeScanner = require("sonarqube-scanner");


sonarqubeScanner(
    {
        serverUrl: "https://sonarcloud.io",
        token: "f33a2a9da5a206496f95704d35ad8d120af11f19",
        options: {
            "sonar.javascript.lcov.reportPaths": "./coverage/lcov.info",
            "sonar.test.inclusions": "./src/cypress/**/*.cy.ts",
            "sonar.inclusions": "./src/**/*.ts,src/**/*.tsx",
            "sonar.projectName": "API-2023.1-Front-End-Web",
            "sonar.organization": "achievers",
            "sonar.projectKey": "achievers",
            "sonar.sources": "./src",
            "sonar.tests": "./src",
            "sonar.branch": "main",
        },
    },
    () => {
        console.log("Error Occurred while scanning");
    }
);
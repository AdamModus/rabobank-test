exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',

    multiCapabilities: [
        {
            'browserName': 'chrome'
        },
        {
            'browserName': 'firefox'
        }
    ],

    suites: {
        raboApp: 'raboApp/*Spec.js',
    },

    jasmineNodeOpts: {
        showColors: true
    },

    onPrepare: function () {
        var jasmineReporters = require('jasmine-reporters');
        var folderPath = "tests/e2e/reports/" + (new Date()).toString().split(' ').splice(1, 4).join(' ');
        folderPath = folderPath.substring(0, folderPath.length - 3);

        // returning the promise makes protractor wait for the reporter config before executing tests
        return browser.getProcessedConfig().then(function (config) {
            // you could use other properties here if you want, such as platform and version
            var browserName = config.capabilities.browserName;


            var junitReporter = new jasmineReporters.JUnitXmlReporter({
                consolidateAll: true,
                savePath: folderPath,
                // this will produce distinct xml files for each capability
                filePrefix: browserName + '-xmloutput',
                modifySuiteName: function (generatedSuiteName, suite) {
                    // this will produce distinct suite names for each capability,
                    // e.g. 'firefox.login tests' and 'chrome.login tests'
                    return browserName + '.' + generatedSuiteName;
                }
            });
            jasmine.getEnv().addReporter(junitReporter);
        });
    }

};
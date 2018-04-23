// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma'),
      require('karma-mocha-reporter')
    ],
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
          '--headless',
          // '--disable-gpu',
          // Without a remote debugging port, Google Chrome exits immediately.
          '--remote-debugging-port=9222',
          '--proxy-server="direct://"',
          '--proxy-bypass-list=*'
        ]
      }
    },
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false,

    specReporter: {
      maxLogLines: 5
    },

    mochaReporter: {
      maxLogLines: 5,
      symbols: {
        success: '😎',
        info: '🐢',
        warning: '😟',
        error: '🔥'
      }
    }
  });
};

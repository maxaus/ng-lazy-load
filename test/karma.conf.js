// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-01-03 using
// generator-karma 0.8.3

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [{pattern: '../app/bower_components/jquery/dist/jquery.js' },
        {pattern: '../app/bower_components/angular/angular.js' },
        {pattern: '../app/bower_components/angular-mocks/angular-mocks.js' },
        {pattern: '../app/bower_components/angular-resource/angular-resource.js' },
        {pattern: '../app/bower_components/json3/lib/json3.min.js'},
        {pattern: '../app/bower_components/jquery-mousewheel/jquery.mousewheel.js' },
        {pattern: '../app/bower_components/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.js' },
        {pattern: '../app/bower_components/bootstrap/dist/js/bootstrap.js' },
        {pattern: '../app/scripts/*.js'},
        {pattern: '../app/scripts/**/*.js'},
        {pattern: 'spec/{,*/}*.js'}],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};

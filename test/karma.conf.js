module.exports = function (config) {
    config.set({
        basePath: '..',
        frameworks: ['jasmine'],
        files: [
            'lib/angular.js', 'lib/angular-route.js',
            'test/lib/angular-mocks.js',
            'js/**/*.js',
            'test/unit/**/*.js'
        ],
        exclude: [],
        port: 8080,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false
    });
};
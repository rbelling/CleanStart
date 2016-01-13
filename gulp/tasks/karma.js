var gulp = require('gulp');
var server = require('karma').server;

/**
 * Run test once and exit
 */
gulp.task('karma', function (done) {
  server.start({
    configFile: '../../../karma.conf.js',
    singleRun: false
  }, done);
});
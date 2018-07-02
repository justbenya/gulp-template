'use strict';

const gulp = require('gulp');

module.exports = function (options) {
  return function () {
    return gulp.src(options.src, { since: gulp.lastRun('assets') })
      .pipe(gulp.dest(options.build));
  }
};
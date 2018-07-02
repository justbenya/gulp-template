'use strict';

const plugin = require('gulp-load-plugins')();
const gulp = require('gulp');

module.exports = function (options) {
  return function () {
    return gulp.src(options.src)
      .pipe(plugin.handlebarsFileInclude())
      .pipe(gulp.dest(options.build));
  }
};
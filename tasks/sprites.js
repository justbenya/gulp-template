'use strict';

const plugin = require('gulp-load-plugins')();
const gulp = require('gulp');

module.exports = function (options) {
  return function () {
    return gulp.src(options.src)
      .pipe(plugin.svgmin())
      .pipe(plugin.svgstore({
        inlineSvg: true
      }))
      .pipe(plugin.rename("sprite.svg"))
      .pipe(gulp.dest(options.build));
  }
};

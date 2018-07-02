'use strict';

const plugin = require('gulp-load-plugins')();
const gulp = require('gulp');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = function (options) {
  return function () {
    return gulp.src(options.src, { since: gulp.lastRun('images') })
      .pipe(plugin.flatten())
      .pipe(plugin.newer(options.build))
      .pipe(plugin.if(!isDevelopment, plugin.imagemin([
        plugin.imagemin.optipng({ optimizationLevel: 3 }),
        plugin.imagemin.jpegtran({ progressive: true }),
      ])))
      .pipe(gulp.dest(options.build));
  }
};

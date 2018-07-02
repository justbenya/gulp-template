'use strict';

const plugin = require('gulp-load-plugins')();
const gulp = require('gulp');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = function (options) {
  return function () {
    return gulp.src(options.src)
      .pipe(plugin.plumber({
        errorHandler: plugin.notify.onError(function (err) {
          return {
            title: 'styles',
            message: err.message
          };
        })
      }))
      .pipe(plugin.wait(500))
      .pipe(plugin.if(isDevelopment, plugin.sourcemaps.init()))
      .pipe(plugin.sass())
      .pipe(plugin.autoprefixer({
        browsers: ['> 0.5%',
          'last 2 versions',
          'not dead',
          'not OperaMini all',
          'ie 11'
        ]
      }))
      .pipe(plugin.csso())
      .pipe(plugin.if(isDevelopment, plugin.sourcemaps.write()))
      .pipe(plugin.rename('style.min.css'))
      .pipe(gulp.dest(options.build));
  }
};
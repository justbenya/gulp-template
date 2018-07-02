'use strict';

const browserSync = require('browser-sync').create();

module.exports = function (options) {
  return function () {
    browserSync.init({
      server: options.build,
      notify: false,
      cors: true,
      ui: false
    });

    browserSync.watch(`${options.build}/**/*.*`).on('change', browserSync.reload);
  }
};
var gulp = require('gulp');

var paths = {
  source: {
    style: 'source/sass/style.scss',
    html: 'source/*.html',
    js: '',
    img: ['source/**/*.{jpg,png,svg}', '!source/**/icon-*.svg', '!source/assets/**/*.*'],
    svgicon: 'source/**/icon-*.svg',
    assets: 'source/assets/**/*.*'
  },
  build: {
    style: 'build/css',
    root: 'build',
    img: 'build/img',
    svgicon: 'build/img'
  },
  watch: {
    style: 'source/**/*.scss',
    html: 'source/**/*.html',
    img: ['source/**/*.{jpg,png,svg}', '!source/**/icon-*.svg', '!source/assets/**/*.*'],
    svgicon: 'source/**/icon-*.svg',
  }
};

function lazyRequireTask(taskName, path, options) {
  options = options || {};
  options.taskName = taskName;
  gulp.task(taskName, function (callback) {
    let task = require(path).call(this, options);

    return task(callback);
  });
}

lazyRequireTask('styles', './tasks/styles', {
  src: 'source/sass/style.scss',
  build: 'build/css'
});

lazyRequireTask('html', './tasks/html', {
  src: paths.source.html,
  build: paths.build.root
});

lazyRequireTask('images', './tasks/images', {
  src: paths.source.img,
  build: paths.build.img
});

lazyRequireTask('sprites', './tasks/sprites', {
  src: paths.source.svgicon,
  build: paths.build.img
});

lazyRequireTask('assets', './tasks/assets', {
  src: paths.source.assets,
  build: paths.build.root
});

lazyRequireTask('serve', './tasks/serve', {
  build: paths.build.root
});

lazyRequireTask('clean', './tasks/clean', {
  build: paths.build.root
});

gulp.task('watch', function () {
  gulp.watch(paths.watch.style, gulp.series('styles'));
  gulp.watch(paths.watch.html, gulp.series('html'));
  gulp.watch(paths.watch.img, gulp.series('images'));
  gulp.watch(paths.watch.svgicon, gulp.series('sprites'));
});

gulp.task('build',
  gulp.series('clean',
    gulp.parallel('styles', 'html', 'images', 'sprites', 'assets'))
);

gulp.task('default',
  gulp.series('build',
    gulp.parallel('serve'))
);

gulp.task('dev', 
  gulp.series('build', 
  gulp.parallel('watch', 'serve'))
);

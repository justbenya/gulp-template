const gulp = require('gulp');
const babel = require('gulp-babel');
const postcss = require('gulp-postcss');
const replace = require('gulp-replace');
const htmlmin = require('gulp-htmlmin');
const terser = require('gulp-terser');
const sync = require('browser-sync');

const PATH = {
    source: {
        root: 'src',
        html: 'src/*.html',
        styles: 'src/styles/index.css',
        js: 'src/scripts/index.js',
        images: 'src/images/**/*',
        fonts: 'src/fonts/**/*',
    },
    build: {
        root: 'dist',
        html: 'dist/*.html',
        css: 'dist/css/',
        js: 'dist/js/'
    },
    watch: {
        style: 'src/**/*.scss',
    }
};

// HTML
const html = () => {
    return gulp.src(PATH.source.html)
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace: true,
        }))
        .pipe(gulp.dest(PATH.build.root))
        .pipe(sync.stream());
};
exports.html = html;

// Styles
const styles = () => {
    return gulp.src(PATH.source.styles)
        .pipe(postcss([
            require('postcss-import'),
            require('autoprefixer'),
            require('postcss-csso'),
        ]))
        .pipe(replace(/\.\.\//g, ''))
        .pipe(gulp.dest(PATH.build.root))
        .pipe(sync.stream());
};
exports.styles = styles;

// Scripts
const scripts = () => {
    return gulp.src(PATH.source.js)
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(terser())
        .pipe(gulp.dest(PATH.build.root))
        .pipe(sync.stream());
};
exports.scripts = scripts;

// Copy
const copy = () => {
    return gulp.src([
            PATH.source.fonts,
            PATH.source.images
        ], {
            base: PATH.source.root
        })
        .pipe(gulp.dest(PATH.build.root))
        .pipe(sync.stream({
            once: true
        }));
};
exports.copy = copy;

// Paths
const paths = () => {
    return gulp.src(PATH.build.html)
        .pipe(replace(
            /(<link rel="stylesheet" href=")styles\/(index.css">)/, '$1$2'
        ))
        .pipe(replace(
            /(<script src=")scripts\/(index.js">)/, '$1$2'
        ))
        .pipe(gulp.dest(PATH.build.root));
};
exports.paths = paths;

// Server
const server = () => {
    sync.init({
        ui: false,
        notify: true,
        server: {
            baseDir: PATH.build.root
        }
    });
};
exports.server = server;

// Watch
const watch = () => {
    gulp.watch('src/*.html', gulp.series(html, paths));
    gulp.watch('src/styles/**/*.css', gulp.series(styles));
    gulp.watch('src/scripts/**/*.js', gulp.series(scripts));
    gulp.watch([
        'src/fonts/**/*',
        'src/images/**/*',
    ], gulp.series(copy));
};
exports.watch = watch;

// Default
exports.default = gulp.series(
    gulp.parallel(
        html,
        styles,
        scripts,
        copy,
    ),
    paths,
    gulp.parallel(
        watch,
        server,
    ),
);

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var pug = require('gulp-pug');
var sassPaths = [
    'bower_components/normalize.scss/sass',
    'bower_components/foundation-sites/scss',
    'node_modules/foundation-sites/scss',
];
function sass() {
    return gulp.src('scss/app.scss')
        .pipe($.sass({
                includePaths: sassPaths,
                outputStyle: 'compressed' // if css compressed **file size**
            })
            .on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(gulp.dest('docs/css'));
}
function build() {
    return gulp.watch(['scss/**/*.scss', 'docs/**/*.pug'], gulp.series(pug2, sass));
}
function pug2() {
    return gulp.src('docs/pug/**/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('docs/'));
}
exports.sass = sass;
exports.pug = pug2;
exports.default = build;
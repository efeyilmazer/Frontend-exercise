
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const minifyImg = require('gulp-imagemin');
const minifyJS = require('gulp-uglify');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const fileName = "21-safari-browser";

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
});

gulp.task('css', () => {
    return gulp.src('src/21-safari-browser/scss/**/*.scss')
        .pipe(sass({
            outputStyle: 'nested',
            precision: 10,
            includePaths: ['.']
        }).on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(autoprefixer())
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('js', () => {
    return gulp.src('src/21-safari-browser/js/**/*.js')
        .pipe(concat('app.min.js'))
        .pipe(minifyJS())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('html', () => {
    gulp.src('src/21-safari-browser/**/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('img', () => {
    /*
    Eğer resimleri minify etmek isterseniz yorum satırını kaldırabilirsiniz.
    */
    gulp.src('src/21-safari-browser/img/**/*')
        // .pipe(minifyImg())
        .pipe(gulp.dest('dist/img'));
});

gulp.task('delete', () => del(['dist/css', 'dist/js', 'dist/img', 'dist/**/*.html']));

gulp.task('watch', () => {
    gulp.watch(`src/21-safari-browser/scss/**/*.scss`, gulp.task("css"));
    gulp.watch(`src/21-safari-browser/js/**/*.js`, gulp.task("js"));
    gulp.watch(`src/21-safari-browser/img/**/*.img`, gulp.task("img"));
    gulp.watch(`src/21-safari-browser/**/*.html`, gulp.task("html"));
});

gulp.task('default', gulp.series('delete', gulp.parallel('html', 'css', 'js', 'img', 'browser-sync', 'watch')));
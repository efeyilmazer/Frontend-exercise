const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const minifyCSS = require("gulp-csso");
const minifyImg = require("gulp-imagemin");
const minifyJS = require("gulp-uglify");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const del = require("del");
const fileName="1-search-filter-components";

//src/2-linkedin-redesign/**/
gulp.task("browser-sync", () => {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
  });
});

gulp.task("css", () => {
  return gulp
    .src(`src/${fileName}/scss/**/*.scss`)
    .pipe(
      sass({
        outputStyle: "nested",
        precision: 10,
        includePaths: ["."],
      }).on("error", sass.logError)
    )
    .pipe(minifyCSS())
    .pipe(autoprefixer())
    .pipe(concat("app.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

gulp.task("js", () => {
  return gulp
    .src(`src/${fileName}/js/**/*.js`)
    .pipe(concat("app.min.js"))
    .pipe(minifyJS())
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream());
});

gulp.task("html", () => {
  return gulp
    .src(`src/${fileName}/**/*.html`)
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
});

gulp.task("font", () => {
  return gulp
    .src(`src/${fileName}/**/*`)
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
});

gulp.task("img", () => {
  gulp
    .src(`src/${fileName}/img/**/*`)
    .pipe(minifyImg())
    .pipe(gulp.dest("dist/img"));
});

gulp.task("delete", () =>
  del(["dist/css", "dist/js", "dist/img", "dist/**/*.html"])
);

gulp.task("watch", () => {
  gulp.watch(`src/${fileName}/scss/**/*.scss`, gulp.task("css"));
  gulp.watch(`src/${fileName}/js/**/*.js`, gulp.task("js"));
  gulp.watch(`src/${fileName}/img/**/*.img`, gulp.task("img"));
  gulp.watch(`src/${fileName}/**/*.html`, gulp.task("html"));
});

gulp.task(
  "default",
  gulp.series(
    "delete",
    gulp.parallel("html", "css", "js", "img", "font", "browser-sync", "watch")
  )
);

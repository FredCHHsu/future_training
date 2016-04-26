// require
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const minifyCSS = require('gulp-minify-css');

// require and init browserSync
const browserSync = require('browser-sync').create();

// const
const devUrl = 'http://localhost:8080/'; // equal to webpack entry
const src = './style/style.scss';
const dest = './public';

gulp.task('sass', () =>
  gulp.src(src)
  .pipe(sourcemaps.init())
  .pipe(sass({
    includePaths: ['./node_modules/susy/sass/'],
  }).on('error', (error) =>
    console.log(error)
  ))
  .pipe(autoprefixer({
    browsers: ['> 1%', 'last 10 version'],
  }))
  .pipe(minifyCSS())
  .pipe(sourcemaps.write('./')) // relative to the dest path for seperated map file
  .pipe(gulp.dest(dest))
  .pipe(browserSync.stream())
);

gulp.task('browserSync', () =>
  browserSync.init({
    proxy: devUrl,
  })
);

gulp.task('watch', ['browserSync'], () =>
  gulp.watch('./style/**/*.scss', ['sass'])
);

gulp.task('default', ['sass', 'watch']);

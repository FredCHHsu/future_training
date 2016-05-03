// require
const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');

// PostCSS
const postcss = require('gulp-postcss');
const reporter = require('postcss-reporter');
const scss = require('postcss-scss');
const autoprefixer = require('autoprefixer');
const stylelint = require('stylelint');
const doiuse = require('doiuse');
const processors = [
  stylelint(),
  doiuse({ browsers: ['ie >= 11', 'last 2 version'] }),
  autoprefixer({ browsers: ['> 1%', 'last 2 version'] }),
  reporter(),
];

// require and init browserSync
const browserSync = require('browser-sync').create();

// const
const devUrl = 'http://localhost:8080/'; // equal to webpack entry
const src = './style/style.scss';
const dest = './public';

gulp.task('sass', () =>
  gulp.src(src)
  .pipe(postcss(processors, { syntax: scss }))
  .pipe(sourcemaps.init())
  .pipe(sass({
    includePaths: ['./node_modules/susy/sass/'],
  }).on('error', sass.logError))
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

gulp.task('production', () =>
  gulp.src(src)
  .pipe(postcss(processors, { syntax: scss }))
  .pipe(sass({
    includePaths: ['./node_modules/susy/sass/'],
  }).on('error', sass.logError))
  .pipe(cssnano())
  .pipe(gulp.dest(dest))
);

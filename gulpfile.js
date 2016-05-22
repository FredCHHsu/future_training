// require gulp and sass core
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

// PostCSS
const postcss = require('gulp-postcss');
// Pre-SASS processors
const scssSyntax = require('postcss-scss');
const stylelint = require('stylelint');
const doiuse = require('doiuse');
const reporter = require('postcss-reporter');
// After-SASS processors
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

// require and init browserSync
const browserSync = require('browser-sync').create();

// URL const
const devUrl = 'http://localhost:8080/'; // equal to webpack entry
const entryFile = './style/style.scss';
const src = './style/**/*.scss';
const dest = './public';

const preSASSProcessors = [
  stylelint(),
  doiuse({ browsers: ['ie >= 11', 'last 2 version'] }),
  reporter({ clearMessages: true }),
];

const afterSASSProcessors = [
  autoprefixer({ browsers: ['> 5%', 'last 2 version'] }),
];

const afterProcessorsProduction = [
  autoprefixer({ browsers: ['> 5%', 'last 2 version'] }),
  cssnano(),
];

// PostCSS before Sass compilation
gulp.task('pre-sass', () =>
  gulp.src(src)
  .pipe(postcss(preSASSProcessors, { syntax: scssSyntax }))
);

// Sass compilation with PostCSS
gulp.task('sass', () =>
  gulp.src(entryFile)
  .pipe(sourcemaps.init())
  .pipe(sass({
    includePaths: ['./node_modules/susy/sass/'],
  }).on('error', sass.logError))
  .pipe(postcss(afterSASSProcessors))
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
  gulp.watch('./style/**/*.scss', ['pre-sass', 'sass'])
);

gulp.task('default', ['pre-sass', 'sass', 'watch']);

gulp.task('production', () =>
  gulp.src(entryFile)
  .pipe(sass({
    includePaths: ['./node_modules/susy/sass/'],
  }).on('error', sass.logError))
  .pipe(postcss(afterProcessorsProduction))
  .pipe(gulp.dest(dest))
);

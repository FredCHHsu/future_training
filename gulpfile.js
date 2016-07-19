// reference
// https://github.com/kriasoft/react-starter-kit/blob/88eabc907aa0f3f8be6a00663f265cbc94262276/gulpfile.js#L114-L141
// http://drewbarontini.com/articles/building-a-better-gulpfile/
//
//
// -------------------------------------
// Gulp Modules that I haven't try
// -------------------------------------
// gulp-autoprefixer : Prefix CSS
// gulp-coffee       : Compile CoffeeScript files
// gulp-coffeelint   : Lint your CoffeeScript
// gulp-concat       : Concatenate files
// gulp-csscss       : CSS redundancy analyzer
// gulp-jshint       : JavaScript code quality tool
// gulp-load-plugins : Automatically load Gulp plugins
// gulp-minify-css   : Minify CSS
// gulp-parker       : Stylesheet analysis tool
// gulp-plumber      : Prevent pipe breaking from errors
// gulp-rename       : Rename files
// gulp-svgmin       : Minify SVG files
// gulp-svgstore     : Combine SVG files into one
// gulp-uglify       : Minify JavaScript with UglifyJS
// gulp-util         : Utility functions
// gulp-watch        : Watch stream
// -------------------------------------


// Modules loading by gulp-load-plugins
// -------------------------------------
// gulp-htmlmin      : Minify HTML
// gulp-sass         : Compile Sass
// gulp-sourcemaps   : Source map support
// gulp-postcss      : Pipe CSS through PostCSS processors
// gulp-util         : Utility functions
// -------------------------------------

// require gulp and related tools
// ===========================================
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const runSequence = require('run-sequence'); // Run a series of dependent Gulp tasks in order
const browserSync = require('browser-sync');
const argv = require('minimist')(process.argv.slice(2));

// require webpack
// ===========================================
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

// require sass and postcss
// ===========================================
// Before-SASS processors
const scssSyntax = require('postcss-scss');
const doiuse = require('doiuse');
const reporter = require('postcss-reporter');
// After-SASS processors
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');


// settings
// ===========================================
// URL const
// const devUrl = 'http://localhost:8080/'; // equal to webpack entry
const DEST = './build';
const RELEASE = !!argv.release;
const AUTOPREFIXER_BROWSERS = [
  '> 5%',
  'last 2 version',
];
const src = {};
let watch = false;
const reload = browserSync.reload;


// default task
// ===========================================
gulp.task('default', ['serve']);

// HTML pages
// ===========================================
gulp.task('pages', () => {
  src.pages = 'src/**/*.html';
  return gulp.src(src.pages)
    .pipe($.if(RELEASE, $.htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      minifyJS: true,
    })))
    .pipe(gulp.dest(DEST))
    .pipe($.if(watch, reload({ stream: true })));
});

// Compile SASS
// ===========================================
const preSASSProcessors = [
  doiuse({ browsers: AUTOPREFIXER_BROWSERS }),
  reporter({ clearMessages: true }),
];
const afterSASSProcessors = [
  autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }),
];
const afterProcessorsProduction = [
  autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }),
  cssnano(),
];

// PostCSS before Sass compilation
gulp.task('before-sass', () => {
  src.styles = 'src/styles/**/*.{css,scss}';
  return gulp.src(src.styles)
  .pipe($.postcss(preSASSProcessors, { syntax: scssSyntax }));
});
// Sass compilation with PostCSS
gulp.task('sass', () =>
  gulp.src('src/styles/style.scss')
  .pipe($.sourcemaps.init())
  .pipe($.sass({
    includePaths: ['./node_modules/susy/sass/'],
  }).on('error', $.sass.logError))
  .pipe($.postcss(afterSASSProcessors))
  .pipe($.sourcemaps.write('./')) // relative to the dest path for seperated map file
  .pipe(gulp.dest(`${DEST}/css`))
  .pipe($.if(watch, reload({ stream: true })))
);

// Build js Bundle Using Webpack
// ===========================================
gulp.task('bundle', (cb) => {
  let started = false;
  const config = webpackConfig(RELEASE);
  const bundler = webpack(config);

  function bundle (err, stats) {
    if (err) {
      throw new $.util.PluginError('webpack', err);
    }

    !!argv.verbose && $.util.log('[webpack]', stats.toString({colors: true}));

    if (watch) {
      reload(config.output.filename);
    }

    if (!started) {
      started = true;
      return cb();
    }
  }

  if (watch) {
    bundler.watch(200, bundle);
  } else {
    bundler.run(bundle);
  }
});

// Build the app from source code
// ===========================================
gulp.task('build', (cb) => {
  runSequence(['pages', 'before-sass', 'sass', 'bundle'], cb);
});

// Launch a lightweight HTTP Server
// ===========================================
gulp.task('serve', (cb) => {
  watch = true;
  runSequence('build', () => {
    browserSync({
      notify: false,
      // Run as an https by uncommenting 'https: true'
      // Note: this uses an unsigned certificate which on first access
      //       will present a certificate warning in the browser.
      // https: true,
      server: {
        baseDir: ['build'],
      },
    });

    // gulp.watch(src.assets, ['assets']);
    // gulp.watch(src.images, ['images']);
    gulp.watch(src.pages, ['pages']);
    gulp.watch(src.styles, ['before-sass', 'sass']);
    cb();
  });
});

// gulp.task('browserSync', () =>
//   browserSync.init({
//     proxy: devUrl,
//   })
// );
//
// gulp.task('watch', ['browserSync'], () =>
//   gulp.watch('./styles/**/*.scss', ['before-sass', 'sass'])
// );
//
// gulp.task('default', ['before-sass', 'sass', 'watch']);
//
// gulp.task('production', () =>
//   gulp.src(entryFile)
//   .pipe(sass({
//     includePaths: ['./node_modules/susy/sass/'],
//   }).on('error', sass.logError))
//   .pipe(postcss(afterProcessorsProduction))
//   .pipe(gulp.dest(DEST))
// );

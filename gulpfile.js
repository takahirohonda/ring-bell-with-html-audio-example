const gulp = require('gulp');
const imgmin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const runSequence = require('gulp4-run-sequence');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const useref = require('gulp-useref');
const gulpIf = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const lazypipe = require('lazypipe');
const order = require('gulp-order');
const babel = require('gulp-babel');
const gutil = require('gulp-util');
const rollup = require('rollup');
const rollupTypescript = require('rollup-plugin-typescript2');
const rollupUglify = require('rollup-plugin-uglify').uglify;
const rollupNodeResolve = require('rollup-plugin-node-resolve');

// File path constant values
// (1) Source path
const sassSrcPath = 'src/style/main.scss'
const sassSrcWatchPath = 'src/style/**/*.scss'
const tsSrcWatchPath = 'src/scripts/**/*.ts'
const tsSrcInput = 'src/scripts/main.ts';
const htmlSrc = 'src/index.html'

// (2) Dist path
const sassDistPath= 'dist'
const sassDistFile = 'ring-bell-widget-nonprod.min.css'
const sassDistFileProd = 'ring-bell-widget-prod.min.css'
const tsDistPathAndFileName = 'dist/ring-bell-widget-nonprod.min.js';
const tsDistPathAndProdFilename = 'dist/ring-bell-widget-prod.min.js'
const htmlDistPath= 'dist';

// Default task only gets executed when typed only gulp
gulp.task('default', async () => {
  console.log('Please add the task name. Default task is not defined.');
});

// (3-1) Process SASS and deploy to asset folder
gulp.task('build-css-dev', () => {
  return gulp.src(sassSrcPath)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat(sassDistFile))
    .pipe(gulp.dest(sassDistPath));
});

// (3-2) Process SASS for production
gulp.task('build-css-prod', () => {
  return gulp.src(sassSrcPath)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(concat(sassDistFileProd))
    .pipe(gulp.dest(sassDistPath));
});

// (4-1) Compile TypeScript and build to asset folder
gulp.task('build-js-dev', () => {
  return rollup.rollup({
    input: tsSrcInput,
    plugins: [
      rollupTypescript({
        cacheRoot: '.rollupcache',
        tsconfigOverride: {
          compilerOptions: {
            removeComments: true,
          }
        }
      }),
      rollupNodeResolve({}),
      rollupUglify({
        compress: {
          drop_console: false
        }
      })
    ]
  }).then(bundle => {
    return bundle.write({
      file: tsDistPathAndFileName,
      format: 'iife',
      // extend mdhbell namespace instead of replace
      name: 'mdhbell',
      extend: true,
      sourcemap: false,
      globals: {
        // map module 'jquery' to global 'jQuery'
        // jquery: 'jQuery'
      }
    });
  });
});

// (4-2) build js for production
gulp.task('build-js-prod', () => {
  return rollup.rollup({
    input: tsSrcInput,
    plugins: [
      rollupTypescript({
        cacheRoot: '.rollupcache',
        tsconfigOverride: {
          compilerOptions: {
            removeComments: true,
          }
        }
      }),
      rollupNodeResolve({}),
      rollupUglify({
        compress: {
          drop_console: true
        }
      })
    ]
  }).then(bundle => {
    return bundle.write({
      file: tsDistPathAndProdFilename,
      format: 'iife',
      // extend whosfree namespace instead of replace
      name: 'cbuschat',
      extend: true,
      sourcemap: false,
      globals: {
        // map module 'jquery' to global 'jQuery'
        // jquery: 'jQuery'
      }
    });
  });
});

// (5) Moving html

gulp.task('copyHtml', function(done) {
  gulp.src(htmlSrc)
    .pipe(gulp.dest(htmlDistPath))
  done();
})


// Watch source file change and reload browser for development
gulp.task('watch', () => {
  browserSync.init({
    server: './dist',
    port:8080,
    ui: {port: 8081}
  });

  gulp.watch(tsSrcWatchPath, gulp.series('build-js-dev'));
  gulp.watch(sassSrcWatchPath, gulp.series('build-css-dev'));
  gulp.watch(htmlSrc, gulp.series('copyHtml'));

  //reloader
  gulp.watch(tsDistPathAndFileName).on('change', browserSync.reload);
  gulp.watch(sassDistPath + '/' + sassDistFile).on('change', browserSync.reload);
  gulp.watch(htmlDistPath).on('change', browserSync.reload);
});

gulp.task('checkDist', function() {
  browserSync.init({
    server: './dist',
    port:8080,
    ui: {port: 8081}
  });
});


/////////////////////////////////////////////////////////
/////////////// build main sequence job ////////////////
/////////////////////////////////////////////////////////

gulp.task('build-dev', (callback) => {
  runSequence(['build-css-dev', 'build-js-dev', 'copyHtml'], callback);
});

gulp.task('build-prod', (callback) => {
  runSequence(['build-css-prod', 'build-js-prod', 'copyHtml'], callback);
});
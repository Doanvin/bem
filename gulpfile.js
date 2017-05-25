// Required Plugins
var gulp          = require('gulp');
var autoprefixer  = require('gulp-autoprefixer');
var browserSync   = require('browser-sync');
var cache         = require('gulp-cache');
var concat        = require('gulp-concat');
var htmlmin       = require('gulp-htmlmin');
var imagemin      = require('gulp-imagemin');
var cleanCSS      = require('gulp-clean-css');
var plumber       = require('gulp-plumber');
var reload        = browserSync.reload;
var rename        = require('gulp-rename');
var sass          = require('gulp-sass');
var uglify        = require('gulp-uglify');

// JS Task
gulp.task('js', function(){
  gulp.src(['src/js/**/*.js'])
  .pipe(plumber())
  .pipe(concat('bundle.js'))
  .pipe(gulp.dest('build/js'))
  .pipe(rename({ suffix: '.min' }))
  .pipe(uglify())
  .pipe(gulp.dest('build/js'))
  .pipe(reload({stream:true}));
});

// Sass Task
gulp.task('sass', function () {
  return gulp.src('src/main.scss')
    .pipe(plumber())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(sass())
    .pipe(gulp.dest('src'))
    .pipe(reload({stream:true}));
});

//Css Task
gulp.task('css', function () {
  return gulp.src('src/**/*.css')
    .pipe(plumber())
    .pipe(concat('bundle.css'))
    .pipe(rename({ suffix: '.min'}))
    .pipe(cleanCSS())
    .pipe(gulp.dest('build/css'))
    .pipe(reload({stream:true}));
});

// HTML Task
gulp.task('html', function() {
  return gulp.src('src/**/*.html')
    .pipe(htmlmin({collapseWhitespace: false}))
    .pipe(gulp.dest('build'))
    .pipe(reload({stream:true}));
});

// Img Task
gulp.task('img', function() {
  return gulp.src('src/img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('build/img'))
    .pipe(reload({stream:true}));
});

// Browser-Sync Task
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./build/"
        }
    });
});

// Watch Task
gulp.task('live',  ['browser-sync'], function() {

    // Watch .scss files
    gulp.watch('src/main.scss', ['sass']);
    // Watch .css files
    gulp.watch('src/main.css', ['css']);
    // Watch .js files
    // gulp.watch('src/js/*.js', ['js']);
    // Watch image files
    // gulp.watch('src/img/**/*', ['img']);
    // Watch html files
    gulp.watch('./**/*.html', ['html']);
});

// Default Task
gulp.task('default', function() {
    gulp.start('css', 'html');
});

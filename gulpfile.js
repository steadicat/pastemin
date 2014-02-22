var gulp = require('gulp');
var gulpUtil = require('gulp-util');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var react = require('gulp-react');
var cache = require('gulp-cached');
var gzip = require("gulp-gzip");
var stylus = require('gulp-stylus');
var minifycss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var clean = require('gulp-clean');
var livereload = require('gulp-livereload');
var lr = require('tiny-lr');
var server = lr();

var serverJs = ['src/*.js', 'src/pages/**/*', 'src/components/**/*'];
var clientJs = ['src/client.js', 'src/pages/**/*', 'src/components/**/*'];

gulp.task('styles', function() {
  return gulp.src('src/styles/**/*.styl')
    .pipe(stylus({ set: ['compress'], use: ['nib'] }))
    .pipe(minifycss())
    .pipe(gzip())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(livereload(server));
});

gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist/assets/img'))
    .pipe(livereload(server));
});

// browserify + minify + jsx + gzip + cache
gulp.task('client', function() {
  gulp.src('src/pages/**/*')
    .pipe(browserify({
      insertGlobals: false,
      debug: !gulpUtil.env.production,
      transform: ['reactify']
    }))
    //.pipe(jshint('.jshintrc'))
    //.pipe(jshint.reporter('default'))
    .pipe(gulpUtil.env.type === 'production' ? uglify() : gulpUtil.noop())
    .pipe(gzip())
    .pipe(gulp.dest('dist/assets/js/pages'))
    .pipe(livereload(server));
});

gulp.task('server', function() {
  gulp.src('src/pages/**/*')
    .pipe(react())
    .pipe(gulp.dest('dist/server/pages'));
  gulp.src('src/components/**/*')
    .pipe(react())
    .pipe(gulp.dest('dist/server/components'));
  gulp.src('src/*.js')
    .pipe(react())
    .pipe(gulp.dest('dist/server'));
});

gulp.task('clean', function() {
  return gulp.src(['dist/css', 'dist/js', 'dist/img', 'dist/server'], {read: false})
    .pipe(clean());
});

gulp.task('watch', function () {
  gulp.watch(clientJs, ['client']);
  gulp.watch(serverJs, ['server']);
  gulp.watch('src/styles/**/*', ['styles']);
  gulp.watch('src/images/**/*', ['images']);
});

gulp.task('vendor', function() {
  gulp.src('src/vendor/ace/*')
    .pipe(gulp.dest('dist/assets/js/vendor/ace'));
});

gulp.task('livereload', function() {
  server.listen(35729, function (err) {
    if (err) return console.log(err);
    console.log('Livereload listening on port 35729');
  });
});

gulp.task('default', ['client', 'server', 'vendor', 'styles', 'images', 'watch', 'livereload']);

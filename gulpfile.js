var gulp = require('gulp');
var gutil = require('gulp-util');
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

var serverJs = ['src/*.js', 'src/pages/**/*', 'src/components/**/*', 'src/lib/**/*.js'];
var clientJs = ['src/client.js', 'src/pages/**/*', 'src/components/**/*'];

gulp.task('styles', function() {
  return gulp.src('src/styles/**/*.styl')
    .pipe(stylus({ set: ['compress'], use: ['nib'] }))
    .on('error', gutil.log)
    .pipe(minifycss())
    .pipe(gzip())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(livereload(server));
});

gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist/assets/img'))
    .pipe(livereload(server))
    .on('error', gutil.log);
});

// browserify + minify + jsx + gzip + cache
gulp.task('client', function() {
  gulp.src('src/pages/**/*')
    .pipe(browserify({
      insertGlobals: false,
      debug: !gutil.env.production,
      transform: ['reactify']
    }))
    .on('error', gutil.log)
    .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
    .pipe(gzip())
    .pipe(gulp.dest('dist/assets/js/pages'))
    .pipe(livereload(server))
    .on('error', gutil.log);
});

gulp.task('server', function() {
  gulp.src('src/pages/**/*')
    .pipe(react())
    .on('error', gutil.log)
    .pipe(gulp.dest('dist/server/pages'))
    .on('error', gutil.log);
  gulp.src('src/components/**/*')
    .pipe(react())
    .on('error', gutil.log)
    .pipe(gulp.dest('dist/server/components'))
    .on('error', gutil.log);
  gulp.src('src/lib/**/*')
    .pipe(react())
    .on('error', gutil.log)
    .pipe(gulp.dest('dist/server/lib'))
    .on('error', gutil.log);
  gulp.src('src/*.js')
    .pipe(react())
    .on('error', gutil.log)
    .pipe(gulp.dest('dist/server'))
    .on('error', gutil.log);
});

gulp.task('clean', function() {
  return gulp.src(['dist/css', 'dist/js', 'dist/img', 'dist/server'], {read: false})
    .pipe(clean())
    .on('error', gutil.log);
});

gulp.task('watch', function () {
  gulp.watch(clientJs, ['client']);
  gulp.watch(serverJs, ['server']);
  gulp.watch('src/styles/**/*', ['styles']);
  gulp.watch('src/images/**/*', ['images']);
});

gulp.task('vendor', function() {
  gulp.src('src/vendor/ace/*')
    .pipe(gulp.dest('dist/assets/js/vendor/ace'))
    .on('error', gutil.log);
});

gulp.task('livereload', function() {
  server.listen(35729, function (err) {
    if (err) return console.log(err);
    console.log('Livereload listening on port 35729');
  });
});

gulp.task('default', ['client', 'server', 'vendor', 'styles', 'images', 'watch', 'livereload']);

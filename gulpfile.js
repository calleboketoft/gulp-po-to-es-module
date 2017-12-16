var gulp = require('gulp');
var poToEsm = require('./gulp-po-to-es-module');
var rename = require('gulp-rename');

gulp.task('po-to-es-module', function () {
  return gulp.src('sample.po')
    .pipe(poToEsm())
    .pipe(rename('sample.js'))
    .pipe(gulp.dest('dist'));
});

var gulp = require('gulp');
var aglio = require('gulp-aglio');
var browserSync = require('browser-sync');
var rename = require('gulp-rename');
var rimraf = require('rimraf');
var ejs = require('gulp-ejs');
var aglioConfig = require('./aglioconfig.json');


var reload = browserSync.reload;

var TEMPLATE_FILES = ['apidocs/**/*.md'];
var LAYOUT_FILE = 'apidocs/layout.md';
var PUBLISHED_DIR = 'published';

gulp.task('combine', function(){
  return gulp.src(LAYOUT_FILE)
    .pipe(ejs({},{ ext: '.md' }))
    .pipe(rename('index.md'))
    .pipe(gulp.dest(PUBLISHED_DIR));
});

gulp.task('generate-api-docs', ['combine'], function() {
  return gulp.src(PUBLISHED_DIR + '/index.md')
    .pipe(aglio(aglioConfig))
    .pipe(gulp.dest(PUBLISHED_DIR));
});

gulp.task('watch', function () {
  gulp.watch(TEMPLATE_FILES, ['generate-api-docs', reload]);
});

gulp.task('browserSync', function() {
  browserSync({
    logConnections: true,
    logFileChanges: true,
    notify: true,
    port: 8088,
    open: false,
    server: {
      baseDir: PUBLISHED_DIR
    }
  });
});

gulp.task('clean', function(cb) {
  rimraf(PUBLISHED_DIR, cb);
});

gulp.task('publish', ['clean', 'generate-api-docs']);
gulp.task('default', ['generate-api-docs', 'watch', 'browserSync']);


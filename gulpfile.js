var gulp = require('gulp');
var mincss = require('gulp-clean-css');
var sass = require('gulp-sass');
var minhtml = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var server = require('gulp-webserver');
var concat = require('gulp-concat');
var sequence = require('gulp-sequence');

var path = require('path');
var fs = require('fs');
var url = require('url');

gulp.task('server', ['scss'], function() {
    gulp.src('dev/**/*.html')
        .pipe(server({
            port: 8080,
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;

                if (pathname === '/favicon.ico') {
                    return;
                }
                if (pathname === '/') {
                    res.end('hello');
                }
            }
        }))
});
// css文件
gulp.task('scss', function() {
    gulp.src('dev/scss/*.scss')
        .pipe(sass())
    gulp.dest('dev/css')
});

gulp.task('buildcss', function() {
    gulp.src('dev/scss/**/*.scss')
        .pipe(sass())
        .pipe(mincss())
        .pipe(concat())
    gulp.dest('build/css')
});
// js
gulp.task('buildjs', function() {
    gulp.src('dev/js/**/*.js')
        .pipe(uglify())
        .pipe(concat())
    gulp.dest('build/js')
});

gulp.task('default', ['scss', 'buildcss', 'buildjs', 'server']);
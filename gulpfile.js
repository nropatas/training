'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const gulputil = require('gulp-util');
const nodemon = require('gulp-nodemon');
const concatCss = require('gulp-concat-css');

gulp.task('lint', () => {
    return gulp.src(['**/*.js', '!node_modules/**', '!public/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('concatCss', () => {
    return gulp.src('assets/css/*.css')
        .pipe(concatCss("style.css"))
        .pipe(gulp.dest('public/css'));
});

gulp.task('run', ['lint', 'concatCss'], () => {
    nodemon({
        script: 'app.js',
    });
});

gulp.task('test', ['run'], () => {
    return gulp.src('test/*.js', { read: false })
        .pipe(mocha({ reporter: 'list' }))
        .on('error', gulputil.log);
});

gulp.task('default', ['run'], () => {
    gulp.watch('**/*.js', ['run']);
});

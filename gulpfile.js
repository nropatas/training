'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const gulputil = require('gulp-util');
const nodemon = require('gulp-nodemon');

gulp.task('lint', () => {
    return gulp.src(['**/*.js', '!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('run', ['lint'], () => {
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

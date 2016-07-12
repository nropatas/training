'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const gulputil = require('gulp-util');
const nodemon = require('gulp-nodemon');
const concatCss = require('gulp-concat-css');
const cleanCss = require('gulp-clean-css');
const sequence = require('gulp-sequence');
const cssnano = require('gulp-cssnano');

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

gulp.task('minify', () => {
    gulp.src('public/css/style.css')
        .pipe(cssnano())
        .pipe(gulp.dest('public/css'));
});

gulp.task('clean', sequence('concatCss', 'minify'));

gulp.task('run', ['lint', 'clean'], () => {
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

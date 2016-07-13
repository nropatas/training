'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const gulputil = require('gulp-util');
const nodemon = require('gulp-nodemon');
const concatCss = require('gulp-concat-css');
// const sequence = require('gulp-sequence');
const cssnano = require('gulp-cssnano');
const server = require('gulp-develop-server');

gulp.task('lint', () => {
    return gulp.src(['**/*.js', '!node_modules/**', '!public/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('concatCss', ['lint'], () => {
    return gulp.src('assets/css/*.css')
        .pipe(concatCss("style.css"))
        .pipe(gulp.dest('public/css'));
});

gulp.task('minify', ['concatCss'], () => {
    gulp.src('public/css/style.css')
        .pipe(cssnano())
        .pipe(gulp.dest('public/css'));
});

// gulp.task('clean', sequence('concatCss', 'minify'));

gulp.task('run', ['minify'], () => {
    // nodemon({
    //     script: 'app.js',
    // });
    server.listen({
        path: 'app.js'
    });
});

gulp.task('restart', ['minify'], () => {
    server.restart();
});

gulp.task('test', ['restart'], () => {
    return gulp.src('test/*.js', { read: false })
        .pipe(mocha({ reporter: 'list' }))
        .on('error', gulputil.log);
});

gulp.task('default', ['run'], () => {
    gulp.watch('**/*.js', ['test']);
});

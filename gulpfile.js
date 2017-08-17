'use strict';

var gulp = require('gulp'),
    bourbon = require('bourbon').includePaths,
    neat = require('bourbon-neat').includePaths,
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('styles', function(){

   return gulp.src('assets/sass/style.scss')

       .pipe( sourcemaps.init() )

       .pipe( sass({
           includePaths: [].concat( bourbon, neat ),
           errorLogToConsole: true,
           outputStyle: 'expanded' // Options: nested, expanded, compact, compressed
       }) )

       .pipe( postcss([
           autoprefixer({
               browsers: ['last 2 versions']
           })
       ]) )

       .pipe( sourcemaps.write() )

       .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
   gulp.watch('assets/sass/**/*.scss', ['styles']);
});
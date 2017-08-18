'use strict';

var gulp = require('gulp'),

    // Sass / CSS Processes
    bourbon = require('bourbon').includePaths,
    neat = require('bourbon-neat').includePaths,
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    //mqpacker = require('css-mqpacker'),
    sourcemaps = require('gulp-sourcemaps'),
    cssnano = require('gulp-cssnano'),

    // utilities
    rename = require('gulp-rename');

gulp.task('postcss', function(){

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
           // mqpacker({
           //     sort: true
           // })
       ]) )

       .pipe( sourcemaps.write() )

       .pipe(gulp.dest('./'));

}); // End of styles task

gulp.task('cssMinify', ['postcss'], function () {

    return gulp.src('style.css')
        .pipe( cssnano({
            safe: true
        }) )

        .pipe(rename('style.min.css'))

        .pipe(gulp.dest('./'));

});

gulp.task('watch', function() {

   gulp.watch('assets/sass/**/*.scss', ['styles']);

});

/**
 * Individual Tasks
 */

// gulp.task( 'scripts', [''] )

gulp.task( 'styles', ['cssMinify'] );

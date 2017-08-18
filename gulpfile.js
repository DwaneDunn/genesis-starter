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
    sassLint = require('gulp-sass-lint'),

    // utilities
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber');


/*****************************************************
 * Utilities
 ******************/

/**
 * Error handling
 *
 * @function
 */
function handleErrors() {
    var args = Array.prototype.slice.call(arguments);

    notify.onError({
        title: 'Task Failed [<%= error.message %>]',
        message: 'See console.',
        sound: 'Sosumi' // See https://github.com/mikaelbr/node-notifier

    }).apply(this, args);

    gutil.beep(); // Beep 'sosumi' again

    // Prevent the 'watch' task from stopping
    this.emit('end');
}

/**********************************************************
 * CSS Tasks
 **********************************************************/

/**
 * PostCSS Task Handler
 */

gulp.task('postcss', function(){

   return gulp.src('assets/sass/style.scss')

       // Error handling
       .pipe( plumber({
           errorHandler: handleErrors
       }) )

       // Sourcemap wrapping
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

       .pipe( gulp.dest('./') );

}); // End of styles task

gulp.task('css:minify', ['postcss'], function () {

    return gulp.src('style.css')

        // Error handling
        .pipe( plumber({
            errorHandler: handleErrors
        }) )

        .pipe( cssnano({
            safe: true
        }) )

        .pipe(rename('style.min.css'))

        .pipe(gulp.dest('./'))

        .pipe( notify({
            message: 'Styles are built.'
        }) );

});

gulp.task('sass:lint', ['css:minify'], function () {
    gulp.src([
        'assets/sass/style.scss',
        // Exclude these assets
        '!assets/sass/base/html5-reset/_normalize.scss',
        '!assets/sass/utilities/animate/**/*.*'
    ])
        .pipe( sassLint() )
        .pipe( sassLint.format() )
        .pipe( sassLint.failOnError() );

});

/**
 * All Task Listeners
 */


gulp.task('watch', function() {

   gulp.watch('assets/sass/**/*.scss', ['styles']);

});

/**
 * Individual Tasks
 */

// gulp.task( 'scripts', [''] )

gulp.task( 'styles', ['sass:lint'] );

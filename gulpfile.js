var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var bourbon = require('node-bourbon');

gulp.task('default', function () {

    // I can't live without liveload :(
    livereload.listen();

    gulp.watch(['index.html'], ['indexChange']);
    gulp.watch('scss/**/*.scss', ['scssChange']);

});

gulp.task('indexChange', function () {
    livereload.reload();
});

gulp.task('scssChange', function () {

    gulp.src('scss/styles.scss')
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: ['scss', 'node_modules', bourbon.includePaths[0]]
        }))
        .pipe(gulp.dest('.'))
        .pipe(livereload());

});

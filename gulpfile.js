var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

gulp.task('minify:js', function () {
    return gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('analogy.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('analogy.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('default', ['minify:js']);

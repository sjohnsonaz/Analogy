var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('minify:js', function () {
    return gulp.src('src/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['minify:js']);

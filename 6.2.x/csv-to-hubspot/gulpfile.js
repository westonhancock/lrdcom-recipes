// Include gulp & gulp plugins
var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');

// Compile SASS
gulp.task('sass', function() {
    return sass('src/scss/*.scss', { style: 'compressed' })
        .pipe(concat('app.css'))
        .pipe(gulp.dest('css'))
});

gulp.task('scripts', function() {
    return gulp.src([
            'src/js/config.js',
            'src/js/data.js',
            'src/js/features.js',
            'src/js/ui.js',
            'src/js/app.js'
        ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('js'));
});

// Watch for changes
gulp.task('watch', function() {
    // Watch .js files
    gulp.watch('src/js/*.js', ['scripts']);
    // Watch .scss files
    gulp.watch('src/scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['scripts', 'sass', 'watch']);

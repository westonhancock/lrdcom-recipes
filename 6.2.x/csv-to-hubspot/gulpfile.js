// Include gulp & gulp plugins
var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-ruby-sass');
var htmlToJs = require('gulp-html-to-js');

// Compile SASS
gulp.task('sass', function() {
    return sass('src/scss/*.scss', { style: 'compressed' })
        .pipe(concat('app.css'))
        .pipe(gulp.dest('css'))
});

gulp.task('scripts', function() {
    return gulp.src([
            // core files
            'src/config.js',
            'src/data.js',
            'src/core.js',

            // module 1
            'src/modules/step1/controller.js',
            // module 2
            'src/modules/step2/controller.js',
            // module 3
            'src/modules/step3/controller.js',

            'src/app.js'
        ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('js'));
});

// turn HTML files into JS
gulp.task('step1:view', function() {
    return gulp.src('src/modules/step1/*.html')
        .pipe(htmlToJs({ concat: 'view.js' }))
        .pipe(gulp.dest('src/modules/step1'));
});


// turn HTML files into JS
gulp.task('step2:view', function() {
    return gulp.src('src/modules/step2/*.html')
        .pipe(htmlToJs({ concat: 'view.js' }))
        .pipe(gulp.dest('src/modules/step2'));
});

// turn HTML files into JS
gulp.task('step3:view', function() {
    return gulp.src('src/modules/step3/*.html')
        .pipe(htmlToJs({ concat: 'view.js' }))
        .pipe(gulp.dest('src/modules/step3'));
});

gulp.task('compile:views', [
    'step1:view',
    'step2:view', 
    'step3:view', 
]);

// Watch for changes
gulp.task('watch', function() {
    // Watch .js files
    gulp.watch('src/modules/step1/controller.js', ['scripts']);
    gulp.watch('src/modules/step2/controller.js', ['scripts']);
    gulp.watch('src/modules/step3/controller.js', ['scripts']);
    gulp.watch('src/*.js', ['scripts']);
    gulp.watch('src/modules/step1/view.html', ['compile:views']);
    gulp.watch('src/modules/step2/view.html', ['compile:views']);
    gulp.watch('src/modules/step3/view.html', ['compile:views']);
    // Watch .scss files
    gulp.watch('src/scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['compile:views', 'scripts', 'sass', 'watch']);

var gulp = require('gulp');
var svgmin = require('gulp-svgmin');
var rename = require("gulp-rename");


var ext_replace = require('gulp-ext-replace');



var svgSprite = require('gulp-svg-sprite');

var syncdir = "/Users/allenziegenfus/Documents/liferay-sync61/Events 2016/DEVCON";
var paths = {
    scripts: ['client/js/**/*.coffee', '!client/external/**/*.coffee'],
    pug: ['*.pug', '*.html', '*.css']
};

var browserSync = require('browser-sync').create();

// Static server
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("index.html").on('change', browserSync.reload);

});

var pug = require('gulp-pug');

gulp.task('pug', function buildHTML() {
    return gulp.src('*.pug')
        .pipe(pug({
            // Your options in here. 
        }))
        .pipe(gulp.dest("."));
});

gulp.task('watch', function () {
    gulp.watch(paths.pug, ['pug']);

});

gulp.task('live-dev', ['pug', 'watch', 'browser-sync']);

gulp.task('default', function () {
    return gulp.src('images/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('imagesout'))
        .pipe(gulp.dest(syncdir))
        ;
});

gulp.task("sprite", function () {
    var config = {
        log: "debug",
        mode: {
            symbol: {
                inline: true
            },
            dest: "out"
        }
    };

    gulp.src('**/*.svg', { cwd: 'images' })
        .pipe(svgSprite(config))
        .pipe(gulp.dest('out'))
        .on("end", function () {
            gulp.src('out/symbol/svg/sprite.symbol.svg')
                .pipe(rename("devconsprite.svg"))
                .pipe(gulp.dest('.'));
        });
});



gulp.task('css', function () {
    var postcss = require('gulp-postcss');
    var gulpStylelint = require('gulp-stylelint');


    return gulp.src('src/**/*.scss')
        .pipe(postcss([require('autoprefixer'), require('precss')]))
        .pipe(ext_replace(".css"))
        /*       .pipe(gulpStylelint({   reporters: [
             {formatter: 'string', console: true}
           ]}))*/
        .pipe(gulp.dest('build/'));
});



gulp.task('images', function () {

    var imageOptim = require('gulp-imageoptim');

    return gulp.src('images/*')
        .pipe(imageOptim.optimize({
            jpegmini: false
        }))
        .pipe(gulp.dest('build/images'));
});


gulp.task('update', function () {
    var biggulp = require("./biggulp.js");
    var fs = require("fs");
    var config = JSON.parse(fs.readFileSync('./config.json'));

    var article = {
        groupId: "67510365",
        articleId: "74650618",
        defaultLocale: "de_DE",
        locales: [{
            locale: "de_DE",
            filename: "test/test.html"
        }, {
            locale: "en_US", 
            filename: "test/test.html"
        }]
    };
    biggulp.updateArticle(config, article);
});
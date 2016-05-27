var gulp = require('gulp');
var svgmin = require('gulp-svgmin');
var rename = require("gulp-rename");
var ext_replace = require('gulp-ext-replace');
var svgSprite = require('gulp-svg-sprite');

var winston = require("winston");
var logger = new winston.Logger({
    level: 'debug',
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({
            name: 'debug-file',
            filename: 'logs/debug.log',
            level: 'debug'
        }),
        new (winston.transports.File)({
            name: 'silly-file',
            filename: 'logs/trace.log',
            level: 'silly'
        })
    ]
});


var syncdir = "/Users/allenziegenfus/Documents/liferay-sync61/Events 2016/DEVCON";
var paths = {
    scripts: ['client/js/**/*.coffee', '!client/external/**/*.coffee'],
    pug: ['src/*.pug', '*.html', '*.css']
};

var browserSync = require('browser-sync').create();

// Static server
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "build/"
        }
    });
    gulp.watch("build/index.html").on('change', browserSync.reload);

});



gulp.task('pug', ["sprite", "css"], function buildHTML() {
    logger.info("Running templates");
    var pug = require('gulp-pug');
    return gulp.src('src/*.pug')
        .pipe(pug({
            // Your options in here. 
        }))
        .pipe(gulp.dest("build"));
});

gulp.task('watch', function () {
    gulp.watch(paths.pug, ['pug']);

});

gulp.task('live-dev', ['pug', 'watch', 'browser-sync']);

gulp.task('svgmin', function () {
    return gulp.src('images/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('build'))
        .pipe(gulp.dest(syncdir))
        ;
});




gulp.task("sprite", function (cb) {
    var config = {
        log: "debug",
        mode: {
            symbol: {
                inline: true
            },
            dest: "out"
        }
    };

    logger.info("Creating SVG sprite");
    gulp.src('**/*.svg', { cwd: 'images' })
        .pipe(svgSprite(config))
        .pipe(gulp.dest('build'))
        .on("end", function () {
            logger.info("Renaming Sprite File");
            gulp.src('build/symbol/svg/sprite.symbol.svg')
                .pipe(rename("devconsprite.svg"))
                .pipe(gulp.dest('build'))
                .on("end", cb);
        });
    
});



gulp.task('css', function (cb) {
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


gulp.task('update', ["pug"], function () {
    var biggulp = require("./biggulp.js");
    var fs = require("fs");
    var config = JSON.parse(fs.readFileSync('./config.json'));
    var articleConfig = JSON.parse(fs.readFileSync('./articleconfig.json'));
    
    articleConfig.forEach(function(article) {  
        biggulp.updateStaticArticleContent(config, article); 
    });
});

gulp.task('default', ["sprite", "css", "pug"]);

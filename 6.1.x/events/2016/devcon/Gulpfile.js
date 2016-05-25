var gulp = require('gulp');
var svgmin = require('gulp-svgmin');
var rename = require("gulp-rename");

var svgSprite = require('gulp-svg-sprite');

var syncdir = "/Users/allenziegenfus/Documents/liferay-sync61/Events 2016/DEVCON";

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
        .on("end", function() {
              gulp.src('out/symbol/svg/sprite.symbol.svg')
        .pipe(rename("devconsprite.svg"))
        .pipe(gulp.dest('.'));
        });
        
  
});
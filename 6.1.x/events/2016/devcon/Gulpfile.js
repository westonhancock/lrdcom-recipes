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

    var fancyconfig = {
        shape: {
            dimension: {         // Set maximum dimensions
                maxWidth: 32,
                maxHeight: 32
            },
            spacing: {         // Add padding
                padding: 10
            },
            dest: 'out/intermediate-svg'    // Keep the intermediate files
        },
        mode: {
            view: {         // Activate the «view» mode
                bust: false,
                render: {
                    scss: true      // Activate Sass output (with default options)
                }
            },
            symbol: true      // Activate the «symbol» mode
        }
    };

    var symbolconfig = {
        shape: {
            dimension: {         // Set maximum dimensions
                maxWidth: 32,
                maxHeight: 32
            },
            spacing: {         // Add padding
                padding: 10
            },
            dest: 'out/intermediate-svg'    // Keep the intermediate files
        },
        mode: {
            symbol: true,      // Activate the «symbol» mode,
            dest: "out"
        }
    };
    var simplesymbolconfig = {
        log: "debug",
      svg: {
            xmlDeclaration: false,
          doctypeDeclaration: false,
          rootAttributes: { display: "none"}
      },
        mode: {
            symbol: true,      // Activate the «symbol» mode,
            dest: "out"
        }
    };
    // Basic configuration example
    var config = {
        mode: {
            css: {     // Activate the «css» mode
                render: {
                    css: true  // Activate CSS output (with default options)
                }
            }
        }
    };

    gulp.src('**/*.svg', { cwd: 'images' })
        .pipe(svgSprite(simplesymbolconfig))
        .pipe(gulp.dest('out'));
        
    gulp.src('out/symbol/svg/sprite.symbol.svg')
        .pipe(rename("devconsprite.svg"))
        .pipe(gulp.dest('.'));
});
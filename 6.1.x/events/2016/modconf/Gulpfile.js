var gulp = require('gulp');
var svgmin = require('gulp-svgmin');
var rename = require("gulp-rename");
var ext_replace = require('gulp-ext-replace');
var svgSprite = require('gulp-svg-sprite');
var concat = require("gulp-concat");
var liferay = require("liferay-json");
var replace = require("gulp-replace");

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

var fs = require("fs");
var config = JSON.parse(fs.readFileSync('./config.json'));
var environment = config.environment.prod;

gulp.task("dev", function () {
    environment = config.environment.dev;
    logger.info("environment changed to: ", environment);
});


var paths = {
    scripts: ['src/liferay/**/*.js'],
    liferaycss: ['src/liferay/**/*.css'],
    pug: ['src/*.pug'],
    css: ['src/**/*.scss', 'src/**/*.css'],
    svg: ['images/*.svg'],
    html: ['src/*.html'],
    js: ['src/js/*.js'],
    vm: ['*.vm']
};

var browserSync = require('browser-sync').create();

// Static server
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "build/"
        },
        files: ['build/*.css'],
        plugins: ["browser-sync-logger"]
    });
    gulp.watch("build/index.html").on('change', browserSync.reload);

});

gulp.task('browser-sync-dev', function () {
    browserSync.init({
        proxy: "localhost:8080",
        files: ["*.css"],
        plugins: ["browser-sync-logger"]
    });
    gulp.watch("build/css/devcon.css").on('change', function () {
        updateLocal();
        browserSync.reload();

    });
});

gulp.task("js", function () {
    var inject = require("gulp-inject-string");
    gulp.src(paths.js)
        .pipe(concat('all.js'))
        .pipe(inject.prepend("<script>"))
        .pipe(inject.append("</script>"))
        .pipe(gulp.dest("build"));
});

gulp.task("replace", function() {
 return gulp.src(['build/**/*.html'])
    .pipe(replace(/url\(\/documents/g, 'url(' + config.server + '/documents'))
    .pipe(replace(/url\('\/documents/g, 'url(\'' + config.server + '/documents'))
    .pipe(replace(/src="\/documents/g,'src="' + config.server + '/documents'))
    .pipe(gulp.dest('build'));
});

gulp.task('pug', ["replace", "js", "liferaycss", "scripts", "sprite", "css"], function buildHTML() {
    logger.info("Running templates");
    var pug = require('gulp-pug');
    return gulp.src(paths.pug)
        .pipe(pug({
            locals: environment
        }))
        .pipe(gulp.dest("build"));
});

gulp.task('clean', function () {
    var del = require('del');
    // You can use multiple globbing patterns as you would with `gulp.src`
    return del(['build']);
});

gulp.task('scripts', function () {
    // Minify and copy all JavaScript (except vendor scripts)
    // with sourcemaps all the way down
    return gulp.src(paths.scripts)
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('build/'));
});

gulp.task('liferaycss', function () {
    // Minify and copy all JavaScript (except vendor scripts)
    // with sourcemaps all the way down
    return gulp.src(paths.liferaycss)
        .pipe(concat('all.css'))
        .pipe(gulp.dest('build/'));
});

gulp.task('watch', function () {
    gulp.watch(paths.pug, ['pug']);
    gulp.watch(paths.css, ['css']);
    gulp.watch(paths.svg, ['pug']);
    gulp.watch(paths.html, ['pug']);
    gulp.watch(paths.scripts, ['scripts', 'pug']);
    gulp.watch(paths.js, ['js', 'pug']);
    gulp.watch(paths.vm, ['pug']);
});


gulp.task('live-dev', ['dev', 'pug', 'watch', 'browser-sync']);
gulp.task('live-local-dev', ['dev', 'pug', 'watch', 'browser-sync-dev']);

gulp.task('svgmin', function () {
    return gulp.src('images/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('build'))
        //.pipe(gulp.dest(config.syncDir))
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
        .on ("error", function(error) {
            console.log(error);
        })
        .pipe(gulp.dest('build'))
        .on("end", function () {

            logger.info("Renaming Sprite File");
            gulp.src('build/symbol/svg/sprite.symbol.svg')
                .pipe(rename("svgsprite.svg"))
                .pipe(gulp.dest('build'))
                .on("end", cb);
        });

});


gulp.task("recap-sprite", function (cb) {
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
    gulp.src('recap-icons/*.svg', { cwd: 'images' })
        .pipe(svgSprite(config))
        .on ("error", function(error) {
            console.log(error);
        })
        .pipe(gulp.dest('build'))
        .on("end", function () {

            logger.info("Renaming Sprite File");
            gulp.src('build/symbol/svg/sprite.symbol.svg')
                .pipe(rename("recapicons.svg"))
                .pipe(gulp.dest('build'))
                .on("end", cb);
        });

});


gulp.task('css', function () {
    var postcss = require('gulp-postcss');
    //var gulpStylelint = require('gulp-stylelint');
    //var fs = require('fs');
    logger.info("environment: ", environment);

    return gulp.src(paths.css)
        .pipe(postcss([
            require('precss'),
            require("css-mqpacker"),
            require('postcss-advanced-variables')({
                variables:
                environment
            })
        ]))
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
      //  .pipe(gulp.dest(config.syncDir));
});


function updateLocal() {
    var biggulp = require("./biggulp.js");
    var fs = require("fs");
    var config = JSON.parse(fs.readFileSync('./config_local.json'));
    var articleConfig = JSON.parse(fs.readFileSync('./articleconfig_local.json'));

    articleConfig.forEach(function (article) {
        biggulp.updateStaticArticleContent(config, article);
    });

}
gulp.task('update-local', ["js", "pug"], updateLocal);

gulp.task('update', ["js", "pug"], function () {

    var fs = require("fs");
    var config = JSON.parse(fs.readFileSync('./config.json'));
    var articleConfig = JSON.parse(fs.readFileSync('./articleconfig.json'));

    articleConfig.forEach(function (article) {
        liferay.updateStaticArticleContent(config, article);
    });
});

gulp.task('default', ["sprite", "css", "pug"]);
gulp.task('get-content', function (done) {

    var fs = require("fs");
    var config = JSON.parse(fs.readFileSync('./config.json'));
    var articleConfig = JSON.parse(fs.readFileSync('./article-lookup-config.json'));

    articleConfig.forEach(function (article) {
        liferay.viewArticleContent(config, article,  article.locale || "en_US", function() { });
    });
    done();
});

gulp.task('perms', function () {
    var biggulp = require("./biggulp.js");

    var cmd = {
        "/permission/check-permission": {
            "groupId": 67510365,
            "resourceId": 663854
        }
    };

    // https://web.liferay.com/de/web/mohit.soni/blog/-/blogs/deep-dive-in-roles-and-permissions
    var cmd = {
        '/resource/get-resource': {

            companyId: 1,
            name: 'com.liferay.portal.model.Layout',
            scope: 4,
            primKey: '67504546'
        }

    };



    var cmd = {
        "/layout/get-layouts": {
            "groupId": 67510365,
            "privateLayout": false
        }
    };
    var cmd = {
        "/permission/check-permission": {
            "groupId": 67510365,
            "name": "com.liferay.portal.model.Layout",
            "primKey": "74815470"
        }
    };



    var cmd = {
        "/role/get-group-roles": {
            "groupId": 22
        }
    };

    var cmd = {
        "/role/get-user-roles": {
            "userId": 66748356
        }
    };


    var cmd = {
        "/role/get-role": {
            "companyId": 1,
            "name": "Guest"
        }
    };

    var cmd = {
        "/role/get-user-group-roles": {
            "userId": 66748356,
            groupId: 67510365
        }
    };

    var cmd = {
        "/role/get-role": {
            "companyId": 1,
            "name": "Guest"
        }
    };

    var cmd = {
        "/permission/check-permission": {
            "groupId": 11,
            "name": "com.liferay.portal.model.Layout",
            "primKey": "74815470"
        }
    };
    var cmd = {
        "/ddlrecordset/get-record-set": {

            recordSetId: 36416693
        }

    };

    var cmd = {
        "/ddmstructure/get-structure": {

            structureId: 36369534
        }

    };

    var cmd = {
        "/permission/check-permission": {
            "groupId": 11,
            "name": "com.liferay.portal.model.Layout",
            "primKey": "74815470"
        }
    };


    var cmd = {
        "/layout/get-layouts": {
            "groupId": 67510365,
            "privateLayout": false
        }
    };
    /*
          biggulp.invoke_liferay(config, cmd, function(body) {
            body.forEach(function(elem) {
                    console.log(elem.plid + " " + elem.friendlyURL);
                
            })  ;      
        });
    
    */
    var cmd = {
        '/permission/set-role-permission':
        {
            roleId: 11,
            groupId: 67510365,
            name: 'com.liferay.portal.model.Layout',
            scope: 4,
            primKey: '74815470',
            actionId: 'VIEW'
        }
    };

    var cmd = {
        '/resourcepermission/add-resource-permission':
        {
            groupId: 67510365,
            companyId: 1,
            name: 'com.liferay.portal.model.Layout',
            scope: 4,
            primKey: '74815470',
            roleId: 11,
            actionId: "VIEW"
        }
    };

    var cmd = {
        '/resourcepermission/set-individual-resource-permissions':
        {
            groupId: 67510365,
            companyId: 1,
            name: 'com.liferay.portal.model.Layout',
            primKey: '74815470',
            roleIdsToActionIds: {
                "11": "VIEW"
            }
        }
    };


    var cmd = {
        '/resourcepermission/remove-resource-permission':
        {
            groupId: 67510365,
            companyId: 1,
            name: 'com.liferay.portal.model.Layout',
            scope: 4,
            primKey: '74815470',
            roleId: 11,
            actionId: 'VIEW'
        }
    };




    biggulp.invoke_liferay(config, cmd, function (body) {
        console.log("we are now done", body);
    });

});

gulp.task("list-layouts", function () {
    var biggulp = require("./biggulp.js");
    var cmd = {
        "/layout/get-layouts": {
            "groupId": 67510365,
            "privateLayout": false
        }
    };

    var minimist = require('minimist');



    var options = minimist(process.argv.slice(2));

    if (options && options.searchstr) {
        console.log("Using search string " + options.searchstr);
    }
    biggulp.invoke_liferay(config, cmd, function (body) {
        body.forEach(function (elem) {

            if (options && options.searchstr) {

                if (elem.friendlyURL.indexOf(options.searchstr) >= 0) {
                    console.log(elem.plid + " " + elem.friendlyURL);
                }
            }
            else {
                console.log(elem.plid + " " + elem.friendlyURL);
            }
        });
    });
});

gulp.task('spain-perms', function () {
    var biggulp = require("./biggulp.js");

    function addGrant(primKey) {
        return {
            '/resourcepermission/set-individual-resource-permissions':
            {
                groupId: 67510365,
                companyId: 1,
                name: 'com.liferay.portal.model.Layout',
                primKey: "" + primKey,
                roleIdsToActionIds: {
                    "11": "VIEW"
                }
            }
        };
    }

    function addRevoke(primKey) {
        return {
            '/resourcepermission/remove-resource-permission':
            {
                groupId: 67510365,
                companyId: 1,
                name: 'com.liferay.portal.model.Layout',
                scope: 4,
                primKey: "" + primKey,
                roleId: 11,
                actionId: 'VIEW'
            }
        };
    }



    var spainPublic =
        ["73725067",
            "73725070",
            "73728642",
            "73997932",
            "73997937",
            "73997939",
            "74013753",
            "73997940",
            "73997942",
            "74006172"
        ];

    var spainAdmin =
        [
            "74094686",
            "74540630",
            "74540659"];

    var bigCommand = [];

    spainPublic.forEach(function (elem) {
        bigCommand.push(addGrant(elem));
    });
    spainAdmin.forEach(function (elem) {
        bigCommand.push(addRevoke(elem));
    });

    biggulp.invoke_liferay(config, bigCommand, function (body) {
        console.log("we are now done", body);
    });
});

gulp.task('devcon-perms', function () {
    var biggulp = require("./biggulp.js");

    function addGrant(primKey) {
        return {
            '/resourcepermission/set-individual-resource-permissions':
            {
                groupId: 67510365,
                companyId: 1,
                name: 'com.liferay.portal.model.Layout',
                primKey: "" + primKey,
                roleIdsToActionIds: {
                    "11": "VIEW"
                }
            }
        };
    }

    function addRevoke(primKey) {
        return {
            '/resourcepermission/remove-resource-permission':
            {
                groupId: 67510365,
                companyId: 1,
                name: 'com.liferay.portal.model.Layout',
                scope: 4,
                primKey: "" + primKey,
                roleId: 11,
                actionId: 'VIEW'
            }
        };
    }

    var public =
        [
            "73617760",
            "73617891",
            "74384196",
            "74384212",
            "74384221",
            "74384222",
            "74384223",

            "74384224",

        ];

    var admin =
        [
            "74815433",
            "74815554",
            "74815464",
            "74815470",
        ];

    var bigCommand = [];

    public.forEach(function (elem) {
        bigCommand.push(addGrant(elem));
    });
    admin.forEach(function (elem) {
        bigCommand.push(addRevoke(elem));
    });

    biggulp.invoke_liferay(config, bigCommand, function (body) {
        console.log("we are now done", body);
    });
});




gulp.task("get-template", function () {
    var biggulp = require("./biggulp.js");
    var cmd = {
        '/journaltemplate/get-template': {
            "groupId": 67510365,
            "templateId": false
        }
    };

    biggulp.invoke_liferay(config, cmd, function (body) {
        body.forEach(function (elem) {

            console.log(elem.plid + " " + elem.friendlyURL);
        });
    });
});

gulp.task("get-structures", function () {
      var config = JSON.parse(fs.readFileSync('./config_local.json'));
    var biggulp = require("./biggulp.js");
    var cmd = {
        '/journalstructure/get-structures': {
            "groupId": config.groupId

        }
    };


    biggulp.invoke_liferay(config, cmd, function (body) {
        body.forEach(function (elem) {

            console.log(elem.structureId + ": " + elem.nameCurrentValue);
            var cmdTemplate = {
                '/journaltemplate/get-structure-templates': {
                    "groupId": config.groupId,
                    "structureId": elem.structureId
                }
            };
            biggulp.invoke_liferay(config, cmdTemplate, function (templateBody) {
                templateBody.forEach(function (templateElem) {
                    //xsl is content
                    console.log(templateElem.templateId + ": " + templateElem.nameCurrentValue);
                });
            });


        });
    });
});



gulp.task("get-templates", function () {
    var templateConfig = JSON.parse(fs.readFileSync('./template.json'));

    templateConfig.forEach(function (template) {
       
        var cmd = {
            '/journaltemplate/get-template': {
                "groupId": template.groupId,
                "templateId": template.templateId
            }
        };
        liferay.invoke_liferay(config, cmd, function (body) {
            logger.info("Writing template " + body.nameCurrentValue + " to " + template.filename);
            fs.writeFile(template.filename, body.xsl);
        });
    });
});


gulp.task("update-templates", function () {
    var templateConfig = JSON.parse(fs.readFileSync('./template.json'));

    templateConfig.forEach(function (template) {
        var templateFileContent = fs.readFileSync(template.filename).toString();
        var cmd = {
            "$template = /journaltemplate/get-template": {
                "groupId": template.groupId,
                "templateId": template.templateId,
                "$update = /journaltemplate/update-template": {
                    "groupId": template.groupId,
                    "templateId": template.templateId,
                    "@structureId": "$template.structureId",
                    "nameMap": { "en_US": template.name },
                    "descriptionMap": null,
                    "xsl": templateFileContent,
                    "formatXsl": false,
                    "@langType": "$template.langType",
                    "@cacheable": "$template.cacheable"
                }
            }
        };
     logger.info("Updating template " + template.name + " from " + template.filename);
        liferay.invoke_liferay(config, cmd, function (body) {
            console.log(body);
        });
    });
});



gulp.task('resize-hotel', function () {
    var imageResize = require('gulp-image-resize');
 
  gulp.src('images/hotels/*')
    .pipe(imageResize({ 
      height : 200
      }))
    .pipe(gulp.dest('build/images/hotel'));
});


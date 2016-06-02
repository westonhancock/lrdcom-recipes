// Include gulp & gulp plugins
var concat = require('gulp-concat');
var gulp = require('gulp');
var htmlToJs = require('gulp-html-to-js');
var sass = require('gulp-ruby-sass');
var fileinclude = require('gulp-file-include');
var runSequence = require('run-sequence');

// Compile SASS
gulp.task(
	'sass',
	function() {
		return sass(
			'src/scss/*.scss',
			{
				style: 'compressed'
			}
		)
		.pipe(concat('app.css'))
		.pipe(gulp.dest('css'));
	}
);

gulp.task(
	'scripts',
	function() {
		return gulp.src(
			[
				// core files
				'src/js/config.js',
				'src/js/data.js',
				'src/js/ui.js',
				'src/js/core.js',

				// our utils
				'src/js/modules/*.js',

				// step views
				'src/js/modules/steps/step1/view.js',
				'src/js/modules/steps/step2/view.js',
				'src/js/modules/steps/step3/view.js',

				// steps modules and its children
				'src/js/modules/steps/controller.js',
				'src/js/modules/steps/step1/controller.js',
				'src/js/modules/steps/step2/controller.js',
				'src/js/modules/steps/step3/controller.js',

				'src/js/init.js'
			]
		).pipe(concat('app.js')).pipe(gulp.dest('js'));
	}
);

// turn HTML files into JS
gulp.task(
	'step1:view',
	function() {
		return gulp.src(
			'src/js/modules/steps/step1/*.html'
		).pipe(
			htmlToJs(
				{
					concat: 'view.js',
					global: 'step1view'
				}
			)
		).pipe(
			gulp.dest('src/js/modules/steps/step1')
		);
	}
);

// turn HTML files into JS
gulp.task(
	'step2:view',
	function() {
		return gulp.src(
			'src/js/modules/steps/step2/*.html'
		).pipe(
			htmlToJs(
				{
					concat: 'view.js',
					global: 'step2view'
				}
			)
		).pipe(
			gulp.dest('src/js/modules/steps/step2')
		);
	}
);

// turn HTML files into JS
gulp.task(
	'step3:view',
	function() {
		return gulp.src(
			'src/js/modules/steps/step3/*.html'
			).pipe(
			htmlToJs(
				{
					concat: 'view.js',
					global: 'step3view'
				}
			)
		).pipe(
			gulp.dest('src/js/modules/steps/step3')
		);
	}
);

gulp.task(
	'compile:views',
	[
		'step1:view',
		'step2:view',
		'step3:view'
	]
);

// build our application index.vm
gulp.task(
	'fileinclude', 
	function() {
	  gulp.src(['src/index.vm'])
	    .pipe(fileinclude({
	      prefix: '@@',
	      basepath: '@file'
	    }
	))
	    .pipe(gulp.dest('./'));
	}
);

// Watch for changes
gulp.task(
	'watch',
	function() {

		// Watch .js files
		gulp.watch(
			'src/js/**/*.js',
			function() {
				runSequence('scripts', 'fileinclude')
			}
		);

		// watch .html files
		gulp.watch(
			'src/js/**/*.html',
			[
				'compile:views'
			]
		);

		// Watch .scss files
		gulp.watch(
			'src/scss/*.scss',
			function() {
				runSequence('sass', 'fileinclude')
			}
		);
	}
);

// Default Task
gulp.task('default',	
	function() {
		runSequence('compile:views', 'scripts', 'sass', 'fileinclude', 'watch')
	}
);
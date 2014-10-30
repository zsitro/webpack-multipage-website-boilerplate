var gulp = require('gulp');
// var sass = require('gulp-ruby-sass');
var jade = require('gulp-jade');
var prettify = require('gulp-prettify');
var autoprefixer = require('gulp-autoprefixer');
var webserver = require('gulp-webserver');
var es = require('event-stream');
var webpack = require('webpack');
var concat = require('gulp-concat');
var webpackConfig = require("./webpack.config.js");
/**
 * Jade
 */
gulp.task('jade', function() {
	gulp.src(['./src/views/*.jade', '!src/views/**/{_,dp-}*.jade'])
		.pipe(jade({
			pretty: false,
			data: {
				theme: {},
				dp:{
					page:{},
					project: { name: "Meow!"}
				}
			}
		}))
		.pipe(prettify({
			indent: 1,
			indent_size: 1,
			indent_char: '	',
			wrap_line_length: 0,
			preserve_newlines: true,
			padcomments: true,
			brace_style: 'expand',
			max_preserve_newlines: 2,
			unformatted: ['pre']
		}))
		.pipe(gulp.dest('./dist'));
});

/**
 * Scss
 */
gulp.task('scss', function() {
    gulp.src('src/scss/main.scss')
        .pipe(sass())
        .pipe(autoprefixer('last 2 version', 'ie 9'))
        .pipe(gulp.dest('dist/css'));
});


/**
 * Vendor bundle
 */
gulp.task("vendor", function(callback) {
	gulp.src([
		'./bower_components/jquery/dist/jquery.js',
		'./bower_components/imagelightbox/src/imagelightbox.js'
	])
	.pipe(concat({ path: 'vendor.js' }))
	.pipe(gulp.dest('./dist/scripts'));
});

/**
 * Application Scripts
 */
gulp.task("webpack", function(callback) {
	// modify some webpack config options
	var myConfig = Object.create(webpackConfig);
	myConfig.plugins = myConfig.plugins.concat(
		new webpack.ProvidePlugin({
			// jQuery: "jquery",
			// $: "jquery"
		}),
		new webpack.optimize.DedupePlugin()
		// new webpack.optimize.UglifyJsPlugin(),
		// new webpack.optimize.CommonsChunkPlugin("commons.chunk.js")
	);

	// run webpack
	webpack(myConfig, function(err, stats) {
		if(err) throw new gutil.PluginError("webpack", err);
		console.log("[webpack]", stats.toString({
            // output options
        }));
		// plugins.util.log("[webpack]", stats.toString({
		//colors: true
		// }));
		callback();
	});
});


/**
 * Serve and Livereload
 */
gulp.task('webserver', function() {
	gulp.src('./dist')
	.pipe(webserver({
		livereload: true,
		directoryListing: true,
		open: false
	}));
});

/**
 * Copy some files
 */
gulp.task('static', function () {
	// Fonts
	es.concat(
		gulp.src('./src/fonts/**/*')
			.pipe(gulp.dest('./dist/fonts'))
	);
	// Images
	es.concat(
		gulp.src('./src/images/**/*')
			.pipe(gulp.dest('./dist/images'))
	);
});

/**
 * Watch
 */
gulp.task('watch', function() {
    // gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/coffee/**/*.*', ['webpack']);
    gulp.watch('src/views/**/*.jade', ['jade']);
    gulp.watch('src/scss/**/*.scss', ['scss']);
    gulp.watch('src/images/**/*.*', ['static']);
});

gulp.task('default', ['jade', 'scss', 'webpack', 'watch', 'webserver']);
gulp.task('init', ['static', 'default']);

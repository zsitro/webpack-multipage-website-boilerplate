var gulp = require('gulp');




/** ----------------------------------------------
 * Jade
 */
var jade = require('gulp-jade');
var prettify = require('gulp-prettify');

gulp.task('jade', function() {
	gulp.src(['./src/views/*.jade', '!src/views/**/{_,dp-}*.jade'])
		.pipe(jade({
			pretty: false,
			filename: './src/views/',
			data: {
				theme: {},
				dp:{
					page:{},
					project: { name: "__multipageBoilerplate__"}
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




/** ----------------------------------------------
 * Scss
 */
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('scss', function() {
    return sass('src/scss/main.scss', { sourcemap: false })
		.on('error', function (err) {
			console.error('Error', err.message);
		})
        .pipe(autoprefixer({
			browsers: ['last 2 versions', 'last 3 iOS versions'],
			cascade: false,
			flexbox: true,
		}))
        .pipe(gulp.dest('dist/css'));
});




/** ----------------------------------------------
 * Vendor bundle
 */
var expect = require('files-exist');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
gulp.task("vendor", function(callback) {
	gulp.src(expect([
		'./bower_components/jquery/dist/jquery.js',
		// './bower_components/underscore/underscore.js',
		// './bower_components/jcrop/js/jquery.Jcrop.min.js',
		// './bower_components/slick-carousel/slick/slick.min.js',
		// './bower_components/jquery.cookie/jquery.cookie.js',
		// './bower_components/dropzone/downloads/dropzone.js',
		// './bower_components/imagelightbox/src/imagelightbox.js',
		// './bower_components/jquery.populate/jquery.populate.js',
		// './bower_components/imagesloaded/imagesloaded.pkgd.min.js',
		// './bower_components/matchHeight/jquery.matchHeight-min.js',
		// './bower_components/ubilabs-geocomplete/jquery.geocomplete.js',
		'./bower_components/jquery.browser/dist/jquery.browser.min.js',
		// './bower_components/jquery-validation/dist/jquery.validate.min.js',
		// './bower_components/jquery.validation/dist/additional-methods.js',
		// './bower_components/jquery.inputmask/dist/inputmask/jquery.inputmask.js',
		// './bower_components/jquery-throttle-debounce/jquery.ba-throttle-debounce.min.js',
		// './bower_components/raty/lib/jquery.raty.js',
		// './bower_components/vide/dist/jquery.vide.min.js',
		// './src/coffee/vendor/modernizr.custom.js', // prior to codrops-menu.js
		// './src/coffee/vendor/codrops-menu.js',

		// Angular
		// './bower_components/angular/angular.js',
		// './bower_components/angular-route/angular-route.js',
		// './bower_components/angular-touch/angular-touch.min.js',
		// './bower_components/angular-sanitize/angular-sanitize.js',

		// jQuery UI components
		// './bower_components/jquery.ui/ui/datepicker.js',
		// './bower_components/jquery.ui/ui/core.js',
		// './bower_components/jquery.ui/ui/widget.js',
		// './bower_components/jquery.ui/ui/mouse.js',
		// './bower_components/jquery.ui/ui/position.js',
		// './bower_components/jquery.ui/ui/menu.js',
		// './bower_components/jquery.ui/ui/autocomplete.js',
		// './bower_components/jquery.ui/ui/slider.js',

		// Bootstrap components
		// './bower_components/bootstrap-js-components/dist/alert.js',
		// './bower_components/bootstrap-js-components/dist/collapse.js',
		// './bower_components/bootstrap-js-components/dist/dropdown.js',
		// './bower_components/bootstrap-js-components/dist/transition.js',
		// './bower_components/bootstrap-js-components/dist/modal.js',
		// './bower_components/bootstrap-js-components/dist/tab.js',
		// './bower_components/bootstrap-js-components/dist/tooltip.js',
		// './bower_components/bootstrap-js-components/dist/popover.js',
		// './bower_components/bootstrap-js-components/dist/scrollspy.js',
		// './bower_components/bootstrap-js-components/dist/dropdown.js',
		// './bower_components/bootstrap-js-components/dist/affix.js',

		// Only for dev:
		// './bower_components/holderjs/holder.js',
	]))
	.pipe(concat({ path: 'vendor.js' }))
	// .pipe(uglify({ mangle: false }))
	.pipe(gulp.dest('./dist/scripts'));
});




/** ----------------------------------------------
 * Application Scripts
 */
var webpack = require('webpack');
var webpackConfig = require("./webpack.config.js");

gulp.task("webpack", function(callback) {
	// modify some webpack config options
	var myConfig = Object.create(webpackConfig);
	myConfig.plugins = myConfig.plugins.concat(
		new webpack.ProvidePlugin({
			// jQuery: "jquery",
			// $: "jquery"
		}),
		new webpack.optimize.DedupePlugin()
		// new webpack.optimize.UglifyJsPlugin()
		// new webpack.optimize.CommonsChunkPlugin("commons.chunk.js")
	);

	// run webpack
	webpack(myConfig, function(err, stats) {
		if(err) throw new gutil.PluginError("webpack", err);
		console.log("[webpack]", stats.toString({
            		chunks: false,
			colors: true
        	}));
		callback();
	});
});




/** ----------------------------------------------
 * Serve and Livereload
 */
// var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
// 	gulp.src('./dist')
// 	.pipe(webserver({
// 		livereload: true,
// 		directoryListing: true,
// 		open: false,
// 		port: 8001
// 	}));
});




/** ----------------------------------------------
 * SVG SPRITE
 */
var svgstore = require('gulp-svgstore');
var cheerio = require('gulp-cheerio');

gulp.task('svg', function () {
    return gulp
        .src('./src/svg/*.svg')
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[transform="scale(NaN)"]').removeAttr('transform');
            },
            parserOptions: { xmlMode: true }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest('./dist/svg'));
});




/** ----------------------------------------------
 * Image optimization
 */
var pngquant = require('imagemin-pngquant');
var optipng = require('imagemin-optipng');
var jpegoptim = require('imagemin-jpegoptim');
var svgo = require('svgo');
var clean = require('gulp-clean');

gulp.task('images-optimize', function () {
	gulp.src('./src/images/**/*.{png,jpg,jpeg,gif}')
		.pipe(pngquant({quality: '65-80', speed: 4})())
		.pipe(optipng({optimizationLevel: 3})())
		.pipe(jpegoptim({max: 70, progressive: true})())
		// .pipe(svgo()())
		.pipe(gulp.dest('./dist/images'));
});
gulp.task('images-clean', function () {
    return gulp.src('./dist/images', {read: false})
        .pipe(clean());
});
gulp.task('images', ['images-clean', 'images-optimize']);




/** ----------------------------------------------
 * Watch
 */
gulp.task('watch', function() {
    gulp.watch('src/coffee/**/*.*', ['webpack']);
    gulp.watch('src/views/**/*.jade', ['jade']);
    gulp.watch('src/scss/**/*.scss', ['scss']);
    gulp.watch('src/images/**/*.*', ['images']);
});

gulp.task('default', ['jade', 'scss', 'webpack', 'watch', 'webserver']);
// gulp.task('init', ['static', 'default']);

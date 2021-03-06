var gulp = require('gulp');

var jshint = require('gulp-jshint');
	sass = require('gulp-sass');
	imagemin = require('gulp-imagemin');
	browserify = require('browserify');
	uglify = require('gulp-uglify');
	minifyHTML = require('gulp-minify-html');
	minifyCSS = require('gulp-minify-css');
	concat = require('gulp-concat');
	rename = require('gulp-rename');
	source = require('vinyl-source-stream');
	buffer = require('vinyl-buffer');
	pngquant = require('imagemin-pngquant');


// Javascript linting task
gulp.task('jshint', function() {
	return gulp.src('site/js/*.js')
		.pipe(jshint())
		.pipe (jshint.reporter('default'));
});

// Compile Sass task
gulp.task('sass', function() {
	return gulp.src('site/scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('site/css'));
});

// Watch task
gulp.task('watch', function() {
	gulp.watch('site/js/*.js', ['jshint']);
	gulp.watch('site/scss/*.scss', ['sass']);
});

// Default task
gulp.task('default', ['jshint', 'sass', 'watch']);

// Minify index
gulp.task('html', function() {
	return gulp.src('site/index.html')
		//.pipe(minifyHTML())
		.pipe(gulp.dest('build/'));
});

// Javascript build task, removes whitespace and concantenates all files
gulp.task('scripts', function() {
	return browserify('./site/js/main.js')
		.bundle()
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest('build/js'));
});

// Styles build task, concantenates all the style files
gulp.task('styles', ['sass'], function() {
	return gulp.src('site/css/*.css')
		.pipe(concat('styles.css'))
		.pipe(gulp.dest('build/css'));
});

// Minify css in build/css
gulp.task('minifyCSS', ['styles'], function() {
	return gulp.src('build/css/*.css')
		.pipe(minifyCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('build/css'));
});

// Image optimization task
gulp.task('images', function() {
	return gulp.src('site/img/*')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewbox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('build/img'));
});

// Build task
gulp.task('build', ['jshint', 'sass', 'styles', 'html', 'scripts', 'images']);




const gulp = require('gulp');

exports.html = function html() {
	gulp.src([
		'src/**/*.html'
	]).pipe(gulp.dest('www'));
}
exports.css = function css() {
	gulp.src([
		'src/**/*.css'
	]).pipe(gulp.dest('www'));
}
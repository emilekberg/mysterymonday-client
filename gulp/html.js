const gulp = require('gulp');

exports.copy = function copy() {
	gulp.src('src/**/*.html')
		.pipe(gulp.dest('www'));
}
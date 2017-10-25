const gulp = require('gulp');
const rollup = require('./gulp/rollup');
const html = require('./gulp/html');
gulp.task('rollup:bundle', rollup.bundle);
gulp.task('rollup:watch', rollup.watch);
gulp.task('copy:html', html.copy);
gulp.task('watch', ['rollup:watch', 'copy:html'], function() {
	gulp.watch('src/**/*.html', ['copy:html']);
});

gulp.task('default', ['rollup:bundle', 'copy:html']);

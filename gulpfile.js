const gulp = require('gulp');
const rollup = require('./gulp/rollup');
const copy = require('./gulp/copy');
const vendors = require('./gulp/vendors');
gulp.task('rollup:bundle', rollup.bundle);
gulp.task('rollup:watch', rollup.watch);
gulp.task('copy:html', copy.html);
gulp.task('vendors:bundle', vendors.bundle);
gulp.task('watch', ['rollup:watch', 'copy:html'], function() {
	gulp.watch('src/**/*.html', ['copy:html']);
});

gulp.task('default', ['rollup:bundle', 'copy:html', 'vendors:bundle']);

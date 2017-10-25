var concat = require('gulp-concat');
const gulp = require('gulp');
const map = exports.map = [
	{ name: 'react', global: 'React', path: 'node_modules/react/umd/react.development.js'},
	{ name: 'react-dom', global: 'ReactDOM', path: 'node_modules/react-dom/umd/react-dom.development.js'},
	{ name: 'react-router', global: 'ReactRouter', path: 'node_modules/react-router/umd/react-router.js'},
	{ name: 'react-router-dom', global: 'ReactRouterDOM', path: 'node_modules/react-router-dom/umd/react-router-dom.js'},
	{ name: 'socket.io-client', global: 'io', path: 'node_modules/socket.io-client/dist/socket.io.js'},
	{ name: 'tslib', global: 'tslib', path: 'node_modules/tslib/tslib.js'}
];
console.log(map.map(x => x.path));
exports.bundle = function bundle() {
	return gulp.src(map.map(x => x.path))
		.pipe(concat('vendors.js'))
		.pipe(gulp.dest('www'));
}
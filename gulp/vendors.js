var concat = require('gulp-concat');
const insert = require('gulp-insert');
const gulp = require('gulp');
const map = exports.map = [
	{ name: 'redux', global: 'Redux', path: 'node_modules/redux/dist/redux.js'},
	{ name: 'react', global: 'React', path: 'node_modules/react/umd/react.development.js'},
	{ name: 'react-dom', global: 'ReactDOM', path: 'node_modules/react-dom/umd/react-dom.development.js'},
	{ name: 'react-router', global: 'ReactRouter', path: 'node_modules/react-router/umd/react-router.js'},
	{ name: 'react-router-dom', global: 'ReactRouterDOM', path: 'node_modules/react-router-dom/umd/react-router-dom.js'},
	{ name: 'react-redux', global: 'ReactRedux', path: 'node_modules/react-redux/dist/react-redux.js'},
	{ name: 'socket.io-client', global: 'io', path: 'node_modules/socket.io-client/dist/socket.io.js'},
	{ name: 'tslib', global: 'tslib', path: 'node_modules/tslib/tslib.js'}
];
const productionMap = exports.map = [
	{ name: 'redux', global: 'Redux', path: 'node_modules/redux/dist/redux.min.js'},
	{ name: 'react', global: 'React', path: 'node_modules/react/umd/react.production.min.js'},
	{ name: 'react-dom', global: 'ReactDOM', path: 'node_modules/react-dom/umd/react-dom.production.min.js'},
	{ name: 'react-router', global: 'ReactRouter', path: 'node_modules/react-router/umd/react-router.min.js'},
	{ name: 'react-router-dom', global: 'ReactRouterDOM', path: 'node_modules/react-router-dom/umd/react-router-dom.min.js'},
	{ name: 'react-redux', global: 'ReactRedux', path: 'node_modules/react-redux/dist/react-redux.min.js'},
	{ name: 'socket.io-client', global: 'io', path: 'node_modules/socket.io-client/dist/socket.io.slim.js'},
	{ name: 'tslib', global: 'tslib', path: 'node_modules/tslib/tslib.js'}
];
console.log(map.map(x => x.path));
exports.bundle = function bundle() {
	return gulp.src(map.map(x => x.path))
		.pipe(insert.prepend("if(global === undefined && window !== undefined) var global = window;"))
		.pipe(concat('vendors.js'))
		.pipe(gulp.dest('www'));
}
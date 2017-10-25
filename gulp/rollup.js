const gulp = require('gulp');
const rollup = require('rollup');
const extend = require('util')._extend
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const typescript = require('rollup-plugin-typescript');
const replace = require('rollup-plugin-replace');
const vendors = require('./vendors');
const inputOptions = {
	input: './src/app.tsx',
	external: vendors.map.map(x => x.name),
	plugins: [
		typescript({typescript: require('typescript')})
	]
}
const globals = {};
vendors.map.forEach((x) => {
	globals[x.name] = x.global;
});
const outputOptions = {
	file: './www/mysterymonday-bundle.js',
	format: 'iife',
	name: 'mysterymonday',
	sourcemap: true,
	globals
}
const watchOptions = extend({
	output: outputOptions,
	watch: {
		include: './src/**'
	}
}, inputOptions);

exports.bundle = async function bundle() {
	const bundle = await rollup.rollup(inputOptions);
	await bundle.write(outputOptions);
}
exports.watch = async function watch() {
	const watcher = rollup.watch(watchOptions);
	watcher.on('event', event => {
		switch(event.code) {
			case 'BUNDLE_START':
				console.log(`file changed: ${event.input}`);
				break;
			case 'BUNDLE_END':
				console.log(`build time: ${event.duration/1000}s`);
				break;
			case 'ERROR':
				console.log(event);
				break;
			case 'FATAL':
				console.log(event);
				break;
		}
	  });
}


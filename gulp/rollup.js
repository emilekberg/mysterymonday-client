const gulp = require('gulp');
const rollup = require('rollup');
const extend = require('util')._extend
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const typescript = require('rollup-plugin-typescript');
const replace = require('rollup-plugin-replace');

const inputOptions = {
	input: './src/app.tsx',
	external: [
		/*'react',
		'react-dom',
		'react-router',
		'react-router-dom',*/
		'tslib'
	],
	plugins: [
		typescript({typescript: require('typescript')}),
		nodeResolve({
			jsnext: true,
			main: true
		  }),
		  commonjs({
			// non-CommonJS modules will be ignored, but you can also
			// specifically include/exclude files
			include: 'node_modules/**',  // Default: undefined
			exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ],  // Default: undefined
			// these values can also be regular expressions
			// include: /node_modules/
	  
			// search for files other than .js files (must already
			// be transpiled by a previous plugin!)
			extensions: [ '.js', '.coffee', '.ts' ],  // Default: [ '.js' ]
	  
			// if true then uses of `global` won't be dealt with by this plugin
			ignoreGlobal: false,  // Default: false
	  
			// if false then skip sourceMap generation for CommonJS modules
			sourceMap: true,  // Default: true
	  
			// explicitly specify unresolvable named exports
			// (see below for more details)
			namedExports: { 
				'./node_modules/react/index.js': ['Component', 'createElement', 'render'],
				'./node_modules/react-dom/index.js': ['render']
			},  // Default: undefined
				
	  
			// sometimes you have to leave require statements
			// unconverted. Pass an array containing the IDs
			// or a `id => boolean` function. Only use this
			// option if you know what you're doing!
			ignore: [ 'conditional-runtime-dependency' ]
		  }),
		  replace({
			'process.env.NODE_ENV': JSON.stringify( 'production' )
		  })
	]
}
const outputOptions = {
	file: './www/mysterymonday-bundle.js',
	format: 'iife',
	name: 'mysterymonday',
	sourcemap: true,
	globals: {
		/*'react': 'React',
		'react-dom': 'ReactDOM',
		'react-router': 'ReactRouter',
		'react-router-dom': 'ReactRouterDOM',*/
		'tslib': 'tslib'
	}
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


const webpack = require('webpack')
const merge = require('webpack-merge')
const HTMLWebpackTemplate = require('html-webpack-plugin')
const root = require('./webpack/helpers').root(__dirname)
const devServer = require('./webpack/dev-server')
const typescript = require('./webpack/typescript')
const pug = require('./webpack/pug')
const sass = require('./webpack/sass')
const file = require('./webpack/file')
const production = require('./webpack/production')
const DEV_PORT = 4000

module.exports = (env = {}) => {
	const workingMode = env.prod ? 'production' : 'development'
	const baseHref = env.baseHref
	const context = root('src')
	const entry = {
		polyfill: './polyfills.ts',
		vendor: './vendors.ts',
		app: './index.ts',
	}

	const output = {
		filename: env.prod ? '[name]-[hash].js' : '[name].js',
		chunkFilename: env.prod ? '[id]-[hash].js' : '[id].part.js',
		path: root('./dist'),
		pathinfo: !env.prod, // should include path name comment for every import
		publicPath: env.baseHref ? `${baseHref}/` : undefined,
	}

	const resolve = {
		extensions: ['.ts', '.js', '.json'],
		modules: [
			root('src'),
			'node_modules',
		],
		alias: {
			shared: root('src/modules/shared'),
			styles: root('src/styles'),
			modules: root('src/modules'),
			images: root('src/images'),
			config: root('./config.json'),
		},
	}

	const plugins = [
		new webpack.DefinePlugin({
			WORKING_MODE: JSON.stringify(workingMode),
			BASE_HREF: JSON.stringify(baseHref || '/'),
		}),

		new HTMLWebpackTemplate({
			template: 'public/index.html',
		}),

		/**
		 * get rid of critical import warning
		 * from https://github.com/angular/angular/issues/11580
		 */
		new webpack.ContextReplacementPlugin(
			// The (\\|\/) piece accounts for path separators in *nix and Windows
			/angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
			root('./src') // location of your src
		),
	]

	const config = merge(
		{
			context,
			resolve,
			entry,
			output,
			plugins,
			devtool: env.prod ? 'source-map' : 'cheap-module-eval-source-map',
			bail: !!env.prod,
		},
		devServer(DEV_PORT, baseHref),
		typescript(env),
		pug(root('src')),
		sass([
			root('src/styles'),
			root('src/plugins'),
		], env),
		file(env),
		production(env)
	)

	return config
}

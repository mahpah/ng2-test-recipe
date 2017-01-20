const { ForkCheckerPlugin } = require('awesome-typescript-loader')
const { optimize } = require('webpack')
const { removeEmpty } = require('./helpers');

module.exports = (env) => (
	{
		module: {
			rules: [{
				test: /\.ts$/,
				loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
				exclude: /node_modules/,
			}],
		},
		plugins: removeEmpty([
			new ForkCheckerPlugin(),
			env.test ? undefined : new optimize.CommonsChunkPlugin({
				name: ['app', 'vendor', 'polyfill'],
				minChunks: Infinity,
			}),
		]),
	}
)

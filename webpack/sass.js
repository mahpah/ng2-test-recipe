const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = (externalStyle, env) => {
	if (env.test) {
		return {
			module: {
				rules: [{
					test: /\.scss/,
					loaders: 'null-loader',
				}],
			},
		}
	}

	return {
		module: {
			rules: [{
				test: /\.scss/,
				loaders: [
					'css-to-string-loader', 'css-loader?-minimize',
					'resolve-url-loader', 'sass-loader?sourceMaps',
				],
				exclude: externalStyle,
			},
			{
				test: /\.scss/,
				loader: ExtractTextPlugin.extract([
					'css-loader',
					'resolve-url-loader',
					'sass-loader?sourceMap',
				]),
				include: externalStyle,
			}, {
				test: /\.css/,
				loader: ExtractTextPlugin.extract(['css-loader', 'resolve-url-loader']),
			}],
		},

		plugins: [
			new ExtractTextPlugin('[name].css'),
		],
	}
}

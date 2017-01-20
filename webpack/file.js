module.exports = (env) => {
	let imageLoader = 'null-loader'
	let fileLoader = 'null-loader'

	if (env.dev) {
		fileLoader = 'url-loader?name=assets/[name].[hash].[ext]'
		imageLoader = ['file-loader?hash=sha512&digest=hex&name=[hash].[ext]']
	}

	if (env.prod) {
		fileLoader = 'url-loader?limit=50'
		imageLoader = [
			'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
			'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false',
		]
	}

	return {
		module: {
			rules: [
				{
					test: /\.json$/,
					loader: 'json-loader',
				}, {
					test: /\.(woff|woff2|ttf|eot|ico)$/,
					loader: fileLoader,
				}, {
					test: /\.(jpe?g|png|gif|svg)$/i,
					loaders: imageLoader,
				},
			],
		},
	}
}

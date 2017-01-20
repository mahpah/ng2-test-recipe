module.exports = (root) => ({
	module: {
		rules: [{
			test: /\.jade/,
			loaders: [
				`html-loader?root=${root}`,
				`pug-html-loader?${JSON.stringify({ doctype: 'html', exports: false })}`,
			],
		}],
	},
})

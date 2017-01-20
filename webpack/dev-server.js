module.exports = (port, baseHref) => ({
	devServer: {
		historyApiFallback: baseHref ? {
			index: `${baseHref}/`,
		} : true,
		stats: 'minimal',
		port,
	},
})

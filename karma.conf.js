const webpackConfig = require('./webpack.config')({ test: true })

module.exports = (config) => {
	const karmaConfig = {
		basePath: '',

		frameworks: ['jasmine'],

		files: [
			{ pattern: './karma-test-shim.js', watched: false },
		],

		preprocessors: {
			'./karma-test-shim.js': ['webpack', 'sourcemap'],
		},

		webpack: webpackConfig,

		webpackMiddleware: {
			stats: 'errors-only',
		},

		webpackServer: {
			noInfo: true,
		},

		reporters: ['progress'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: false,
		browsers: ['Chrome'],
		singleRun: true,
	}

	config.set(karmaConfig)
}

module.exports = {
	app: {
		API_PATH: 'api',
		modules: ["HomeModule"],
		momentLocales: ["cs", "en-gb"]
	},
	webpackDevServer: {
		port: 3000,
		proxy: {
			'/api': {
				target: "http://localhost:8080",
				pathRewrite: { '^/api': ''}
			},
		}
	}
}

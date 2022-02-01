module.exports = {
	app: {
		API_PATH: 'api',
		modules: ["HomeModule"],
		locales: ["cs"]
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

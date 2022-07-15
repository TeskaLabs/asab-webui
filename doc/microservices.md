# ASAB WebUI Microservices

ASAB WebUI Microservices is a page with a list of available microservices. It contains information about their hosts and launch time. By clicking on the particular microservice you will be able to watch the content of that microservice.

## Attention required — yellow flag

In case some microservice contains mistakes, a yellow flag will appear near the title

## Setup

In `config` file, define LMIO Remote Control as a service:

```
module.exports = {
	app: {

		...

	},
	webpackDevServer: {
		port: 3000,
		proxy: {
			'/api/lmio_remote_control': {
				target: 'http://localhost:8086',
				pathRewrite: {'^/api/lmio_remote_control' : ''},
				ws: true
			},
		}
	}
}
```

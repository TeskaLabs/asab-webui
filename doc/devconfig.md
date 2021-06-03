# Use of devConfig

`devConfig` provide configuration for dev usage.

It is a configuration setting for devs to facilitate their work when application is in the development and some of the mandatory properties from e.g. `auth` and `tenant` modules has to be obtained. `devConfig` will help to simulate those properties when running the web server with `yarn start`. For builds using `yarn build` it has no impact.


## Obtain mock userinfo

Mocked `userinfo` is an object of properties obtained after login to the application. To simulate the logged user state, `MOCK_USERINFO` supply the `userinfo` when on development.

`MOCK_USERINFO` can be obtained from the configuration of `devConfig` as in following example:

```
let App = props.app;
let myMockUserInfo = App.devConfig.get("MOCK_USERINFO");
```

`MOCK_USERINFO` is also dispatched to the application's redux store, so it is possible to retrieve it with `mapStateToProps`.

**Important note**: to obtain `MOCK_USERINFO` from store, ASAB WebUI `auth` module must be enabled.


## Mock userinfo properties

Developers can define as many properties they want to simulate e.g. features/items which has not been implemented yet in the backend service providing `userinfo`.

To successfuly simulate the `userinfo`, some properties should be set:

* `preffered_username` - username
* `tenants` - list of tenants
* `roles` - list of roles
* `resources` - list of resources

Above listed properties are crucial to allow developer use parts of the application, which require some level of authentication/authorization.


## Configuration example

Example of `config.js` file with `MOCK_USERINFO`

```
module.exports = {
	app: {
		BASE_URL: 'http://localhost:3000',
		API_PATH: 'api',
		SERVICES: {
			openidconnect: 'openidconnect',
			asab_config: 'asab_config',
			seacat_auth_webui: 'http://localhost:3000/auth'
			}
		},
	devConfig: {
		MOCK_USERINFO: {
			"email": "test@test.te",
			"phone_number": "0123456789",
			"preferred_username": "Test",
			"resources": ["test:testy:read"],
			"roles": ["default/Gringo"],
			"sub": "tst:123456789",
			"tenants": ["default"]
		}
	},
	webPackDevServer: {
		port: 3000,
		proxy: {
			'/api/asab_config': {
				target: "http://localhost:8080",
				pathRewrite: { '^/api/asab_config': ''}
			},
		}
	}
}
```

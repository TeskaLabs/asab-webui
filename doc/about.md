# About page

## Setting about page

The About page is an optional module of ASAB Web UI. It shows the information about app name, release date, its version and vendor. The link to the page is located inside "Maintenance" section of sidebar

```javascript
let ConfigDefaults = {
	title: "LogMan.io",
	version: "1.0",
	release_date: "2020-01-21",
	vendor: "TeskaLabs",
	email: "info@teskalabs.com",
	...
};
```

In this case the next information will be generated in About page:

```
Logman.io
Release | 2020-01-21
Version | 1.0
Vendor  | TeskaLabs
          info@teskalabs.com
```

For a page to be displayed correctly, it is necessary to provide all the information mentioned above except of version. Version is an optional parameter.

### Setup

To load the module, go to `asab-webui/src/modules/asab-config.js`, import it, add a route for it and an item to be displayed

```javascript
...
import AboutScreen from '../about/AboutScreen';

export default class ConfigModule extends Module {
	constructor(app, name) {
		...

		this.Router.addRoute({
			path: "/about",
			exact: true,
			name: "About",
			component: AboutScreen,
		})

		this.Navigation.addItem({
			...
			children: [
				...
				{
					name: "About",
					url: "/about",
					icon: 'cil-info',
				},
			]
		});
	}
}
```

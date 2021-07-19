# About page

## Setting about page

The About page is an optional module of ASAB Web UI. It shows the information about app name, release date, its version, vendor, and email, where the vendor can be reached.

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

For a page to be displayed correctly, it is necessary to provide all the information mentioned above except for the version and release date. Version and release date are an optional parameters.

### Setup

To load the module, go to the top level `index.js` file (`src/index.js`), import and push it right above the render method. The link to the About page will appear as the last navigation link inside sidebar on the left of the screen.

```javascript
...
import AboutModule from 'asab-webui/modules/about';
modules.push(AboutModule);

ReactDOM.render((
	...
))
```

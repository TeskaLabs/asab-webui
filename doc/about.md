# About page

## Setting about page

The About page is an optional module of ASAB Web UI. It shows the information about app name, app web site, its vendor, and email, where the vendor can be reached.

```javascript
let ConfigDefaults = {
	title: "LogMan.io",
	vendor: "TeskaLabs",
	email: "info@teskalabs.com",
	...
};
```

In this case the next information will be generated in About page:

```
LogMan.io
Web site | logman.io
Vendor   | TeskaLabs
          info@teskalabs.com
```

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

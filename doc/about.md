# About page

The About page is an optional module of ASAB Web UI. It consists of cards with the application information. For today, two cards are available — the About card and the User interface card.

## About card
The About card shows the information about the app name, app website, vendor, and email, where the vendor can be reached.

```javascript
let ConfigDefaults = {
	title: "LogMan.io",
	vendor: "TeskaLabs",
	email: "info@teskalabs.com",
	...
};
```

In this case, the next information is generated in the About card:

```
LogMan.io

Web site | logman.io
Vendor   | TeskaLabs
          info@teskalabs.com
```

## User interface card
The User interface card shows the information about the version and build date.

```
User interface

Last build | 2021-07-27
Version    | 8992ba2+dirty
```

## Set About page
To load the module, go to the top level `index.js` file (`src/index.js`), import it and push it right above the render method. The link to the About page will appear as the last navigation link inside the sidebar on the left of the screen.

```javascript
...
import AboutModule from 'asab-webui/modules/about';
modules.push(AboutModule);

ReactDOM.render((
	...
))
```

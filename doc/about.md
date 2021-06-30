# About page

## Setting about page

The About page is set automatically based on the information provided in configurations. It shows the information about app name, release date, its version and vendor.

```
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
Name    | Logman.io
Release | 2020-01-21
Version | 1.0
Vendor  | TeskaLabs
          info@teskalabs.com
```

For a page to be displayed correctly, it is necessary to provide all the information mentioned above except of version. Version is an optional parameter.

### Setup

Load the module on the top-level `index.js` of your ASAB UI application

```
const modules = [];

...

import AboutModule from 'asab-webui/modules/about';
modules.push(AboutModule);
```

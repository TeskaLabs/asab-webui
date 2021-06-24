## Setting about page

The About page is set automatically based on the information provided in configuration. It shows the information about app name, app version and app maintainers.

```
let ConfigDefaults = {
	title: "LogMan.io",
	version: "1.0",
	maintainer: "TeskaLabs",
	email: "info@teskalabs.com",
	...
};
```

In this case the next information will be generated in About page:

```
Name | Logman.io
Version | 1.0
Maintainer | TeskaLabs
Mail to the info@teskalabs.com
```
### Setup

Load the module on the top-level `index.js` of your ASAB UI application

```
const modules = [];

...

import AboutModule from 'asab-webui/modules/about';
modules.push(AboutModule);
```

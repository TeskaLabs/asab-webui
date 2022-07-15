# Branding in ASAB WebUI

## Configuration

Example:

```
let ConfigDefaults = {
	site_title: "TeskaLabs",
	title: "Page Title",
	brand_image: {
		full: "media/logo/header-full.svg",
		minimized: "media/logo/header-minimized.svg",
	},
	sidebarLogo: {
		full: "media/logo/sidebarlogo-full.svg",
		minimized: "media/logo/sidebarlogo-minimized.svg"
	}
};

```

## Dynamic branding configuration

The branding can be configured using a dynamic configuration (aka site config).
This means that the actual logos are loaded from the site configuration after the app is started.
For that reason, it is recommended to use empty SVG logos as pre-configured default.
The empty logos are provided in the ASAB WebUI Demo app.

Example:

```
let ConfigDefaults = {
	site_title: "TeskaLabs",
	title: "Page Title",
	brand_image: {
		full: "media/logo/empty-header-full.svg",
		minimized: "media/logo/empty-header-minimized.svg"
	}
};

```

Dynamic branding configuration can be set as it is in the example below:

```
{
	"site_title": "TeskaLabs",
	"title": "Page Title",
	"brand_image":{
		"full": "path/to/header-full.svg",
		"minimized": "path/to/header-minimized.svg"
	},
	sidebarLogo: {
		full: "media/logo/sidebarlogo-full.svg",
		minimized: "media/logo/sidebarlogo-minimized.svg"
	}
}
```
If no images are provided from any configuration, application takes images `header-full.svg`, `header-minimized.svg` and 
`sidebarlogo-full.svg`, `sidebarlogo-minimized.svg` from application's folder `media/logo`.

## Setting page title
The page title (top of browser and on tab) is set as `site_title | title` if both are available.
If title is available, but site_title is not, the page title will be displayed as `title`.
If none of them is provided in configuration, the basic html title tag will be used.

With the configuration set as above, the title will be: `TeskaLabs | Page Title`


## Styling guide

Every image HAS TO be provided in SVG (vectorized).
Use of pixel formats (PNG, JPG, ...) is strongly discouraged.

### Branding images

Top-left location.

Two sizes:

 * 120x30 (full)
 * 30x30 (minimized)


Note: A full image is also used on the splash screen, 30% of the width of the screen.

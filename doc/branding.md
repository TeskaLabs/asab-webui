# Branding in ASAB WebUI

## Configuration

Example:

```
let ConfigDefaults = {
	brand_image: {
		full: "media/logo/header-full.svg",
		minimized: "media/logo/header-minimized.svg",
	},
	footer_image: {
		src: "media/logo/footer.svg",
		alt: "Created by FooBar Limited",
		href: "https://foobar.org/",
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
	brand_image: {
		full: "media/logo/empty-header-full.svg",
		minimized: "media/logo/empty-header-minimized.svg"
	},
	footer_image: {
		src: "media/logo/empty-footer.svg"
	}
};

```

Dynamic branding configuration can be set as it is in the example below:

```
{
	"brand_image":{
		"full": "path/to/header-full.svg",
		"minimized": "path/to/header-minimized.svg"
	},
	"footer_image":{
		"src": "path/to/footer.svg",
		"alt": "Created by FooBar Unlimited",
		"href": "https://foobar-unlimited.org/"
	}
}
```


## Styling guide

Every image HAS TO be provided in SVG (vectorized).
Use of pixel formats (PNG, JPG, ...) is strongly discouraged.

### Branding images

Top-left location.

Two sizes:

 * 120x30 (full)
 * 30x30 (minimized)


Note: A full image is also used on the splash screen, 30% of the width of the screen.


### Footer image

Bottom-right location.

Size is 120x16.

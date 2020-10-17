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

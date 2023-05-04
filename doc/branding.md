# Branding in ASAB WebUI

## Static branding

Example:

```
let ConfigDefaults = {
	title: "Page Title",
	brandImage: {
		light: {
			full: "path/to/external-header-full.svg",
			minimized: "path/to/external-header-minimized.svg"
		},
		dark: {
			full: "path/to/external-header-full-dark.svg",
			minimized: "path/to/external-header-minimized-dark.svg"
		},
	},
	sidebarLogo: {
		light: {
			full: "media/logo/sidebar-full.svg",
			minimized: "media/logo/sidebar-minimized.svg"
		},
		dark: {
			full: "media/logo/sidebar-full-dark.svg",
			minimized: "media/logo/sidebar-minimized-dark.svg"
		},
	}
};

```

## Dynamic branding

The branding can be configured using a dynamic configuration.

The dynamic configuration is injected with the use of `ngx_http_sub_module`, since it replace the pre-defined content of `index.html` (in our case).

More about `ngx_http_sub_module`: http://nginx.org/en/docs/http/ngx_http_sub_module.html


There are 3 options for dynamic branding - header logo, title and custom CSS styles.

### Header logo

To replace default header logo, the nginx `sub_filter` configuration has to follow `<meta name="header-logo-full">`, `<meta name="header-logo-minimized">` (for light variation) and `<meta name="header-logo-full-dark">` and `<meta name="header-logo-minimized-dark">` (for logo suitable to be used in dark mode) replacement rules with the particular `name`. The replacement must have a `content` prop, otherwise the content of the replacement will not be propagated. `content` has to include a string with path to the logo. *If you are using nginx's `sub_filter` for branding images, please configure **both** dark and light mode. Each with minimized and full versions.*

For the best

Size of the branding images can be found [here](#branding-images)

#### Light

Example of importing light logo variation (which is visible in the light themed version of the application)

```
sub_filter '<meta name="header-logo-full">' '<meta name="header-logo-full" content="/<location>/<path>/<to>/<custom_branding>/<logo-full>.svg">';
sub_filter '<meta name="header-logo-minimized">' '<meta name="header-logo-minimized" content="/<location>/<path>/<to>/<custom_branding>/<logo-minimized>.svg">';
```

#### Dark

Example of importing dark variations of a logo (which is visible in the dark themed version of the application)

```
sub_filter '<meta name="header-logo-full-dark">' '<meta name="header-logo-full-dark" content="/<location>/<path>/<to>/<custom_branding>/<logo-full-dark>.svg">';
sub_filter '<meta name="header-logo-minimized-dark">' '<meta name="header-logo-minimized-dark" content="/<location>/<path>/<to>/<custom_branding>/<logo-minimized-dark>.svg">';
```

### Title

Example of replacing application title, configuration has to follow `<meta name="title">` replacement rules with the particular `name`. The replacement must have a `content` prop, otherwise the content of the replacement will not be propagated. `content` has to include a string with the application title.

```
sub_filter '<meta name="title">' '<meta name="title" content="Custom app title">';
```

### Custom CSS styles

Example of importing custom CSS styles, configuration has to follow `<meta name="custom-css-file">` replacement rules with the particular `name`. The replacement must have a `content` prop, otherwise the content of the replacement will not be propagated. `content` has to include a string with path to the CSS file.

```
sub_filter '<meta name="custom-css-file">' '<meta name="custom-css-file" content="/<location>/<path>/<to>/<custom_branding>/<custom-file>.css">';
```

### Define the nginx path to dynamic branding content

To allow the location of the dynamic (custom) branding content, it has to be defined in the nginx setup.

```
# Path to location (directory) with the custom content
location /<location>/<path>/<to>/<custom_branding> {
	alias /<path>/<to>/<custom_branding>;
}
```

### Full example

Full example of nginx configuration with custom branding

```

...

location /<location> {
	root /<path>/<to>/<build>;
	index index.html;
	sub_filter '<meta name="header-logo-full">' '<meta name="header-logo-full" content="/<location>/<path>/<to>/<custom_branding>/<logo-full>.svg">';
	sub_filter '<meta name="header-logo-minimized">' '<meta name="header-logo-minimized" content="/<location>/<path>/<to>/<custom_branding>/<logo-minimized>.svg">';
	sub_filter '<meta name="header-logo-full-dark">' '<meta name="header-logo-full-dark" content="/<location>/<path>/<to>/<custom_branding>/<logo-full-dark>.svg">';
	sub_filter '<meta name="header-logo-minimized-dark">' '<meta name="header-logo-minimized-dark" content="/<location>/<path>/<to>/<custom_branding>/<logo-minimized-dark>.svg">';
	sub_filter '<meta name="title">' '<meta name="title" content="Custom app title">';
	sub_filter '<meta name="custom-css-file">' '<meta name="custom-css-file" content="/<location>/<path>/<to>/<custom_branding>/<custom-file>.css">';
	sub_filter_once on;
}

# Path to location (directory) with the custom content
location /<location>/<path>/<to>/<custom_branding> {
	alias /<path>/<to>/<custom_branding>;
}

...

```

Example of application's `index.html` setup (for **devs** only) - this is being replaced by nginx

```
<!DOCTYPE html>
<html lang="en">
	<head>

		...

		<!-- Dynamic config start -->
		<meta name="header-logo-full">
		<meta name="header-logo-minimized">
		<meta name="header-logo-full-dark">
		<meta name="header-logo-minimized-dark">
		<meta name="title">
		<meta name="custom-css-file">
		<!-- Dynamic config end -->

		...

	</head>
	</head>
	<body>

		...

	</body>
</html>
```


## Styling guide

Every image HAS TO be provided in SVG (vectorized).
Use of pixel formats (PNG, JPG, ...) is strongly discouraged.
While creating the branding images, use full width/height of the canvas (ratio 3:1 on full and 1:1 on minimized version). <em>No padding is required for optimal viewing experience.</em>

### Branding images

format: **SVG**


full:
 * rendered ratio: `3:1`
 * rendered size: `150x50 px`

minimized:
 * rendered ratio: `1:1`
 * rendered size: `50x50 px`


**Branding** is located in `top-left` corner on large screens. `Fullsize` branding image is used when sidebar is uncollapsed and is substituted by `mimnimized` version upon collapsing. On smaller screens (<768px), branding in sidebar disappeares and only fullsized branding image appears in the `top-center` position of the page.


**Best practices for *branding images***
 * Logo should be suitable for use in both light & dark mode.
 * Ideal brand image should be designed to *match format ratios* both on full screen and on minimized.
 * If brand image consists of text, the text should be centered with font size at least 24px or bigger. Sizes smaller than 24px might cause branding to look disproportionate compared to the rest of the application's elements.
 * If branding image consists of a logo and a text, they should be verticaly aligned to center. Font size should be at least 24px.


**SidebarLogo** is always located at the `bottom` of sidebar. Minimized version appeares upon the sidebar's collapsion. It is advised to define two color variations of a sidebar logo. One for Light and the other for dark theme.

full:
 * rendered size: `90x30 px`

minimized:
 * rendered size: `30x30 px`

Note: A full image is also used on the splash screen, 30% of the width of the screen.

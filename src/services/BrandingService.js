import Service from '../abc/Service';

export default class BrandingService extends Service {

	/*
	Branding service expects `header-logo-full-light.svg` and `header-logo-minimized-light.svg` SVG images
	in `/public/media/logo/` directory:

	* `header-logo-full-light.svg` dimensions: 120 x 30 pixels
	* `header-logo-minimized-light.svg` dimensions: 30 x 30 pixels
	*/

	constructor(app, serviceName="BrandingService"){
		super(app, serviceName)
		// this.Items = [];
	}

	getLogo(config, theme, type="brandImage") {

		if ((type === 'sidebarLogo') && theme && config._defaults?.sidebarLogo && config._defaults?.sidebarLogo[theme]) {
			return config._defaults.sidebarLogo[theme];
		} else if ((type === 'sidebarLogo') && theme && config._defaults?.sidebarLogo && !config._defaults?.sidebarLogo[theme]) {
			return config._defaults.defaultBrandImage
		}

		if (theme && config._dynamic_config?.brandImage) {
			// missing href
			if (config._dynamic_config.brandImage[theme].full == undefined) {
				return {
					full: config._dynamic_config.brandImage[theme].minimized,
					minimized: config._dynamic_config.brandImage[theme].minimized
				}
			}
			if (config._dynamic_config.brandImage[theme].minimized == undefined) {
				return {
					full: config._dynamic_config.brandImage[theme].full,
					minimized: config._dynamic_config.brandImage[theme].full
				}
			}
			return config._dynamic_config.brandImage[theme]
		}

		if (theme && config._defaults?.brandImage && config._defaults?.brandImage[theme]) {
			if (config._defaults?.brandImage[theme]?.minimized == undefined) {
				return {
					full: config._defaults.brandImage[theme]?.full,
					minimized: config._defaults.defaultBrandImage.minimized,
					href: config._defaults.brandImage?.href
				}
			}
			if (config._defaults?.brandImage[theme]?.full == undefined) {
				return {
					full: config._defaults.defaultBrandImage.full,
					minimized: config._defaults.brandImage[theme].minimized,
					href: config._defaults.brandImage?.href
				};
			}
			// missing href
			return config._defaults.brandImage[theme]
		} else {
			// missing href
			return config._defaults.defaultBrandImage;
		}
	}

}

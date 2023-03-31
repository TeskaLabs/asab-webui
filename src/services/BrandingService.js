import Service from '../abc/Service';

export default class BrandingService extends Service {

	/*
	Branding service expects `header-logo-full.svg` and `header-logo-minimized.svg` SVG images
	in `/public/media/logo/` directory:

	* `header-logo-full.svg` dimensions: 120 x 30 pixels
	* `header-logo-minimized.svg` dimensions: 30 x 30 pixels
	*/

	constructor( app, serviceName="BrandingService" ){
		super(app, serviceName)
		this.state = [];
		this.App = app;

		this.brandImage = undefined;
		this.defaultBrandImage = undefined;
		this.sidebarLogo = undefined
	}

	initialize() {
		if (this.App.Services.ConfigService && this.App.Modules.some(obj => obj.Name == "ASABConfigModule")) {
			this.brandImage = this.App.Config.get('brandImage');
			this.defaultBrandImage = this.App.Config.get('defaultBrandImage');
			this.sidebarLogo = this.App.Config.get('sidebarLogo');
		}
	}

	determineSources(imgObject, theme) {
		if (imgObject[theme]?.minimized && imgObject[theme]?.full) {
			return {
				...imgObject[theme],
				href: imgObject.href ?? '/'
			};
		} else if (imgObject[theme]?.minimized) {
			return {
					full: this.defaultBrandImage.full,
					minimized: imgObject[theme].minimized,
					href: imgObject?.href ?? '/'
				};
		} else if (imgObject[theme]?.full) {
			return {
				full: imgObject[theme].full,
				minimized: this.defaultBrandImage.minimized,
				href: imgObject?.href ?? '/'
			}
		} else {
			return {
				...this.defaultBrandImage,
				href: imgObject.href ?? '/'
			}
		}
	}

	// method getLogo returns correct brandImage object to be displayed on the front end based on theme and type (sidebbar logo or main logo)
	getLogo(theme, type="brandImage") {
		if((type === 'sidebarLogo') && theme && this.sidebarLogo) {
			if (this.sidebarLogo[theme]) {
				return this.sidebarLogo[theme];
			} else if (!this.sidebarLogo[theme]) {
				return this.sidebarLogo[theme === 'dark' ? 'light' : 'dark'];
			}
		}

		if (theme && this.brandImage) {
				return this.determineSources(this.brandImage, theme);
		} else {
			return this.defaultBrandImage;
		}
	}
}

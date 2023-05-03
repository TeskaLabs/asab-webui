import Service from '../abc/Service';

export default class BrandingService extends Service {

	/*
	Branding service expects `header-logo-full.svg` and `header-logo-minimized.svg` SVG images
	in `/public/media/logo/` directory:

	* `header-logo-full.svg` dimensions: 150 x 50 pixels
	* `header-logo-minimized.svg` dimensions: 50 x 50 pixels
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
		if (this.App.Services.ConfigService) {
			this.brandImage = this.App.Config.get('brandImage');
			this.defaultBrandImage = this.App.Config.get('defaultBrandImage');
			this.sidebarLogo = this.App.Config.get('sidebarLogo');
		}
	}

	/*  This method returns object containing paths to branding depending on theme. It also  takes care of filling in missing
	values (e.g. when only minimized version was provided in the configuration, the method completes it with full version) */
	_determineSources(imgObject, theme) {
		if (imgObject[theme]?.minimized && imgObject[theme]?.full) {
			return {
				...imgObject[theme],
				href: imgObject.href ?? '/'
			};
		} else if (imgObject[theme]?.minimized) {
			return {
				full: imgObject?.otherTheme?.full ?? this.defaultBrandImage.full,
				minimized: imgObject[theme].minimized,
				href: imgObject?.href ?? '/'
			};
		} else if (imgObject[theme]?.full) {
			return {
				full: imgObject[theme].full,
				minimized: imgObject?.otherTheme?.minimized ?? this.defaultBrandImage.minimized,
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
		/* if we have theme and we've managed to obtain appropriate branding from Config's get method. (this method checks if remote,
		local or default configurations were set up (respectively) and returns the first one it comes across) Then, the `_determineSources`
		method comes to play.  */
		if (theme && this.brandImage) {
			return this._determineSources(this.brandImage, theme);
		} else {
			return this.defaultBrandImage;
		}
	}
}

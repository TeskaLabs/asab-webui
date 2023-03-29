import Service from '../abc/Service';
import { connect } from 'react-redux';

export default class BrandingService extends Service {

	/*
	Branding service expects `header-logo-full.svg` and `header-logo-minimized.svg` SVG images
	in `/public/media/logo/` directory:

	* `header-logo-full.svg` dimensions: 120 x 30 pixels
	* `header-logo-minimized.svg` dimensions: 30 x 30 pixels
	*/

	// constructor(app, serviceName="BrandingService"){
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
			console.log('Config:', this.App.Config);

			this.brandImage = this.App.Config.get('brandImage');
			this.defaultBrandImage = this.App.Config.get('defaultBrandImage');
			this.sidebarLogo = this.App.Config.get('sidebarLogo');
		}
	}

	getLogo(theme, type="brandImage") {

		// let dynamicConfig = config._dynamic_config;
		// console.log('dynamicConfig:', dynamicConfig)

		if ((type === 'sidebarLogo') && theme && this.sidebarLogo && this.sidebarLogo[theme]) {
			return this.sidebarLogo[theme];
		} else if ((type === 'sidebarLogo') && theme && this.sidebarLogo && !this.sidebarLogo[theme]) {
			return defaultBrandImage
		}

		// when we have defined both cases (full & minimized) for light mode, but no dark mode -> light versions for both cases
		// if ((dynamicConfig?.brandImage?.light?.full) && (dynamicConfig?.brandImage?.light?.minimized) && (dynamicConfig?.brandImage?.dark == undefined)) {
		// 	console.log('we here ln 33')
		// 	dynamicConfig.brandImage.dark = dynamicConfig.brandImage.light;
		// }
		// // when we have defined both cases (full & minimized) for dark mode, but no light mode -> light versions for both cases
		// if ((dynamicConfig?.brandImage?.dark?.full) && (dynamicConfig?.brandImage?.dark?.minimized) && (dynamicConfig?.brandImage?.light == undefined)) {
		// 	console.log('we here ln 38')
		// 	dynamicConfig.brandImage.light = dynamicConfig.brandImage.dark;
		// }

		// if ((!dynamicConfig?.brandImage?.light) && (dynamicConfig?.brandImage?.dark?.full == undefined) && (dynamicConfig?.brandImage?.dark?.minimized)) {
		// 	console.log('we here ln 43')
		// 	dynamicConfig.brandImage.light = dynamicConfig.brandImage.dark;
		// }
		// if ((!dynamicConfig?.brandImage?.light) && (dynamicConfig?.brandImage?.dark?.minimized == undefined) && (dynamicConfig?.brandImage?.dark?.full)) {
		// 	console.log('we here ln 47')
		// 	dynamicConfig.brandImage.light = dynamicConfig.brandImage.dark;
		// }
		// if ((!dynamicConfig?.brandImage?.dark) && (dynamicConfig?.brandImage?.light?.full == undefined) && (dynamicConfig?.brandImage?.light?.minimized)) {
		// 	console.log('we here ln 51')
		// 	dynamicConfig.brandImage.dark = dynamicConfig.brandImage.light;
		// }
		// if ((!dynamicConfig?.brandImage?.dark) && (dynamicConfig?.brandImage?.light?.minimized == undefined) && (dynamicConfig?.brandImage?.light?.full)) {
		// 	console.log('we here ln 55')
		// 	dynamicConfig.brandImage.dark = dynamicConfig.brandImage.light;
		// }

		// if (theme && dynamicConfig?.brandImage) {
		// 	if (dynamicConfig.brandImage[theme].full == undefined) {
		// 		return {
		// 			full: dynamicConfig.brandImage[theme].minimized,
		// 			minimized: dynamicConfig.brandImage[theme].minimized
		// 		}
		// 	}
		// 	if (dynamicConfig.brandImage[theme].minimized == undefined) {
		// 		return {
		// 			full: dynamicConfig.brandImage[theme].full,
		// 			minimized: dynamicConfig.brandImage[theme].full
		// 		}
		// 	}
		// 	return dynamicConfig.brandImage[theme]
		// }

		if (theme && this.brandImage && this.brandImage[theme]) {
			if (this.brandImage[theme]?.minimized == undefined) {
				return {
					full: this.brandImage[theme]?.full,
					minimized: this.defaultBrandImage.minimized,
					href: this.brandImage?.href
				}
			}
			if (this.brandImage[theme]?.full == undefined) {
				return {
					full: this.defaultBrandImage.full,
					minimized: this.brandImage[theme].minimized,
					href: this.brandImage?.href
				};
			}
			return this.brandImage[theme]
		} else {
			return this.defaultBrandImage;
		}
	}

}

import Service from '../abc/Service';
import { connect } from 'react-redux';

class BrandingService extends Service {

	/*
	Branding service expects `header-logo-full.svg` and `header-logo-minimized.svg` SVG images
	in `/public/media/logo/` directory:

	* `header-logo-full.svg` dimensions: 120 x 30 pixels
	* `header-logo-minimized.svg` dimensions: 30 x 30 pixels
	*/

	// constructor(app, serviceName="BrandingService"){
	constructor(props, { app, serviceName="BrandingService"}){
		super(props, app, serviceName)
		this.state = props;
	}

	getLogo(config, theme, type="brandImage") {

		console.log('tjos.state: ', this.state)

		const defaultConfig = config._defaults;
		return defaultConfig.defaultBrandImage;
		let dynamicConfig = config._dynamic_config;

		// console.log('defaultConfig:', defaultConfig)
		// console.log('dynamicConfig:', dynamicConfig)

		if ((type === 'sidebarLogo') && theme && defaultConfig?.sidebarLogo && defaultConfig?.sidebarLogo[theme]) {
			return defaultConfig.sidebarLogo[theme];
		} else if ((type === 'sidebarLogo') && theme && defaultConfig?.sidebarLogo && !defaultConfig?.sidebarLogo[theme]) {
			return defaultConfig.defaultBrandImage
		}

		// when we have defined both cases (full & minimized) for light mode, but no dark mode -> light versions for both cases
		if ((dynamicConfig?.brandImage?.light?.full) && (dynamicConfig?.brandImage?.light?.minimized) && (dynamicConfig?.brandImage?.dark == undefined)) {
			console.log('we here ln 33')
			dynamicConfig.brandImage.dark = dynamicConfig.brandImage.light;
		}
		// when we have defined both cases (full & minimized) for dark mode, but no light mode -> light versions for both cases
		if ((dynamicConfig?.brandImage?.dark?.full) && (dynamicConfig?.brandImage?.dark?.minimized) && (dynamicConfig?.brandImage?.light == undefined)) {
			console.log('we here ln 38')
			dynamicConfig.brandImage.light = dynamicConfig.brandImage.dark;
		}

		if ((!dynamicConfig?.brandImage?.light) && (dynamicConfig?.brandImage?.dark?.full == undefined) && (dynamicConfig?.brandImage?.dark?.minimized)) {
			console.log('we here ln 43')
			dynamicConfig.brandImage.light = dynamicConfig.brandImage.dark;
		}
		if ((!dynamicConfig?.brandImage?.light) && (dynamicConfig?.brandImage?.dark?.minimized == undefined) && (dynamicConfig?.brandImage?.dark?.full)) {
			console.log('we here ln 47')
			dynamicConfig.brandImage.light = dynamicConfig.brandImage.dark;
		}
		if ((!dynamicConfig?.brandImage?.dark) && (dynamicConfig?.brandImage?.light?.full == undefined) && (dynamicConfig?.brandImage?.light?.minimized)) {
			console.log('we here ln 51')
			dynamicConfig.brandImage.dark = dynamicConfig.brandImage.light;
		}
		if ((!dynamicConfig?.brandImage?.dark) && (dynamicConfig?.brandImage?.light?.minimized == undefined) && (dynamicConfig?.brandImage?.light?.full)) {
			console.log('we here ln 55')
			dynamicConfig.brandImage.dark = dynamicConfig.brandImage.light;
		}

		if (theme && dynamicConfig?.brandImage) {
			if (dynamicConfig.brandImage[theme].full == undefined) {
				return {
					full: dynamicConfig.brandImage[theme].minimized,
					minimized: dynamicConfig.brandImage[theme].minimized
				}
			}
			if (dynamicConfig.brandImage[theme].minimized == undefined) {
				return {
					full: dynamicConfig.brandImage[theme].full,
					minimized: dynamicConfig.brandImage[theme].full
				}
			}
			return dynamicConfig.brandImage[theme]
		}

		if (theme && defaultConfig?.brandImage && defaultConfig?.brandImage[theme]) {
			if (defaultConfig?.brandImage[theme]?.minimized == undefined) {
				return {
					full: defaultConfig.brandImage[theme]?.full,
					minimized: defaultConfig.defaultBrandImage.minimized,
					href: defaultConfig.brandImage?.href
				}
			}
			if (defaultConfig?.brandImage[theme]?.full == undefined) {
				return {
					full: defaultConfig.defaultBrandImage.full,
					minimized: defaultConfig.brandImage[theme].minimized,
					href: defaultConfig.brandImage?.href
				};
			}
			return defaultConfig.brandImage[theme]
		} else {
			return defaultConfig.defaultBrandImage;
		}
	}

}

function mapStateToProps(state) {
	const { configuration } = state.config
	return { configuration }
}

export default connect(mapStateToProps)(BrandingService)

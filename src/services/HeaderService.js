import Service from '../abc/Service';

export default class HeaderService extends Service {

	/*
	Header service expects `header-logo-full.svg` and `header-logo-minimized.svg` SVG images
	in `/public/media/logo/` directory:

	 * `header-logo-full.svg` dimensions: 150 x 50 pixels
	 * `header-logo-minimized.svg` dimensions: 50 x 50 pixels
	*/

	constructor(app, serviceName="HeaderService"){
		super(app, serviceName)
		this.Items = [];
	}


	initialize() {
		this.App.ConfigService.addDefaults({
			'defaultBrandImage': {
				full: "media/logo/header-logo-full.svg",
				minimized: "media/logo/header-logo-minimized.svg",
				href: undefined,
			}
		}, true)
	}

	/*
	Adding items to the header can be done by using addComponent:

		const headerService = app.locateService("HeaderService");
		headerService.addComponent(NavLink,{children: "My redirect button", href: "#/redirect", style: {marginRight: "2rem"}});

	*/

	addComponent(component, componentProps) {
		this.Items.push({
			'component': component,
			'componentProps':componentProps,
		})
	}

}

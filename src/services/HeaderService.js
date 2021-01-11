import Service from '../abc/Service';

export default class HeaderService extends Service {

	/*
	Header service expects `header-full.svg` and `header-minimized.svg` SVG images
	in `/public/media/logo/` directory:

	 * `header-full.svg` dimensions: 120 x 30 pixels
	 * `header-minimized.svg` dimensions: 30 x 30 pixels
	*/

	constructor(app, serviceName="HeaderService"){
		super(app, serviceName)
		this.Items = [];
	}


	initialize() {
		this.App.ConfigService.addDefaults({
			'default_brand_image': {
				full: "media/logo/header-full.svg",
				minimized: "media/logo/header-minimized.svg",
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

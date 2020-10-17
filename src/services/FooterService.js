import Service from '../abc/Service';

export default class FooterService extends Service {

	/*
	Footer service expects `footer.svg` SVG image in `/public/media/logo/` directory:
	- `footer.svg` dimensions: 120 x 16 pixels

	*/
	constructor(app, serviceName="FooterService"){
		super(app, serviceName)
		this.Items = [];
	}


	initialize(app) {
		this.App.ConfigService.addDefaults({
			'footer_image': {
				src: "media/logo/footer.svg",
				alt: "Created by TeskaLabs",
				href: "https://github.com/TeskaLabs/asab-webui",
			}
		}, false);
	}


	addComponent(component, componentProps) {
		this.Items.push({
			'component': component,
			'componentProps':componentProps,
		})
	}

}

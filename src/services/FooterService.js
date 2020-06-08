import Service from '../abc/Service';

export default class FooterService extends Service {

	/*
	Footer service expects `footer.svg` SVG image
	in `/public/media/logo/` directory:

	 * `footer.svg` dimensions: 120 x 16 pixels

	*/

	constructor(app, serviceName="FooterService"){
		super(app, serviceName)

		this.FooterImage = {
			src: "public/media/logo/footer.svg",
			width: 120,
			height: 16,
			alt: "Created by",
			href: "https://github.com/TeskaLabs/asab-webui",
		};

		this.Items = [];
	}


	setFooterImage(image) {
		this.FooterImage = image;
	}


	addComponent(component, componentProps) {
		this.Items.push({
			'component': component,
			'componentProps':componentProps,
		})
	}

}

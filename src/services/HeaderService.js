import Service from '../abc/Service';

export default class HeaderService extends Service {

	/*
	Header service expects `header-full.svg` and `header-minimized.svg` SVG images
	in `/public/media/logo/` directory:

	 * `header-full.svg` dimensions: 120 x 30 pixels
	 * `header-minimized.svg` dimensions: 30 x 30 pixels

	Alternatively, you may overload them by `setBrandImages()` method.
	*/

	constructor(app, serviceName="HeaderService"){
		super(app, serviceName)

		this.BrandImageFull = {
			src: "public/media/logo/header-full.svg",
			width: 120,
			height: 30,
			alt: app.Config.get('title')
		};

		this.BrandImageMinimized = {
			src: "public/media/logo/header-minimized.svg",
			width: 30,
			height: 30,
			alt: app.Config.get('title')
		};
		
		this.Items = [];
	}


	/*
		Example of the call:

		FooterService.setFooterImage({
			src: "public/media/logo/my-super-footer.svg",
			width: 120,
			height: 16,
			alt: "Created by Foo Bar Ltd",
			href: "https://example.com/",
		});
	*/
	setBrandImages(full, minimalized) {
		this.BrandImageFull = full;
		this.BrandImageMinimized = minimalized;
	}


	addComponent(component, componentProps) {
		this.Items.push({
			'component': component,
			'componentProps':componentProps,
		})
	}

}

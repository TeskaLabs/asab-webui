import Service from '../abc/Service';

export const HEADER_POS_LEFT = 0;
export const HEADER_POS_RIGHT = 1;

export default class HeaderService extends Service{

	constructor(app, serviceName="HeaderService"){
		super(app, serviceName)
		this.BrandTitle = app.Config.get('title');
		this.BrandLogoURL = "public/media/teskalabs/img/logos/logo.svg";
		this.Items = [];
	}

	addComponent(position, component, componentProps) {
		this.Items.push({
			'position': position,
			'component': component,
			'componentProps':componentProps,
		})
	}

	setBrandTitle(title) {
		this.BrandTitle = title;
	}

	setBrandLogo(url) {
		this.BrandLogoURL = url;
	}
}

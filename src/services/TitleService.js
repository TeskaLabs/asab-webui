import Service from '../abc/Service';
export default class TitleService extends Service {
	constructor(app, serviceName="TitleService"){
		super(app, serviceName);
		this.App = app;
	}

	setTitle = (subTitle) => {
		let title = this.App.Config.get("title");
		document.title = (title && subTitle) ? `${title} | ${subTitle}` : title;
	}
}


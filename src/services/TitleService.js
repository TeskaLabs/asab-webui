import Service from '../abc/Service';
export default class TitleService extends Service {
	constructor(app, serviceName="TitleService"){
		super(app, serviceName);
		this.App = app;
		this.title = "";
	}

	initialize() {
		this.title = this.App.Config.get("title");
	}

	setTitle = (subTitle) => {
		document.title = (this.title && subTitle) ? `${this.title} | ${subTitle}` : this.title;
	}
}


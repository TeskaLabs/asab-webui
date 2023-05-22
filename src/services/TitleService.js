import Service from '../abc/Service';
export default class TitleService extends Service {
	constructor(app, serviceName="TitleService"){
		super(app, serviceName);
		this.App = app;
		this.title = this.App.props.configdefaults?.title;
	}

	setTitle = (subTitle) => {
		document.title = this.title ? `${this.title} | ${subTitle}` : this.title;
	}

	render() {
		return null;
	}
}

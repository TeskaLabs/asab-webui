import Module from 'asab-webui/abc/Module';
import I18nService from './service.js';

export default class I18nModule extends Module {

	constructor(app, name, props) {
		super(app, "I18nModule");
		this.App = app;
		this.I18nService = new I18nService(app, "I18nModule");
	}

}

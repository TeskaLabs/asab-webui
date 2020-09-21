import HomeContainer from './containers/HomeContainer'
import Module from 'asab-webui/abc/Module';


export default class HomeModule extends Module {
	constructor(app, name){
		super(app, "HomeModule");
		app.Router.addRoute({ path: '/', exact: true, name: 'Home', component: HomeContainer });
		app.Navigation.addItem({
			name: 'Home',
			url: '/',
			icon: 'cil-home',
		});
	}
}

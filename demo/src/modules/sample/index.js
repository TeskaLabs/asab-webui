import HomeContainer from './containers/HomeContainer'
import Module from 'asab-webui-kit-lite/abc/Module';


export default class SampleModule extends Module {
    constructor(app, name){
        super(app, "SampleModule");
        app.Router.addRoute({ path: '/', exact: true, name: 'Sample Module', component: HomeContainer });

        app.Navigation.addItem({
			name: 'Sample Module',
			url: '/ca',
			icon: 'icon-shield',
        },)
    }
}
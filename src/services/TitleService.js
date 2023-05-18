import Service from '../abc/Service';
export default class TitleService extends Service {
	constructor(app, serviceName="TitleService"){
		super(app, serviceName);
		this.App = app;
		this.title = "";
		this.state = {
			value: ""
		}

		// this.state = {
		// 	pageTitle: 'Заголовок страницы',
		// 	pageSubtitle: ''
		// }

	}



	setTitle = () => {
		console.log("setTitle");
		// this.setState({
		// 	subtitle: "Arina"
		// })
		// this.App.Store.subscribe(() => {
		// 	const currentSubtitle = this.App.Store.getState().crumbs.mainCrumbs;
		// 	if (currentSubtitle !== this.state.pageSubtitle) {
		// 		this.setState({
		// 			pageSubtitle: currentSubtitle
		// 		});
		// 	}
		// });

		// console.log(this.state.pageSubtitle)
		// const subtitle = this.App.Store.getState().crumbs.mainCrumbs;



		// this.App.Store.subscribe(() => {
		// 	this.setState({
		// 		subtitle: this.App.Store.getState().crumbs.mainCrumbs
		// 	});
		// });
		// const { subtitle } = this.props;
		// console.log(subtitle, "subtitle")

		// this.title = this.App.props.configdefaults?.title;
		// console.log(this.title, subtitle, "lalalala")
		// const { title, subtitle } = this.props;
		// document.title = subtitle ? `${this.title} | ${subtitle}` : title;
	}

	render() {
		return null;
	}
}

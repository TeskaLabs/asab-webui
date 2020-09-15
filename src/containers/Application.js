import React, { Component } from 'react';
import * as router from 'react-router-dom';
import { withRouter } from "react-router";
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Axios from 'axios';

import {
	Container,
	Nav, NavItem, NavLink,
	Badge,
	DropdownToggle, DropdownMenu,
	Progress, Fade
} from 'reactstrap';

import {
	AppAside,
	AppAsideToggler,
	AppBreadcrumb2 as AppBreadcrumb,
	AppNavbarBrand
} from '@coreui/react';

import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import SplashScreen from './SplashScreen';

import AlertsComponent from '../alerts/AlertsComponent';
import AlertsReducer from '../alerts/reducer';

import ReduxService from '../services/ReduxService';
import ConfigService from '../config/ConfigService';
import HeaderService from '../services/HeaderService';
import FooterService from '../services/FooterService';

import { ON_TICK, ADD_ALERT } from '../actions';


class Application extends Component {

/*
Example of use hasSidebar and hasBreadcrumb.
It must be set in Application.
If not set, it is considered as true.

...

const config = {
	hasSidebar: false,
	hasBreadcrumb: false
}


ReactDOM.render((
	<BrowserRouter>
		<Application modules={modules} {...config}/>
	</BrowserRouter>
), document.getElementById('app'));

...

Example of settings in Module of the Application
Following above settings, this will show the item in
the header and when the screen is diminished (e.g. screening
using the mobile phone), the item is moved to the sidebar and
it is accessible by the sidebar toggler button.

...

	app.Navigation.addItem({
		name: 'Item 1',
		url: '',
	});

...
	*/

	constructor(props){
		super(props);

		this.Modules = [];
		this.Services = {};

		this.ReduxService = new ReduxService(this, "ReduxService");
		
		this.ConfigService = new ConfigService(this, "ConfigService");
		this.ConfigService.addDefaults(props.configdefaults);
		this.Config = this.ConfigService.Config

		// Set API URL, if not configured
		if (this.Config.get('API_URL') == undefined) {
			this.ConfigService.addDefaults({
				API_URL: window.location.protocol + '//' + window.location.host + '/api/',
			});
		}

		this.Router = new Router(this);
		this.Navigation = new Navigation(this);

		this.SplashscreenRequestors = new Set(); // If not empty, the splash screen will be rendered

		this.HeaderService = new HeaderService(this, "HeaderService");
		this.FooterService = new FooterService(this, "FooterService");

		this.ReduxService.addReducer("alerts", AlertsReducer);

		this.DefaultPath = props.defaultpath

		this.state = {
			networking: 0, // If more than zero, some networking activity is happening
			tickTimer: null,
		}

		// Instantiate modules
		for (var i in props.modules) {
			const module = new props.modules[i](this);
			this.Modules.push(module);
		}

		// Initialize service
		for (var i in this.Services) {
			this.Services[i].initialize();
		}

		// Initialize modules
		for (var i in this.Modules) {
			this.Modules[i].initialize();
		}

		this.state.SplashscreenRequestors = this.SplashscreenRequestors.size;

		// Create store
		const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
		this.Store = Object.keys(this.ReduxService.Reducers).length > 0
			? createStore(combineReducers(this.ReduxService.Reducers), composeEnhancers(applyMiddleware()))
			: createStore((state) => state, composeEnhancers(applyMiddleware()));

		// Ensure that the config is propagated to the redux tree
		this.Config.dispatch(this.Store);
	}

	axiosCreate(path, props) {
		var axios = Axios.create({
			...props,
			baseURL: this.Config.get('API_URL') + path,
		});

		var that = this;

		// We want to be notified when networking activity is taking place
		axios.interceptors.request.use(function (config) {
			that.pushNetworkingIndicator();
			return config;
		}, function (error) {
			return Promise.reject(error);
		});

		axios.interceptors.response.use(function (response) {
			that.popNetworkingIndicator();
			return response;
		}, function (error) {
			that.popNetworkingIndicator();
			return Promise.reject(error);
		});

		return axios;
	}

	// Display and hide networking indicator
	pushNetworkingIndicator() {
		this.setState((prevState, props) => ({
			networking: prevState.networking + 1,
		}));
	}

	popNetworkingIndicator() {
		this.setState((prevState, props) => ({
			networking: prevState.networking - 1,
		}));
	}


	registerService(service) {
		if (service.Name in this.Services) {
			console.warn(`Service ${service.Name} is already registered.`);
			return;
		}
		this.Services[service.Name] = service;
	}

	locateService(name){
		if (!name in this.Services){
			console.warn(`Service ${name} doesn't exist.`);
			return null;
		}
		return this.Services[name];
	}


	// Splash screen

	addSplashScreenRequestor(obj) {
		const origLen = this.SplashscreenRequestors.size;
		this.SplashscreenRequestors.add(obj);
		if (origLen != this.SplashscreenRequestors.size) {
			this.state.SplashscreenRequestors = this.SplashscreenRequestors.size;
		}
	}

	removeSplashScreenRequestor(obj) {
		const origLen = this.SplashscreenRequestors.size;
		this.SplashscreenRequestors.delete(obj);
		if (origLen != this.SplashscreenRequestors.size) {
			this.setState({
				SplashscreenRequestors: this.SplashscreenRequestors.size
			});
		}
	}


	// Alerts
	/*
		levels:
		* danger
		* warning
		* info
		* success
	*/

	addAlert(level, message, expire=5) {
		this.Store.dispatch({
			type: ADD_ALERT,
			level: level,
			message: message,
			expire: expire
		});
	}


	// Ticking

	componentDidMount() {
		let tickTimer = setInterval(this.onTick, 1000, this.Store);
		this.setState({tickTimer});
	}

	componentWillUnmount() {
		clearInterval(this.state.tickTimer);
	}

	onTick(store) {
		store.dispatch({
			type: ON_TICK,
		});
	}


	render() {
		// Render the splash screen if needed
		if (this.state.SplashscreenRequestors > 0) return (
			<Provider store={this.Store}>
				<div className="app">
					<AlertsComponent app={this}/>
					<SplashScreen app={this}/>
				</div>
			</Provider>
		)

		else return (
			<Provider store={this.Store}>
				<div className="app">
					<Fade in={this.state.networking > 0} timeout={50} >
						<div className="networking-indicator progress-bar progress-bar-animated progress-bar-striped" ></div>
					</Fade>
					<AlertsComponent app={this}/>
					<Header app={this}/>
					<div className="app-body">
						{(this.props.hasSidebar || typeof this.props.hasSidebar === 'undefined') ? 
							<Sidebar app={this} navigation={this.Navigation} display="lg"/> : 
							<Sidebar app={this} navigation={this.Navigation} display="xs"/>}
						<main className="main">
							{(this.props.hasBreadcrumb || typeof this.props.hasBreadcrumb === 'undefined') ? 
								<AppBreadcrumb appRoutes={this.Router.Routes} router={router}/>
							: null}
							<Switch>
								{this.Router.Routes.map((route, idx) => {
									return route.component ? (
										<Route
											key={idx}
											path={`${route.path}`}
											exact={route.exact}
											name={route.name}
											render={props => (
												<route.component app={this} {...props} {...route.props} />
											)}
										/>
									) : (null);
								})}
								{this.DefaultPath != undefined ? <Redirect from="/" to={this.DefaultPath} />: null}
							</Switch>
						</main>
					</div>
					<Footer app={this}/>
				</div>
			</Provider>
		)
	}

}


class Router {

	constructor(app){		
		this.Routes = []
	}

	addRoute(route){
		/* Example route:
			{
				path: '/some/path', // Url path
				exact: true,        // Whether path must be matched exactly
				name: 'Some Name',  // Route name
				component: ReactComponent // Component to be rendered
			}
		*/
		this.Routes.push(route);
	}
}


class Navigation {

	constructor(app){
		this.Items = []
	}

	addItem(item){
		/* Example item:
			{
				path: '/some/path', // Url path
				exact: true,        // Whether path must be matched exactly
				name: 'Some Name',  // Route name
				component: ReactComponent // Component to be rendered
			}
		*/
		this.Items.push(item);
	}

	getItems() {
		return {
			items: this.Items
		}
	}
}


export default withRouter(Application);

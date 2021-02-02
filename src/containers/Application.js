import React, { Component } from 'react';
import * as router from 'react-router-dom';
import { withRouter } from "react-router";
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Axios from 'axios';
import { Helmet } from "react-helmet";

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

import { ADD_ALERT, SET_ADVANCED_MODE } from '../actions';


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

	constructor(props) {
		super(props);

		this.Modules = [];
		this.Services = {};

		this.ReduxService = new ReduxService(this, "ReduxService");
		this.ConfigService = new ConfigService(this, "ConfigService");
		this.Config = this.ConfigService.Config

		this.Router = new Router(this);
		this.Navigation = new Navigation(this);

		this.SplashscreenRequestors = new Set(); // If not empty, the splash screen will be rendered

		this.HeaderService = new HeaderService(this, "HeaderService");
		this.FooterService = new FooterService(this, "FooterService");

		this.ReduxService.addReducer("alerts", AlertsReducer);
		this.ReduxService.addReducer("advmode", AdvancedModeReducer);

		this.DefaultPath = props.defaultpath;

		this._handleKeyUp = this._handleKeyUp.bind(this);

		this.state = {
			networking: 0, // If more than zero, some networking activity is happening
			SplashscreenRequestors: 0,
		}

		const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
		this.Store = createStore(combineReducers(this.ReduxService.Reducers), composeEnhancers(applyMiddleware()));

		this.ConfigService.addDefaults(props.configdefaults);
		
		// Set API URL, if not configured
		if (this.Config.get('API_PATH') == undefined && this.Config.get('BASE_URL') == undefined) {
			this.ConfigService.addDefaults({
				API_PATH: window.location.protocol + '//' + window.location.host + '/api',
			});
			console.log("Config value API_PATH not provided, using /api");
		} else if (this.Config.get('API_PATH') == undefined && this.Config.get('BASE_URL') != undefined) {
			this.ConfigService.addDefaults({
				API_PATH: '/api',
			});
			console.log("Config value API_PATH not provided, using /api");
		}

		// Set URL
		if (this.Config.get('BASE_URL') == undefined) {
			this.ConfigService.addDefaults({
				URL: this.Config.get('API_PATH'),
				BASE_URL: "",
			});
			console.log("Config value BASE_URL not provided, using \"\" ");
		} else {
			this.ConfigService.addDefaults({
				URL: this.Config.get('BASE_URL') + this.Config.get('API_PATH'),
			});
		}

		this.Config.dispatch(this.Store);

		this.addSplashScreenRequestor(this);
		this.state.SplashscreenRequestors = this.SplashscreenRequestors.size;

		var that = this;

		async function modules_init() {
			// Instantiate statically imported modules
			for (var i in props.modules) {
				const module = new props.modules[i](that);
				that.Modules.push(module);

				that.Store.replaceReducer(combineReducers(that.ReduxService.Reducers));
				that.Config.dispatch(that.Store);
			}

			// Initialize statically imported modules
			for (var i in that.Modules) {
				that.Modules[i].initialize();
			}
		}
		
		modules_init().then(async function() {
			that.Store.replaceReducer(combineReducers(that.ReduxService.Reducers));
			that.Config.dispatch(that.Store);

			// Initialize all services
			for (var i in that.Services) {
				that.Services[i].initialize();
				that.Config.dispatch(that.Store);
			}

			that.removeSplashScreenRequestor(that);
		});
	}


	axiosCreate(path, props) {
		// Set up URL
		var URL = this.Config.get('URL') + path;

		// Check for external auth module
		if (path.toString().indexOf('http://') !== -1 || path.toString().indexOf('https://') !== -1) {
			URL = path;
		}

		var axios = Axios.create({
			...props,
			baseURL: URL,
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

	locateService(name) {
		if (!name in this.Services) {
			console.warn(`Service ${name} doesn't exist.`);
			return null;
		}
		return this.Services[name];
	}


	_handleKeyUp(event) {

		// CTRL-A enables the advanced mode
		if (event.key == '1' && event.ctrlKey) {
			this.setAdvancedMode(0);
		}

	}

	componentDidMount() {
		document.addEventListener("keyup", this._handleKeyUp, false);
	}

	componentWillUnmount() {
		document.removeEventListener("keyup", this._handleKeyUp, false);
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

	addAlert(level, message, expire = 5) {
		this.Store.dispatch({
			type: ADD_ALERT,
			level: level,
			message: message,
			expire: expire
		});
	}


	setAdvancedMode(enabled) {

		if (enabled === 0) {
			let state = this.Store.getState();
			enabled = !state.advmode.enabled;
		}

		this.Store.dispatch({
			type: SET_ADVANCED_MODE,
			enabled: enabled
		});

		if (enabled) {
			this.addAlert('warning', "Advanced mode enabled.", 1);
		} else {
			this.addAlert('success', "Advanced mode disabled", 1);
		}
	}


	render() {
		// Render the splash screen if needed
		if (this.state.SplashscreenRequestors > 0) return (
			<Provider store={this.Store}>
				<div className="app">
					<AlertsComponent app={this} />
					<SplashScreen app={this} />
					{this.Config.get('title') != null && this.Config.get('title') != undefined ?
						<Helmet>
							<title>{this.Config.get('site_title') ? this.Config.get('site_title') + " | " + this.Config.get('title') : this.Config.get('title')}</title>
						</Helmet>
						: null 
					}
				</div>
			</Provider>
		)

		else return (
			<Provider store={this.Store}>
				<div className="app">
					<Fade in={this.state.networking > 0} timeout={50} >
						<div className="networking-indicator progress-bar progress-bar-animated progress-bar-striped" ></div>
					</Fade>
					<AlertsComponent app={this} />
					{this.Config.get('title') != null && this.Config.get('title') != undefined ?
						<Helmet>
							<title>{this.Config.get('site_title') ? this.Config.get('site_title') + " | " + this.Config.get('title') : this.Config.get('title')}</title>
						</Helmet>
						: null
					}
					<Header app={this} />
					<div className="app-body">
						{(this.props.hasSidebar || typeof this.props.hasSidebar === 'undefined') ?
							<Sidebar app={this} navigation={this.Navigation} display="lg" /> :
							<Sidebar app={this} navigation={this.Navigation} display="xs" />}
						<main className="main">
							{(this.props.hasBreadcrumb || typeof this.props.hasBreadcrumb === 'undefined') ?
								<AppBreadcrumb appRoutes={this.Router.Routes} router={router} />
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
								{this.DefaultPath != undefined ? <Redirect from="/" to={this.DefaultPath} /> : null}
							</Switch>
						</main>
					</div>
					<Footer app={this} />
				</div>
			</Provider>
		)
	}

}


class Router {

	constructor(app) {
		this.Routes = []
	}

	addRoute(route) {
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

	constructor(app) {
		this.Items = []
	}

	addItem(item) {
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


// Advanced mode

const advModeInitialState = {
	enabled: false,
}

function AdvancedModeReducer(state = advModeInitialState, action) {
	switch (action.type) {

		case SET_ADVANCED_MODE: {
			return Object.assign({}, state, {
				enabled: action.enabled
			})
		}

		default:
			return state
	}
}


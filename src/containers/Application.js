import React, { Component, Suspense, useEffect } from 'react';
import * as router from 'react-router-dom';
import { withRouter } from "react-router";
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import Axios from 'axios';
import { Helmet } from "react-helmet";

import { Fade } from 'reactstrap';

import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import SplashScreen from './SplashScreen';
import Breadcrumbs from './Breadcrumbs';
import ErrorHandler from './ErrorHandler';
import Alerts from './Alerts';
import { Spinner } from '../components/Spinner';

import alertsReducer from './Alerts/reducer';
import sidebarReducer from './Sidebar/reducer';
import headerHelpButtonReducer from './Header/reducer';

import ReduxService from '../services/ReduxService';
import ConfigService from '../config/ConfigService';
import HeaderService from '../services/HeaderService';
import FooterService from '../services/FooterService';
import SidebarService from './Sidebar/service';

import TenantSelectionCard from '../modules/tenant/selector/TenantSelectionCard';

import { ADD_ALERT, SET_ADVANCED_MODE, CHANGE_HELP_URL } from '../actions';


class Application extends Component {

	/*
	Example of use hasSidebar and disableAppBreadcrumbs.
	It must be set in Application.
	If not set, it is considered as true.
	
	...
	
	const config = {
		hasSidebar: false,
		disableAppBreadcrumbs: true
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
		this.Config = this.ConfigService.Config;
		this.DevConfig = this.ConfigService.DevConfig; // DEV config, use to simulate userinfo

		this.Router = new Router(this);
		this.Navigation = new Navigation(this);

		this.SplashscreenRequestors = new Set(); // If not empty, the splash screen will be rendered
		this.AxiosInterceptors = new Set();

		this.HeaderService = new HeaderService(this, "HeaderService");
		this.FooterService = new FooterService(this, "FooterService");
		this.SidebarService = new SidebarService(this, "SidebarService");

		this.ReduxService.addReducer("alerts", alertsReducer);
		this.ReduxService.addReducer("advmode", advancedModeReducer);
		this.ReduxService.addReducer("helpButton", headerHelpButtonReducer);
		this.ReduxService.addReducer("sidebar", sidebarReducer);

		this.DefaultPath = props.defaultpath;

		this._handleKeyUp = this._handleKeyUp.bind(this);

		this.state = {
			networking: 0, // If more than zero, some networking activity is happening
			SplashscreenRequestors: 0,
		}

		const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
		this.Store = createStore(combineReducers(this.ReduxService.Reducers), composeEnhancers(applyMiddleware()));

		this.ConfigService.addDefaults(props.configdefaults);

		this.Config.dispatch(this.Store);
		this.DevConfig.dispatch(this.Store);

		this.Store.dispatch({
			type: CHANGE_HELP_URL,
			payload: {
				url: this.Config.get("default_help_url"),
				icon: "cil-info"
			}
		})

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
				let ret = that.Modules[i].initialize();

				// Transform result in the promise
				// It unifies synchronous and asynchronous `initialize()` calls
				let promise = Promise.resolve(ret);
				await promise;
			}
		}

		modules_init().then(async function () {
			that.Store.replaceReducer(combineReducers(that.ReduxService.Reducers));
			that.Config.dispatch(that.Store);

			// Initialize all services
			for (var i in that.Services) {
				let ret = that.Services[i].initialize();

				// Transform result in the promise
				// It unifies synchronous and asynchronous `initialize()` calls
				let promise = Promise.resolve(ret);
				await promise;

				that.Config.dispatch(that.Store);
			}

			that.removeSplashScreenRequestor(that);
		});
	}


	getServiceURL(service) {
		// Handle if service is unknown => return undefined
		if (service == undefined) {
			console.warn(`Service is undefined!`);
			return undefined;
		}

		// Handle if SERVICES not provided, empty object will be used as default
		let services = this.Config.get('SERVICES') ? this.Config.get('SERVICES') : {};

		// Handle if service is not in SERVICES => use service as service_path
		let service_path = services[service] ? services[service] : service;

		// If service_path is complete URL, then return that URL
		if (service_path.toString().indexOf('http://') !== -1 || service_path.toString().indexOf('https://') !== -1) {
			return service_path;
		}
		// If service_path is complete WebSocket URL, then return that URL
		if (service_path.toString().indexOf('ws://') !== -1 || service_path.toString().indexOf('wss://') !== -1) {
			return service_path;
		}

		// Obtain BASE_URL
		let BASE_URL = undefined;
		if (this.Config.get('BASE_URL') == undefined) {
			// If BASE_URL has not been defined => take browser URL as BASE_URL
			BASE_URL = window.location.protocol + '//' + window.location.host + window.location.pathname.replace(/\/$/, '');
		} else if (this.Config.get('BASE_URL').toString().indexOf('http://') !== -1 || this.Config.get('BASE_URL').toString().indexOf('https://') !== -1) {
			// If BASE_URL has been defined => take defined BASE_URL as BASE_URL
			BASE_URL = this.Config.get('BASE_URL');
		} else {
			// If BASE_URL has been defined but with relative path => take browser URL as BASE_URL and append relative path from BASE_URL behind the browser URL
			let relative_base_url = this.Config.get('BASE_URL');
			// Check if trailing slash has been added on first place of a BASE_URL string and if so, remove it
			if (relative_base_url.indexOf("/", 0) == 0) {
				relative_base_url = relative_base_url.substring(1);
			}
			BASE_URL = window.location.protocol + '//' + window.location.host + window.location.pathname.replace(/\/$/, '') + '/' + relative_base_url.replace(/\/$/, '');
		}

		// Compose service_url
		let service_url = undefined;
		if (this.Config.get('API_PATH') == undefined) {
			// If API_PATH has not been defined => use /api to compose service_url
			service_url = BASE_URL.replace(/\/$/, '') + '/api';
		} else if (this.Config.get('API_PATH').toString().indexOf('http://') !== -1 || this.Config.get('API_PATH').toString().indexOf('https://') !== -1) {
			// If API_PATH has been defined but with absolute URL => use API_PATH as service_url
			service_url = this.Config.get('API_PATH');
		} else {
			// If API_PATH has been defined => use API_PATH to compose service_url
			let api_path = this.Config.get('API_PATH');
			// Check if trailing slash has been added on first place of a API_PATH string and if so, remove it
			if (api_path.indexOf("/", 0) == 0) {
				api_path = api_path.substring(1);
			}
			service_url = BASE_URL.replace(/\/$/, '') + "/" + api_path;
		}

		return service_url.replace(/\/$/, '') + "/" + service_path;
	}


	/*
	 *	Creates an AXIOS object for communication with TeskaLabs API's
	 *
	 *	IMPORTANT NOTE:
	 *		Bearer token will be sent to any URL specified in the API / Services configuration.
	 *		axiosCreate must only be used for creating http sessions
	 *		towards TeskaLabs API's, since it adds Bearer token to all calls.
	 */
	axiosCreate(service, props) {
		var service_url = this.getServiceURL(service);
		if (service_url == undefined) {
			this.addAlert('danger', "ASABApplicationContainer|Service URL is undefined, please check service paths passed to axios", 5, true);
			return undefined;
		}

		var axios = Axios.create({
			...props,
			baseURL: service_url,
		});

		// Iterate through custom interceptors
		for (let interceptor of this.AxiosInterceptors.keys()) {
			this.interceptorRequest(axios, interceptor);
		}

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


	interceptorRequest(axios, interceptor) {
		// Add a request interceptor
		axios.interceptors.request.use(
			interceptor,
			function (error) {
				return Promise.reject(error)
			});
	}


	addAxiosInterceptor(interceptor) {
		this.AxiosInterceptors.add(interceptor);
	}


	removeAxiosInterceptor(interceptor) {
		this.AxiosInterceptors.delete(interceptor);
	}


	getWebSocketURL(service, subpath) {
		// Handle if service is unknown => return undefined
		var service_url = this.getServiceURL(service);
		if (service_url == undefined) {
			return undefined
		}

		// Handle if subpath is unknown => subpath = ""
		if (subpath == undefined) {
			subpath = "";
		}

		// If service_path is complete WebSocket URL, then return that URL
		if (service_url.toString().indexOf('ws://') !== -1 || service_url.toString().indexOf('wss://') !== -1) {
			return service_url;
		}

		// Replace http:// or https:// protocol with ws:// or wss://
		let ws_service_url = service_url.replace(/(http)(s)?\:\/\//, "ws$2://");

		return ws_service_url + subpath;

	}


	createWebSocket(service, subpath) {
		var socket_url = this.getWebSocketURL(service, subpath);
		if (socket_url == undefined) {
			this.addAlert('danger', "ASABApplicationContainer|WebSocket URL is undefined, please check service and subpath passed to WebSocket", 5, true);
			return undefined;
		}

		// Create new WebSocket based on socket URL
		const socket = new WebSocket(socket_url);

		return socket;
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

		// CTRL+Q (Windows) or CTRL+1 (Linux) enables the advanced mode
		if ((event.ctrlKey && event.code === 'KeyQ') || (event.code === 'Digit1' && event.ctrlKey)) {
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

	addAlert(level, message, arg1, arg2) {
		const expire = typeof arg1 === 'number' ? arg1 : typeof arg2 === 'number' ? arg2 : 5;
		const shouldBeTranslated = typeof arg1 === 'boolean' ? arg1 : typeof arg2 === 'boolean' ? arg2 : false;

		this.Store.dispatch({
			type: ADD_ALERT,
			level: level,
			message: message,
			expire: expire,
			shouldBeTranslated: shouldBeTranslated
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
			this.addAlert('warning', "ASABApplicationContainer|Advanced mode enabled", 1, true);
		} else {
			this.addAlert('success', "ASABApplicationContainer|Advanced mode disabled", 1, true);
		}
	}

	// First argument is href to page
	// Second (optional) is string that is icon from core-ui icons
	// Third (optional) is target for link
	addHelpButton(url, icon = "cil-info", target) {
		useEffect(() => {
			this.Store.dispatch({
				type: CHANGE_HELP_URL,
				payload: { url, icon, target }
			})
			return () => {
				this.Store.dispatch({
					type: CHANGE_HELP_URL,
					payload: {
						url: this.Config.get('default_help_url'),
						icon: "cil-info",
						target: "_blank"
					}
				})
			}
		}, [])
	}

	render() {
		// Render the splash screen if needed
		if (this.state.SplashscreenRequestors > 0) return (
			<Provider store={this.Store}>
				<div className="app">
					<Suspense fallback={<></>}>
						<Alerts app={this} />
						<TenantSelectionCard app={this} />
					</Suspense>
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
					<Alerts app={this} />
					{this.Config.get('title') != null && this.Config.get('title') != undefined ?
						<Helmet>
							<title>{this.Config.get('site_title') ? this.Config.get('site_title') + " | " + this.Config.get('title') : this.Config.get('title')}</title>
						</Helmet>
						: null
					}
					<Header app={this} />
					<ErrorHandler isParentError={true}>
						<div className="app-body">
							{
								(this.props.hasSidebar || typeof this.props.hasSidebar === 'undefined') &&
								<Sidebar
									app={this}
									navigation={this.Navigation}
									display="lg"
									sidebarItemsOrder={this.props.sidebarItemsOrder}
								/>
							}
							<Main hasSidebar={this.props.hasSidebar}>
								<Suspense
									fallback={<div style={{ marginTop: "1rem" }}><Spinner /></div>}
								>
									<Switch>
										{this.Router.Routes.map((route, idx) => {
											return route.component ? (
												<Route
													key={idx}
													path={`${route.path}`}
													exact={route.exact}
													name={route.name}
													render={props => (
														<>
															{!this.props.disableAppBreadcrumbs && !route.disableContainerBreadcrumbs ?
																<Breadcrumbs routes={this.Router.Routes} match={props.match} />
																: null}
															<ErrorHandler>
																<route.component app={this} {...props} {...route.props} />
															</ErrorHandler>
														</>
													)}
												/>
											) : (null);
										})}
										{this.DefaultPath != undefined ? <Redirect from="/" to={this.DefaultPath} /> : null}
									</Switch>
								</Suspense>
							</Main>
						</div>
						<Footer app={this} />
					</ErrorHandler>
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

function advancedModeReducer(state = advModeInitialState, action) {
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

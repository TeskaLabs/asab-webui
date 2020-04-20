import React, { Component } from 'react';
import * as router from 'react-router-dom';
import { withRouter } from "react-router";
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Container, Nav, NavItem, NavLink, Badge, DropdownToggle, DropdownMenu } from 'reactstrap';
import {
	AppAside,
	AppAsideToggler,
	AppBreadcrumb2 as AppBreadcrumb,
	AppNavbarBrand,
} from '@coreui/react';

import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

import SplashScreen from './SplashScreen';
import HeaderService from '../services/HeaderService';
import FooterService from '../services/FooterService';
import ReduxService from '../services/ReduxService';


class Application extends Component {

	constructor(props){
		super(props);

		this.Modules = [];
		this.Services = {};

		this.Config = new Config(this, __CONFIG__);
		this.Router = new Router(this);
		this.Navigation = new Navigation(this);

		this.SplashscreenRequestors = new Set(); // If not empty, the splash screen will be rendered

		// Core services
		this.HeaderService = new HeaderService(this, "HeaderService");
		this.FooterService = new FooterService(this, "FooterService");
		this.ReduxService = new ReduxService(this, "ReduxService");

		this.DefaultPath = props.defaultpath

		this.state = {
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
			: createStore((state) => state, composeEnhancers(applyMiddleware()))
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
			this.setState({
				SplashscreenRequestors: this.SplashscreenRequestors.size
			});
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


	render() {
		// Render the splash screen if needed
		if (this.state.SplashscreenRequestors > 0) return (
			<Provider store={this.Store}>
				<div className="app">
					<SplashScreen />
				</div>
			</Provider>
		)

		else return (
			<Provider store={this.Store}>
				<div className="app">
					<Header app={this}/>
					<div className="app-body">
						<Sidebar hasSidebar={this.props.hasSidebar} app={this} navigation={this.Navigation}/>
						<main className="main">
							{this.props.hasBreadcrumb ? <AppBreadcrumb appRoutes={this.Router.Routes} router={router}/> : null}
							<Container fluid>
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
									(this.DefaultPath != undefined ? <Redirect from="/" to={this.DefaultPath} />: null)
								</Switch>
							</Container>
						</main>
					</div>
					<Footer app={this}/>
				</div>
			</Provider>
		)
	}

}


class Config {
	constructor(app, defaults) {
		this._config = Object.assign({}, defaults);
	}

	addDefaults(defaults) {
		for (key in defaults) {
			if (key in this._config)
				continue
			this._config[key] = defaults[key];
		}
	}

	get(key) {
		return this._config[key];
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

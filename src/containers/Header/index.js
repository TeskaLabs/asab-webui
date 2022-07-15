import React, { useState, Suspense, useEffect } from 'react';
import { connect } from 'react-redux';

import {
	Nav,
	NavItem
} from 'reactstrap';

import HelpButton from './HelpButton';
import ThemeButton from '../../theme/ThemeButton';
import Breadcrumbs from './BreadcrumbsRouter';
import {Link} from "react-router-dom";

export function Header(props) {
	const HeaderService = props.app.locateService("HeaderService");
	const href = props.brand_image.href ?? "/";

	const [headerProperties, setHeaderProperties] = useState(false);

	function useWindowDimensions() {
		const [windowDimensions, setWindowDimensions] = useState(
			getWindowDimensions()
		);

		useEffect(() => {
			function handleResize() {
				setWindowDimensions(getWindowDimensions());
			}

			window.addEventListener("resize", handleResize);
			return () => window.removeEventListener("resize", handleResize);
		}, []);

		return windowDimensions;
	}

	const { width } = useWindowDimensions();

	function getWindowDimensions() {
		const { innerWidth: width} = window;
		return {width};
	}

	return (
		<header className={`application-header ${headerProperties ? 'header-props-open' : ""}`}>
			{(props.app.props.hasSidebar || typeof props.app.props.hasSidebar == 'undefined') ?
				<>
					{width < 768 &&
						<div className="mobile-logo-position">
							<Link to={href}>
								<img
									src={props.brand_image.full}
									alt={props.title}
									width="150"
									height="50"
								/>
							</Link>
						</div>
					}
					<Breadcrumbs app={props.app}/>
					<Nav className="ml-auto header-props" navbar>
						<ThemeButton />
						<HelpButton />
						{HeaderService.Items.map((item, idx) => (
							<NavItem key={idx}>
								<item.component key={item} {...item.componentProps} app={props.app}/>
							</NavItem>
						))}
					</Nav>
				</>
			:
				<>
				<div >
					<Link to={href}>
						<img
							src={props.brand_image.full}
							alt={props.title}
							width="150"
							height="50"
						/>
					</Link>
				</div>
				<Nav className="ml-auto header-props" navbar>
					<ThemeButton />
					<HelpButton />
					{HeaderService.Items.map((item, idx) => (
						window.innerWidth < 1024 && item.componentProps.children !== undefined && item.componentProps.children === "LanguageDropdown" ?
							<NavItem key={idx}>
								<item.component key={item} {...item.componentProps} app={props.app}/>
							</NavItem>
						:
							window.innerWidth >= 1024 ?
								<NavItem key={idx}>
									<item.component key={item} {...item.componentProps} app={props.app}/>
								</NavItem>
							:
								null
					))}
				</Nav>
				</>

			}

			{/* toggler */}
			<div className={`header-props-toggler mr-3 p-0 ${headerProperties ? 'header-props-open' : '' }`} onClick={() => setHeaderProperties(!headerProperties)}>
				<i className="cil-chevron-bottom"></i>
			</div>
			
			{/* smallscreen menu  */}
			<div className={`header-props-sm`}>
			{ headerProperties && 
				<>
				{(props.app.props.hasSidebar || typeof props.app.props.hasSidebar === 'undefined') ?
					(
						<Nav navbar>
							<ThemeButton />
							<HelpButton />
							{HeaderService.Items.map((item, idx) => (
								<NavItem key={idx}>
									<item.component key={item} {...item.componentProps} app={props.app}/>
								</NavItem>
							))}
						</Nav>
					)
				:
					<Nav className="header-props-sm" navbar>
						<ThemeButton />
						<HelpButton />
						{HeaderService.Items.map((item, idx) => (
							window.innerWidth < 1024 && item.componentProps.children !== undefined && item.componentProps.children === "LanguageDropdown" ?
								<NavItem key={idx}>
									<item.component key={item} {...item.componentProps} app={props.app}/>
								</NavItem>
							:
								window.innerWidth >= 1024 ?
									<NavItem key={idx}>
										<item.component key={item} {...item.componentProps} app={props.app}/>
									</NavItem>
								:
									null
						))}
					</Nav>

				}
				</>
			}
			</div>
		</header>
	);
}


function mapStateToProps(state) {
	const headerImage = state.config.brand_image?.full ?
		state.config.brand_image : state.config.default_brand_image;

	return {
		brand_image: headerImage,
		title: state.config.title,
	}
}

export default connect(mapStateToProps)(Header);

import React, { useState, Suspense, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

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

	const [headerProperties, setHeaderProperties] = useState(false);
	const [windowDimensions, setWindowDimensions] = useState({width: window.innerWidth,});

	const theme = useSelector(state => state.theme);
	const title = useSelector(state => state.config.title);

	const BrandingService = props.app.Services.BrandingService;
	const Config = props.app.ConfigService.Config;

	let brandImage;
	if (Config !== undefined && theme) {
		brandImage = BrandingService.getLogo(Config, theme);
	}
	const href = brandImage?.href ?? "/";

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [windowDimensions])

	function handleResize () {
		setWindowDimensions({width: window.innerWidth});
	}

	return (
		<header className={`application-header ${headerProperties ? 'header-props-open' : ""}`}>
			{(props.app.props.hasSidebar || typeof props.app.props.hasSidebar == 'undefined') ?
				<>
					{windowDimensions.width <= 768 &&
						<div className="mobile-logo-position">
							<Link to={href}>
								<img
									src={brandImage.full}
									alt={title}
									width="150"
									height="50"
								/>
							</Link>
						</div>
					}
					{windowDimensions.width > 768 && <Breadcrumbs app={props.app}/>}
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
					<div className="mobile-logo-position">
						<Link to={href}>
							<img
								src={brandImage.full}
								alt={title}
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

			{/* toggler has sidebar */}
			{(props.app.props.hasSidebar || typeof props.app.props.hasSidebar === 'undefined') &&
				<>
					<div className={`header-props-toggler mr-3 p-0 ${headerProperties ? 'header-props-open' : '' }`} onClick={() => setHeaderProperties(!headerProperties)}>
						<i className="cil-chevron-bottom"></i>
					</div>
					<div className="header-props-language">
						{HeaderService.Items.map((item, idx) => (
							window.innerWidth > 500 ?
								item.componentProps?.children === "LanguageDropdown" && <item.component key={item} {...item.componentProps} app={props.app}/>
								:
								null
						))}
					</div>
				</>
			}

			{/* smallscreen menu has sidebar */}
			<div className={`header-props-sm`}>
				{ headerProperties &&
					<>
						{(props.app.props.hasSidebar || typeof props.app.props.hasSidebar === 'undefined') &&
							(
								<Nav navbar>
									<ThemeButton />
									<HelpButton />
									{HeaderService.Items.map((item, idx) => (
										window.innerWidth > 500 ?
											item.componentProps?.children !== "LanguageDropdown" ?
												<NavItem key={idx}>
													<item.component key={item} {...item.componentProps} app={props.app}/>
												</NavItem>
											:
												null
										:
											<NavItem key={idx}>
												<item.component key={item} {...item.componentProps} app={props.app}/>
											</NavItem>
									))}
								</Nav>
							)

						}
					</>
				}

				{/* smallscreen menu without sidebar */}
				{(props.app.props.hasSidebar || typeof props.app.props.hasSidebar === 'undefined') ?
					null
				:
					<Nav className="header-props-sm" navbar>
						<ThemeButton/>
						<HelpButton/>
						{HeaderService.Items.map((item, idx) => (
							<NavItem key={idx}>
								<item.component key={item} {...item.componentProps} app={props.app}/>
							</NavItem>
						))}
					</Nav>
				}
			</div>
			{(props.app.props.hasSidebar || typeof props.app.props.hasSidebar === 'undefined') && (windowDimensions.width <= 768 && <Breadcrumbs app={props.app}/>)}
		</header>
	);
}

export default Header;

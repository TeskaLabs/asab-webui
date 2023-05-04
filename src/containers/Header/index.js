import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Nav, NavItem } from 'reactstrap';

import HelpButton from './HelpButton';
import ThemeButton from '../../theme/ThemeButton';
import Breadcrumbs from './BreadcrumbsRouter';
import { Link } from "react-router-dom";
import './header.scss';

import { getBrandImage } from '../../components/BrandImage';

export function Header(props) {
	const HeaderService = props.app.locateService("HeaderService");

	const [brandImage, setBrandImage] = useState({});
	const [headerProperties, setHeaderProperties] = useState(false);
	const [windowDimensions, setWindowDimensions] = useState({width: window.innerWidth,});

	const title = useSelector(state => state.config?.title);
	const theme = useSelector(state => state.theme);

	useEffect(() => {
		setBrandImage(getBrandImage(props, theme));
	}, [theme]);

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
							<Link to={brandImage?.href}>
								<img
									src={brandImage?.full}
									alt={title}
									width="150"
									height="50"
								/>
							</Link>
						</div>
					}
					{windowDimensions.width > 768 && <Breadcrumbs app={props.app}/>}
					<Nav className="ml-auto header-props" navbar>
						<HelpButton />
						<ThemeButton />
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
						<Link to={brandImage?.href}>
							<img
								src={brandImage?.full}
								alt={title}
								width="150"
								height="50"
							/>
						</Link>
					</div>
					<Nav className="ml-auto header-props" navbar>
						<HelpButton />
						<ThemeButton />
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
									<HelpButton />
									<ThemeButton />
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
						<HelpButton/>
						<ThemeButton/>
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

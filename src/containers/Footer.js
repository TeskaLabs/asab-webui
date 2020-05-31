import React, { Component } from 'react';

import { Container, Nav, NavItem, NavLink, Badge, DropdownToggle, DropdownMenu } from 'reactstrap';
import {
	AppFooter,
} from '@coreui/react';


class Footer extends Component {

	constructor(props) {
		super(props);

		this.App = props.app;
		this.FooterService = this.App.locateService("FooterService");
	}

	render() {
		return (<React.Fragment>
			<AppFooter>

				{this.FooterService.Items.map((item, idx) => (
					<item.component key={idx} {...item.componentProps} app={this.App}/>
				))}

				<span className="ml-auto">
					<a target="_blank" href={this.FooterService.FooterImage.href}>
						<img
							height={this.FooterService.FooterImage.height}
							width={this.FooterService.FooterImage.width}
							alt={this.FooterService.FooterImage.alt}
							src={this.FooterService.FooterImage.src}
						/>
					</a>
				</span>

			</AppFooter>
		</React.Fragment>);
	}

}

export default Footer;

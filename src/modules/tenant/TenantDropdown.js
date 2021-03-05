import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	UncontrolledDropdown,
	Dropdown,
	DropdownItem,
	DropdownMenu, 
	DropdownToggle,
	Nav, NavItem, NavLink
} from 'reactstrap';

import {
	AppAsideToggler,
	AppHeaderDropdown,
	AppNavbarBrand,
	AppSidebarToggler
} from '@coreui/react';

import {types} from './actions';

class TenantDropdown extends Component {

	constructor(props) {
		super(props);

		this.tenants = this.props.tenants;
		this.current = this.props.current;
	}

	render() {
		return (
			<UncontrolledDropdown direction="down" className="pr-3">
				<DropdownToggle nav caret>
					<i className="cil-apps pr-2"></i>
					<TenantLabel tenant={this.current}/>
				</DropdownToggle>
				{ (this.tenants && this.tenants.length > 0) ?
					<DropdownMenu right
						modifiers={{
							setMaxHeight: {
								enabled: true,
								order: 890,
								fn: (data) => {
									return {
										...data,
										styles: {
											...data.styles,
											overflow: 'auto',
											maxHeight: '400px',
										},
									};
								},
							},
						}}
					>
						<DropdownItem header>Tenants</DropdownItem>
						{this.tenants.map((tenant, i) => (
							<DropdownItem key={i} tag="a" href={'?tenant='+tenant+'#/'}>
								<TenantLabel tenant={tenant}/>
							</DropdownItem>
						))}
					</DropdownMenu>
				 : null}
			</UncontrolledDropdown>
		);
	}
}


class TenantLabel extends Component {

	render() {
		return (
			<React.Fragment>{this.props.tenant}</React.Fragment>
		);
	}
}


const mapStateToProps = state => {
	return {
		current: state.tenant.current,
		tenants: state.tenant.tenants,
	};
};

export default connect(
	mapStateToProps,
	null
)(TenantDropdown);

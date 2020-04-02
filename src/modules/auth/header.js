import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from 'reactstrap';


class HeaderComponent extends Component {

	constructor(props) {
		super(props);

		this.App = props.app;
		this.AuthModule = props.AuthModule;
	}

	logout() {
	
		this.AuthModule.logout()
	}


	// See https://github.com/coreui/coreui-free-react-admin-template/blob/b9626a8ae66834006ee86b758cdc81f74fb20531/src/containers/DefaultLayout/DefaultHeader.js#L52

	render() {
		return (
			<UncontrolledDropdown nav direction="down" className="pr-3">
				<DropdownToggle nav title={this.props.sub}>
					{this.props.username}
				</DropdownToggle>
				<DropdownMenu right>
					<DropdownItem>
						<div onClick={() => {this.logout()}}>Logout</div>
					</DropdownItem>
				</DropdownMenu>
			</UncontrolledDropdown>
		)
	}
}

const mapStateToProps = state => {
	var username = "-";
	var sub = "-";
	const userinfo = state.auth.userinfo;
	if (userinfo != null) {
		sub = userinfo.sub;
		username = userinfo.preferred_username;
	}
	return {
		sub: sub,
		username: username,
	};
};

const mapDispatchToProps = dispatch => {
	return {
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HeaderComponent);

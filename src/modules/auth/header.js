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
			<UncontrolledDropdown direction="down" className="pr-3">
				<DropdownToggle nav title={this.props.sub} caret>
					{(this.props.picture) ? <img src={this.props.picture} className="img-avatar" alt={this.props.username}/> : <span>&#128100;</span>}
					<span className="pl-2" title={this.props.sub}>{this.props.username}</span>
				</DropdownToggle>
				<DropdownMenu>
					<DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
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
	var picture = null;

	const userinfo = state.auth.userinfo;
	if (userinfo != null) {

		if (userinfo.sub) {
			sub = userinfo.sub;
		} else {
			sub = userinfo.id;	
		}

		if (userinfo.name) {
			username = userinfo.name;
		}
		else if (userinfo.preferred_username) {
			username = userinfo.preferred_username;	
		}
		else {
			username = userinfo.id;	
		}

		if (userinfo.picture) {
			picture = userinfo.picture;
		}

	}
	return {
		sub: sub,
		username: username,
		picture: picture,
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

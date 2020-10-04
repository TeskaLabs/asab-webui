import React from 'react'
import { connect } from 'react-redux';
import {
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from 'reactstrap';

function HeaderComponent(props) {

	let user_auth_url = props.app.Config.get('USER_AUTH_URL');

	const logout = () => {
		props.AuthModule.logout()
	}

	// See https://github.com/coreui/coreui-free-react-admin-template/blob/b9626a8ae66834006ee86b758cdc81f74fb20531/src/containers/DefaultLayout/DefaultHeader.js#L52

	return (
		<UncontrolledDropdown direction="down" className="pr-3">
			<DropdownToggle nav title={props.sub} caret>
				{(props.picture)
					? <img src={props.picture} className="img-avatar" alt={props.username}/>
					: <i alt={props.username} className="cil-user"></i>
				}
				<span className="pl-2" title={props.sub}>{props.username}</span>
			</DropdownToggle>
			<DropdownMenu>
				<DropdownItem header tag="div" className="text-center"><strong>My account</strong></DropdownItem>
				{user_auth_url != null &&
					<React.Fragment>
						<DropdownItem tag="a" href={user_auth_url}>
							Manage
						</DropdownItem>
						<DropdownItem tag="a" href={user_auth_url + '#/pwd'}>
							Change a password
						</DropdownItem>
					</React.Fragment>
				}
				<DropdownItem onClick={() => {logout()}}>
					<span className="text-danger">
						Logout
					</span>
				</DropdownItem>
			</DropdownMenu>
		</UncontrolledDropdown>
	)
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

export default connect(
	mapStateToProps,
	null
)(HeaderComponent);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';

import './style.css';


class UserDropdown extends Component {

  constructor(props) {
    super(props);
    this.state = {
            userDropdownOpen: false
        }

    this.toggleUserDropdown = this.toggleUserDropdown.bind(this);
    this.logout = this.logout.bind(this);
	}

  toggleUserDropdown() {
    this.setState(prevState => ({
      userDropdownOpen: !prevState.userDropdownOpen
    }));
  }

  handleRouteLogin () {
    this.props.history.push('/auth')
  }

  logout(){
    this.props.logout()
    //window.location.reload (false)
    this.props.history.push('/')
  }

  render() {
    const authServiceState = this.props.AuthServiceState
    if (authServiceState){
      return (
            <Dropdown className="userDropdown" isOpen={this.state.userDropdownOpen} toggle={this.toggleUserDropdown}>
                <DropdownToggle caret>
                   { authServiceState.username }
                </DropdownToggle>
                  <DropdownMenu>
                      <DropdownItem>
                          <div onClick={() => {this.logout()}}>logout</div>
                      </DropdownItem>

                  </DropdownMenu>
            </Dropdown>
      );
    } else {
      return (
        <Button
          color="primary"
          className="px-4 userLoginBtn"
          onClick={this.handleRouteLogin.bind(this)}
        >
          Login
        </Button>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    AuthServiceState: state.AuthService
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logout());
    }
  };
};

export const logout = () => ({ type:"LOGOUT" })

export default withRouter (
  connect(
    mapStateToProps,
    mapDispatchToProps
  ) (UserDropdown)
);




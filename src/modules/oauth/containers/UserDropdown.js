import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';


class UserDropdown extends Component {

  constructor(props) {
    super(props);
    this.AuthService = props.app.locateService("AuthService");
    this.state = {
            userDropdownOpen: false,
            userCredentials: null
        }

    this.toggleUserDropdown = this.toggleUserDropdown.bind(this);
    this.logout = this.logout.bind(this);

  }

  componentDidMount() {
    const userCredentials = this.AuthService.getUserCredentials();
    this.setState({userCredentials:userCredentials});
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
    this.AuthService.logout()
    //window.location.reload (false)
    this.props.history.push('/')
  }

  render() {
    const {userCredentials} = this.state;
    if (this.AuthService.loggedIn()){
      return (
            <Dropdown className="userDropdown" isOpen={this.state.userDropdownOpen} toggle={this.toggleUserDropdown}>
                <DropdownToggle caret>
                   {userCredentials ? userCredentials.username : "-"}
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



export default withRouter (UserDropdown);




import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import Api from './Api';
import { selectTenant } from './actions';

import './style.css';


class TenantDropdown extends Component {

  constructor(props) {
		super(props);
		this.state = {
            tenantDropdownOpen: false
        }

    this.toggleTenantDropdown = this.toggleTenantDropdown.bind(this);
    this.changeTenant = this.changeTenant.bind(this);
	}

  toggleTenantDropdown() {
    this.setState(prevState => ({
      tenantDropdownOpen: !prevState.tenantDropdownOpen
    }));
  }

  changeTenant(e){
    this.props.changeTenant(e.currentTarget.textContent);
  }
  
  render() {

    return (
          <Dropdown className="tenantDropdown" isOpen={this.state.tenantDropdownOpen} toggle={this.toggleTenantDropdown}>
              <DropdownToggle caret>
                {this.props.tenantState.currentTenant}
              </DropdownToggle>
              <DropdownMenu>
              {this.props.tenantState.tenants && this.props.tenantState.tenants.map((tenant, i) => (
              <DropdownItem>
                  <div onClick={this.changeTenant}>{tenant}</div>
              </DropdownItem>
                ))}
              </DropdownMenu>
          </Dropdown>
    );
  }
}

const mapStateToProps = state => {
  return {
    tenantState: state.tenant
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeTenant: tenant => {
      dispatch(selectTenant(tenant));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TenantDropdown);

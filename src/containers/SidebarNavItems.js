import React from 'react';

import { Nav, NavItem } from 'reactstrap';

import { NavLink, useLocation } from 'react-router-dom'

const SidebarNavItems = ({ navConfig }) => {
    const location = useLocation();

    return (
        <Nav>
            {navConfig.map((item, idx) => (
                <NavItem key={idx}>
                    <NavLink to={item.url} activeClassName="active">
                        <Icon icon={item.icon} />
                        {item.name}
                    </NavLink>
                </NavItem>
            ))}
        </Nav>
    );
}

const Icon = ({ icon }) => {
    if (typeof icon === "string") {
        return <i className={`${icon} nav-icon`}></i>
    }

    return <span className="nav-icon">{icon}</span>;
}

export default SidebarNavItems;
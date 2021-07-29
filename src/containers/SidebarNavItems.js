import React from 'react';

import { Nav, NavItem, NavLink } from 'reactstrap';

import { useLocation, useHistory } from 'react-router-dom'

const SidebarNavItems = ({ navConfig }) => {
    const location = useLocation();
    const history = useHistory();

    return (
        <Nav>
            {navConfig.map((item, idx) => (
                <NavItem key={idx}>
                    <NavLink
                        className={`${location.pathname === item.url ? "active" : ""}`}
                        onClick={() => history.push(item.url)}
                    >
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
        return <i className={`${icon} sidebar-item-icon`}></i>
    }

    return <span className="sidebar-item-icon">{icon}</span>;
}

export default SidebarNavItems;
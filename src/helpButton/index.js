import React from 'react';
import { connect } from 'react-redux';

import { NavLink } from 'reactstrap';

const HelpButton = ({ url, icon = "cil-info", target="_blank" }) => {
    if (!url) return null;

    return (
        <NavLink 
            style={{ fontSize: "1.5rem", marginRight: "1rem" }}
            href={url}
            target={target}
        >
            <i className={icon}></i>
        </NavLink>
    );
}

const mapStateToProps = state => ({ ...state.helpButton });

export default connect(mapStateToProps)(HelpButton);
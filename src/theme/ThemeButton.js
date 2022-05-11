import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';

import { NavLink } from 'reactstrap';

import { CHANGE_THEME } from "./actions";

const ThemeButton = ({theme}) => {
	const dispatch = useDispatch();

	const changeLanguage = () => {
		const newTheme = (theme == "light") ? "dark" : "light";
		dispatch({
			type: CHANGE_THEME,
			theme: newTheme
		});
	}

	return (
		<NavLink 
			style={{ fontSize: "1.2rem", marginRight: "1rem" }}
			onClick={changeLanguage}
			href="#"
		>
			<i className="cil-contrast"></i>
		</NavLink>
	);
}


function mapStateToProps(state) {
	return {
		theme: state.theme,
	}
}

export default connect(mapStateToProps)(ThemeButton);

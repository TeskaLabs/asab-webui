import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button } from 'reactstrap';

import { CHANGE_THEME } from '../actions';

const ThemeButton = () => {
	const theme = useSelector(state => state.theme);
	const dispatch = useDispatch();

	const onClick = () => dispatch({ type: CHANGE_THEME });

	return (
		<Button onClick={onClick}>
			{theme === "light-mode" ? "dark-mode" : "light-mode"}
		</Button>
	);
}

export default ThemeButton;
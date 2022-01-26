import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Switch from './ControlledSwitch';

import { CHANGE_THEME } from '../actions';

const ThemeButton = () => {
	const theme = useSelector(state => state.theme);
	const dispatch = useDispatch();

	const onClick = () => dispatch({ type: CHANGE_THEME });

	return (
		<div className="mr-2">
			<Switch
				size="md"
				toggle={onClick}
				isOn={theme !== "light-mode"}
				title="Change language"
			/>
		</div>
	);
}

export default ThemeButton;
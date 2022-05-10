import React, { useState, useEffect } from 'react';

import Switch from '../../components/ControlledSwitch';

const ThemeButton = ({ changeTheme }) => {
	const [theme, setTheme] = useState("theme-light");

	useEffect(() => {
		const html = document.querySelector("html");
		setTheme(html.dataset.theme);
	}, [])

	const onClick = () => {
		const newTheme = theme === "theme-light" ? "theme-dark" : "theme-light";
		changeTheme(newTheme);
		setTheme(newTheme);
	};

	return (
		<div className="mr-2">
			<Switch
				size="sm"
				toggle={onClick}
				isOn={theme == "theme-dark"}
				title="Change language"
			/>
		</div>
	);
}

export default ThemeButton;
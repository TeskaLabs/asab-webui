import React, { Component } from 'react';


class Duration extends Component {

	transferTimeToHM(time_in_minutes) {
		var hours = parseInt(time_in_minutes / 60, 10);
		var minutes = parseInt(time_in_minutes % 60, 10);
		if (minutes < 10)
			return hours.toString() + ":0" + minutes.toString();
		else
			return hours.toString() + ":" + minutes.toString();
	}

	render() {
		const { minutes, label, ...props } = this.props;

		var time = 0;
		if (minutes !== undefined) {
			time = this.transferTimeToHM(minutes); 
		}

		return (
			<span {...props}>
				{time} {label ? label : "h"}
			</span>
		)
	}
}

export default Duration;

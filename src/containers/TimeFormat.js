import React, { Component } from 'react';


class TimeFormat extends Component {

	constructor() {
		super();

		this.state = {
			showOnMouseOver: false, 
		};
	}

	onMouseOver(e) {
		this.setState({showOnMouseOver: true});
	}

	onMouseOut(e) {
		this.setState({showOnMouseOver: false});
	}

	parseISOString(s) {
		var b = s.split(/\D+/);
		return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
	}

	render() {
		const { isotime, timestamp, ago, ...props } = this.props;
		const { showOnMouseOver } = this.state;

		var datetime = new Date();
		if (isotime === undefined || isotime === null && timestamp !== undefined && timestamp !== null) {
			datetime = new Date(timestamp * 1000);
		} else {
			datetime = this.parseISOString(isotime);
		}

		var ago_string = ago;
		if (ago === undefined || ago === null) {
			ago_string = "milliseconds ago";
		}

		const difference = Math.abs(Date.now() - datetime.getTime());
		const date = datetime.toLocaleDateString();
		const time = datetime.toLocaleTimeString();

		var delta = difference / 1000;
		var difference_in_milliseconds = parseInt(difference % 1000);

		var days = Math.floor(delta / 86400);
		delta -= days * 86400;
		var hours = Math.floor(delta / 3600) % 24;
		delta -= hours * 3600;
		var minutes = Math.floor(delta / 60) % 60;
		delta -= minutes * 60;
		var seconds = parseInt(delta % 60);

		var difference_string = "";
		difference_string += days != 0 ? days.toString() + "d " : "";
		difference_string += hours != 0 ? (hours.toString().length <= 1 ? "0" + hours.toString() : hours.toString()) + ":" : "0:";
		difference_string += minutes != 0 ? (minutes.toString().length <= 1 ? "0" + minutes.toString() : minutes.toString()) + ":" : "0:";
		difference_string += seconds != 0 ? (seconds.toString().length <= 1 ? "0" + seconds.toString() : seconds.toString()) + ":" : "0:";
		difference_string += difference_in_milliseconds != 0 ? difference_in_milliseconds.toString() : "0";
		difference_string += " " + ago_string;

		return (
			<span {...props} title={showOnMouseOver ? difference_string : ""}
				onMouseOver={(e) => this.onMouseOver(e)}
				onMouseOut={(e) => this.onMouseOut(e)} >
				{date} {time}
			</span>
		)
	}
}

export default TimeFormat;

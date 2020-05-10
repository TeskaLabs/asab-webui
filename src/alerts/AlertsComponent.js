import React, { Component } from "react";
import { connect } from 'react-redux'

import { AlertsTypes } from './actions';

import {
	Alert,
} from "reactstrap";


class AlertsComponent extends Component {

	constructor(props) {
		super(props);
		this.App = props.app

		this.onDismiss = this.onDismiss.bind(this);
	}

	onDismiss(alert_key) {
		const store = this.App.Store;
		return function() {
			store.dispatch({
				type: AlertsTypes.DEL_ALERT,
				key: alert_key,
			});
		};
	}

	// Render function
	render() {
		return (
			<div className="alerts" >
				{this.props.alerts.map((alert) => {
					return (
						<Alert
							color={alert.level}
							key={alert.key}
							style={{boxShadow: "3px 3px 5px 1px rgba(0,0,0,0.33)"}}
							isOpen={true}
							toggle={this.onDismiss(alert.key)}
							>
							{alert.message}
						</Alert>
					)
				})}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		alerts: state.alerts.alerts
	};
}

export default connect(
	mapStateToProps,
	null
)(AlertsComponent);

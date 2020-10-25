import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { Alert } from "reactstrap";

import { ACK_ALERT, DEL_ALERT } from '../actions';


function AlertsComponent(props) {
	const [seconds, setSeconds] = useState(0);
	let store = props.app.Store;

	// Expire old alerts
	useEffect(() => {

		// There is probably smarter way how to set interval to avoid speculative ticking
		var interval = 1000;

		const intervalId = setTimeout(() => {
			setSeconds(seconds => seconds + 1);
			
			const now = new Date();
			for (var i in props.alerts) {
				let alert = props.alerts[i];

				if (alert.expire < now) {
					if (alert.acked) {
						store.dispatch({type: DEL_ALERT, key: alert.key});
					} else {
						store.dispatch({type: ACK_ALERT, key: alert.key});
					}
				}
			}

		}, interval);
		return () => { clearInterval(intervalId) };
	}, [seconds]);


	return (
		<div className="alerts" >
			{props.alerts.map((alert) => { return (
				<Alert
					key={alert.key}
					color={alert.level}
					className="shadow"
					fade={true}
					isOpen={!alert.acked}
					toggle={() => store.dispatch({type: ACK_ALERT, key: alert.key})}
					>
					{alert.message}
				</Alert>
			)} )}
		</div>
	);
}

const mapStateToProps = state => {
	return {
		alerts: state.alerts.alerts
	};
}

export default connect(mapStateToProps)(AlertsComponent);

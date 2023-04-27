import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { Alert, Button } from "reactstrap";

import { ACK_ALERT, DEL_ALERT } from '../../actions';
import { useTranslation } from 'react-i18next'

import './alerts.scss';

export default function AlertsComponent(props) {
	const [seconds, setSeconds] = useState(0);
	let store = props.app.Store;
	const alerts = useSelector(state => state.alerts.alerts);
	const { t } = useTranslation();

	// Expire old alerts
	useEffect(() => {

		// There is probably smarter way how to set interval to avoid speculative ticking
		var interval = 1000;

		const intervalId = setTimeout(() => {
			setSeconds(seconds => seconds + 1);

			const now = new Date();
			for (var i in alerts) {
				let alert = alerts[i];

				if (alert.expire < now) {
					if (alert.acked) {
						store.dispatch({ type: DEL_ALERT, key: alert.key });
					} else {
						store.dispatch({ type: ACK_ALERT, key: alert.key });
					}
				}
			}

		}, interval);
		return () => { clearInterval(intervalId) };
	}, [seconds]);


	return (
		<div className="alerts" >
			{alerts.map((alert) => {
				return (
					<Alert
						key={alert.key}
						color={alert.level}
						className={`shadow alerts-style ${(alert.message == "ASABAuthModule|You have been logged out due to inactivity.") ? "session-expiration-alert" : ""}`}
						fade={true}
						isOpen={!alert.acked}
						toggle={(alert.message == "ASABAuthModule|You have been logged out due to inactivity.") ? null : () => store.dispatch({ type: ACK_ALERT, key: alert.key })} // remove the close button for alert with expiration
					>
						{alert.shouldBeTranslated ? t(alert.message) : alert.message}
						{(alert.message == "ASABAuthModule|You have been logged out due to inactivity.") &&
							<Button size="sm" onClick={() => window.location.reload()} color="danger" className="alert-button">
								{` ${t("Alerts|Continue to login")}`}
							</Button>
						}
					</Alert>
				)
			})}
		</div>
	);
}

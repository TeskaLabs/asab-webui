import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { Alert } from "reactstrap";

import { ACK_ALERT, DEL_ALERT } from '../../actions';
import { useTranslation } from 'react-i18next'

import './alerts.scss';

export default function AlertsComponent(props) {
	const [seconds, setSeconds] = useState(0);
	let store = props.app.Store;
	const sessionExpired = useSelector(state => state.auth?.sessionExpired);
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
						className="shadow alerts-style"
						fade={true}
						isOpen={!alert.acked}
						toggle={!sessionExpired ? () => store.dispatch({ type: ACK_ALERT, key: alert.key }) : null} // remove the close button for alert with expiration
					>
						{alert.shouldBeTranslated ? t(alert.message) : alert.message}
						{sessionExpired &&
							<span onClick={() => window.location.reload()} className="alert-span">
								{` ${t("Alerts|Please continue to login.")}`}
							</span>
						}
					</Alert>
				)
			})}
		</div>
	);
}

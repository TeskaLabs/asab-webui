// Actions
import { ADD_ALERT, ACK_ALERT, DEL_ALERT } from '../actions';

const initialState = {
	alerts: [],
}

export default function alertsReducer(state = initialState, action) {
	switch (action.type) {
		
		case ADD_ALERT: {

			var expire = new Date();
			expire.setSeconds(expire.getSeconds() + action.expire);

			const newAlert = {
				key: Math.floor(Math.random() * 65536),
				message: action.message,
				level: action.level,
				expire: expire,
				acked: false,
			}
			return {
				...state,
				alerts: [...state.alerts, newAlert]
			}
		}

		case DEL_ALERT: {
			const newAlerts = [...state.alerts];
			for (var i = newAlerts.length - 1; i >= 0; i--) {
				if (newAlerts[i].key === action.key) {
					newAlerts.splice(i, 1);
				}
			}

			return {
				...state,
				alerts: newAlerts
			}
		}

		case ACK_ALERT: {
			const newAlerts = [...state.alerts];
			for (var i in newAlerts) {
				var alert = newAlerts[i];
				if (alert.key === action.key) {
					// Prolong the longevity of acked alarm a little bit
					alert.expire.setSeconds(alert.expire.getSeconds() + 3);
					alert.acked = true;
					break;
				}
			}
			return {
				...state,
				alerts: newAlerts
			}
		}

		default:
			return state
	}
}

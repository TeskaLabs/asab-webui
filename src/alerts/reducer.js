// Actions
import { ADD_ALERT, DEL_ALERT, ON_TICK } from '../actions';

const initialState = {
		alerts: [],
}

export default function AlertsReducer(state = initialState, action) {
	switch (action.type) {
		
		case ADD_ALERT: {

			var expire = new Date();
			expire.setSeconds(expire.getSeconds() + action.expire);

			const newAlert = {
				key: Math.floor(Math.random() * 65536),
				message: action.message,
				level: action.level,
				expire: expire,
			}
			return {
				...state,
				alerts: [...state.alerts, newAlert]
			}
		}

		case DEL_ALERT: {
			const newAlerts = [...state.alerts];
			for(var i = newAlerts.length - 1; i >= 0; i--) {
				if (newAlerts[i].key === action.key) {
					newAlerts.splice(i, 1);
				}
			}

			return {
				...state,
				alerts: newAlerts
			}
		}
			
		case ON_TICK: {
			const newAlerts = [...state.alerts];
			const now = new Date();
			for(var i = newAlerts.length - 1; i >= 0; i--) {
				if (newAlerts[i].expire < now) {
					newAlerts.splice(i, 1);
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
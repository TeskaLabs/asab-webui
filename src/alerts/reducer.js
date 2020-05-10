// Actions
import { AlertsTypes } from './actions';

const initialState = {
		alerts: [],
}

export default function AlertsReducer(state = initialState, action) {
	switch (action.type) {
		
		case AlertsTypes.ADD_ALERT:
			const newAlert = {
				key: Math.floor(Math.random() * 65536),
				message: action.message,
				level: action.level,
			}
			return {
				...state,
				alerts: [...state.alerts, newAlert]
			}

		case AlertsTypes.DEL_ALERT:
			const newAlerts = [...state.alerts];
			for(var i = newAlerts.length - 1; i >= 0; i--) {
				if(newAlerts[i].key === action.key) {
					newAlerts.splice(i, 1);
				}
			}

			return {
				...state,
				alerts: newAlerts
			}
			
		default:
			return state
	}
}
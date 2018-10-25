export const actions = {
	CREATE_NOTIFICATION: "CREATE_NOTIFICATION",
	REMOVE_NOTIFICATION: "REMOVE_NOTIFICATION",
}



export function createNotification(notification) {
	return {
		type: actions.CREATE_NOTIFICATION,
		notification: notification
	}
}

export function removeNotification(id) {
	return {
		type: actions.REMOVE_NOTIFICATION,
		id: id
	}
}


const initialState = {
  notifications: [],
}

export function reducer(state=initialState, action) {
	switch(action.type) {
		case actions.CREATE_NOTIFICATION:
			return Object.assign({}, state, {
				notifications: [
					Object.assign({}, action.notification, {id: 1}),
					...state.notifications,
				]
			});
			case actions.REMOVE_NOTIFICATION:
				return Object.assign({}, state, {
					notifications: state.notifications.filter((notification)=>notification.id != action.id)
				});
		default:
			return state;
	}
}

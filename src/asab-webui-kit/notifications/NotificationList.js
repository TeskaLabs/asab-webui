import React from 'react';
import {connect} from 'react-redux';
import Notification from './Notification';
import {createNotification} from './redux';

class NotificationList extends React.Component {

	render() {
		const {notifications, dispatch, onClickNotification,
			className, ...props} = this.props;
		const notificationsCount = notifications ? notifications.length : 0;
		return(
			<div {...props} className={`streamline message-nicescroll-bar ${className ? className : ""}`}>
				{notifications.map((notification, index)=>(
					<div>
					<Notification
						notification={notification}
						onClick={onClickNotification}/>
					{index+1 < notificationsCount ? (
						<hr className="light-grey-hr ma-0"/>
					) : null}
					</div>
				))}
			</div>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		notifications: state.notifications.notifications,
	}
}
export default connect(mapStateToProps)(NotificationList);

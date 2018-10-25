import React from 'react';

class Notification extends React.Component {
	constructor(props) {
		super(props);

		// TODO: complete this map
		this.levelToBgClassMap = {
			'info': 'bg-blue',
			'warning': 'bg-yellow',
		};
		this.levelToHeadingClassMap = {
			'info': 'txt-info',
			'warning': 'txt-warning',
		};
	}
	render() {
		const {notification, className, ...props} = this.props;
		const {heading, text, time, level} = notification;
		const iconBgClass = notification.iconBgClass ? notification.iconBgClass : this.levelToBgClassMap[level];
		const headingClass = notification.headingClass ? notification.headingClass : this.levelToHeadingClassMap[level];
		return(
			<div {...props} className={`sl-item ${className ? className : ""}`}>
				<a href="javascript:void(0)">
					{notification.avatarSrc ? (
						<div className='sl-avatar'>
							<img className="img-responsive" src={notification.avatarSrc} alt="avatar"/>
						</div>
					): null}
					{notification.iconClass ? (
						<div className={`icon ${iconBgClass}`}>
							<i className={`zmdi ${notification.iconClass}`}></i>
						</div>
					): null}

					<div className="sl-content">
						<span className={`inline-block capitalize-font  pull-left truncate head-notifications ${headingClass}`}>{heading}</span>
						<span className="inline-block font-11 pull-right notifications-time">{time}</span>
						<div className="clearfix"></div>
						<p className="truncate">{text}</p>
					</div>
				</a>
			</div>
		)
	}
}
export default Notification;

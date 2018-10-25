import React, { Component } from 'react';


class DropdownItem extends React.Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}
	onClick() {
		this.props.onSelect(this);
	}
	render() {
		const {title, ...props} = this.props;
		return (
			<li {...props}><a href="javascript:void(0)" onClick={this.onClick}>{title}</a></li>
		)
	}
}

export default DropdownItem;

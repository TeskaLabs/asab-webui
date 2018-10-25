import React, { Component } from 'react';


class Col extends Component {
	render() {
		const { children, className, xs, sm, md, lg, xsOffset, smOffset, mdOffset, lgOffset } = this.props;
		const _className = this.buildClassName(className, xs, sm, md, lg, xsOffset, smOffset, mdOffset, lgOffset)
		return (
			<div className={`${_className}`}>
				{children}
			</div>
		);
	}

	buildClassName(className, xs, sm, md, lg, xsOffset, smOffset, mdOffset, lgOffset) {
		let ret = "";
		if (xs) ret += " col-xs-"+xs;
		if (sm) ret += " col-sm-"+sm;
		if (md) ret += " col-md-"+md;
		if (lg) ret += " col-lg-"+lg;
		if (xsOffset) ret += " col-xs-offset-"+xsOffset;
		if (smOffset) ret += " col-sm-offset-"+smOffset;
		if (mdOffset) ret += " col-md-offset-"+mdOffset;
		if (lgOffset) ret += " col-lg-offset-"+lgOffset;
		// Default
		if (ret === "")
			ret = "col-sm-12";
		// Other classes
		ret += (className ? " "+className : "");
		// Trim and return
		return ret.trim();
	}
}

export default Col;

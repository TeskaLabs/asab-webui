import React, { Component } from 'react';
import SideBarLink from './SideBarLink'

class SideBarList extends Component {
	render() {
		const {listId, listTitle, listIconClass, listActive,
			listLabelClass, listLabelTitle, children, className, listClassName, ...props} = this.props;
		return (
			<SideBarLink
				linkHref="javascript:void(0);"
				linkTargetId={listId}
				linkTitle={listTitle}
				linkActive={listActive}
				linkIconClass={listIconClass}
				linkLabelClass={listLabelClass}
				linkLabelTitle={listLabelTitle}
				linkLabelIcon={"zmdi-caret-down"}
				className={(className ? className : "")}
				{...props}>
				<ul id={listId} className={"collapse collapse-level-1"+(listClassName ? " "+listClassName : "")}>
					{children}
				</ul>
			</SideBarLink>
		);
	}
}

export default SideBarList;

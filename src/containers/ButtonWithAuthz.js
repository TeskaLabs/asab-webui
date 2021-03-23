import React, { Component } from 'react';
import { Button } from 'reactstrap';

/*
	ButtonWithAutz component emulates the functionality of reactstrap <Button/> component
	and extend it by disable feature based on resources.

	* resource
		* the resource to distinguish access rights, e.g. yourproduct:yourcomponent:write

	* resources
		* the list of resources from the userinfo

	* titleUnauthorized
		* the title text (on button hover text) displayed to user with restricted access

---

	Example:

	import { ButtonWithAuthz } from 'asab-webui';

	...

	const resources = props.userinfo.resources

	...

	return(
		...
			<ButtonWithAuthz
				title={t('MyApp|Delete')}
				titleUnauthorized={t('MyApp|You do not have rights')}
				color="danger"
				size="sm"
				onClick={() => { deleteApp() }}
				resource="myapp:mylist:write"
				resources={resources}
				>
				<span className="cil-trash pr-2" />
				{t('MyApp|Delete')}
			</ButtonWithAuthz>
		...
	)

*/

export function ButtonWithAuthz(props) {
	let disabled = props.resources.indexOf(props.resource) == -1;
	let title = props.title;

	// Check on title eventually passed in the props
	if (disabled) {
		title = props.titleUnauthorized;
	}
	// Check on disabled eventually passed in the props
	if (props.disabled && disabled == false) {
		disabled = props.disabled;
	}

	return (
		<Button
			id={props.id}
			key={props.key}
			active={props.active}
			block={props.block}
			color={props.color}
			outline={props.outline}
			innerRef={props.innerRef}
			onClick={props.onClick}
			size={props.size}
			className={props.className}
			cssModule={props.cssModule}
			onSubmit={props.onSubmit}
			title={title}
			disabled={disabled}
			>
			{props.children}
		</Button>
	)
}

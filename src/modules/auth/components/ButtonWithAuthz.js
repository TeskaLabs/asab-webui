import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { authz } from './authz';

/*
	ButtonWithAutz component emulates the functionality of reactstrap <Button/> component
	and extend it by disable feature based on resources.

	* resource
		* the resource to distinguish access rights, e.g. yourproduct:yourcomponent:write

	* resources
		* the list of resources from the userinfo

	* hideOnUnauthorizedAccess
		* the option to hide the button completely instead of disabling it, default is false

	* Language localisations for generic `unauthorized message` can be added to the translation.json files of
	  public/locales/en & public/locales/cs of the product where component ButtonWithAuthz is used. The default
	  message is `You do not have rights` and it can be re-set in locales as e.g.

	  {
		"You do not have access rights to perform this action": "You do not have access rights to perform this action"
	  }

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
				color="danger"
				size="sm"
				onClick={() => { deleteApp() }}
				resource="myapp:mylist:write"
				resources={resources}
				hideOnUnauthorizedAccess={true}
				>
				<span className="cil-trash pr-2" />
				{t('MyApp|Delete')}
			</ButtonWithAuthz>
		...
	)

*/

export function ButtonWithAuthz(props) {
	let childProps = {...props}; // Create a new child component to have option to remove props
	let authzObj = authz(childProps);

	const disabled = authzObj.disabled;
	const hide = authzObj.hide;
	const title = authzObj.title;

	return (
		hide && disabled ? null :
		<Button
			{...childProps}
			title={title}
			disabled={disabled}
			>
			{childProps.children}
		</Button>
	)
}

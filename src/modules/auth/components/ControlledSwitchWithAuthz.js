import React, { Component } from 'react';
import { ControlledSwitch } from 'asab-webui';
import { authz } from './authz';

/*
	ControlledSwitchWithAuthz component emulates the functionality of asab-webui <ControlledSwitch/> component
	and extend it by disable feature based on resources.

	* resource
		* the resource to distinguish access rights, e.g. yourproduct:yourcomponent:write

	* resources
		* the list of resources from the userinfo

	* hideOnUnauthorizedAccess
		* the option to hide the button completely instead of disabling it, default is false

	* Language localisations for generic `unauthorized message` can be added to the translation.json files of
	  public/locales/en & public/locales/cs of the product where component ControlledSwitchWithAuthz is used. The default
	  message is `You do not have rights` and it can be re-set in locales as e.g.

	  {
		"You do not have access rights to perform this action": "You do not have access rights to perform this action"
	  }

---

	Example:

	import { ControlledSwitchWithAuthz } from 'asab-webui';
	import { useSelector } from 'react-redux';

	...

	const resources = useSelector(state => state.auth?.resources);

	...

	return(
		...
			<ControlledSwitchWithAuthz
				title={t(`MyModule|${isDisabled ? "Enable" : "Disable"} file`)}
				size="sm"
				isOn={!isFileDisabled}
				toggle={switchFileState}
				resource="myapp:mylist:write"
				resources={resources}
				hideOnUnauthorizedAccess={true}
			/>
		...
	)

*/

export function ControlledSwitchWithAuthz(props) {
	let childProps = {...props}; // Create a new child component to have option to remove props
	let authzObj = authz(childProps);

	const disabled = authzObj.disabled;
	const hide = authzObj.hide;
	const title = authzObj.title;

	return (
		hide && disabled ? null :
		<ControlledSwitch
			{...childProps}
			title={title}
			disabled={disabled}
		/>
	)
}

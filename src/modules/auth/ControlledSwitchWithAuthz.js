import React, { Component } from 'react';
import { ControlledSwitch } from 'asab-webui';
import { useTranslation } from 'react-i18next';

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

	const resources = useSelector(state => state.auth?.userinfo?.resources);

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
	const { t, i18n } = useTranslation();
	let childProps = {...props}; // Create a new child component to have option to remove props
	let disabled = childProps.resources ? childProps.resources.indexOf(childProps.resource) === -1 : true;
	// If user is superuser, then button is enabled
	if (childProps.resources.indexOf('authz:superuser') !== -1) {
		disabled = false;
	}
	// If defined, hide the disabled button
	let hide = childProps.hideOnUnauthorizedAccess ? true : false;
	// Remove hideOnUnauthorized element from props to avoid react warnings
	if (childProps.hideOnUnauthorizedAccess) {
		delete childProps["hideOnUnauthorizedAccess"];
	}
	let title = childProps.title;
	// Check on title eventually passed in the props
	if (disabled) {
		 title = t("You do not have access rights to perform this action");
	}
	// Check on disabled eventually passed in the props
	if (childProps.disabled && disabled == false) {
		disabled = childProps.disabled;
	}

	return (
		hide && disabled ? null :
		<ControlledSwitch
			{...childProps}
			title={title}
			disabled={disabled}
		/>
	)
}

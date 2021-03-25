import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { useTranslation } from 'react-i18next';

/*
	ButtonWithAutz component emulates the functionality of reactstrap <Button/> component
	and extend it by disable feature based on resources.

	* resource
		* the resource to distinguish access rights, e.g. yourproduct:yourcomponent:write

	* resources
		* the list of resources from the userinfo

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
				>
				<span className="cil-trash pr-2" />
				{t('MyApp|Delete')}
			</ButtonWithAuthz>
		...
	)

*/

export function ButtonWithAuthz(props) {
	const { t, i18n } = useTranslation();
	let disabled = props.resources ? props.resources.indexOf(props.resource) == -1 : true;
	let title = props.title;
	// Check on title eventually passed in the props
	if (disabled) {
		 title = t("You do not have access rights to perform this action");
	}
	// Check on disabled eventually passed in the props
	if (props.disabled && disabled == false) {
		disabled = props.disabled;
	}

	return (
		<Button
			{...props}
			title={title}
			disabled={disabled}
			>
			{props.children}
		</Button>
	)
}

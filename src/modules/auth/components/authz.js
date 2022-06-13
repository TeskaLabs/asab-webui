import { useTranslation } from 'react-i18next';
// Used for Button and Switches with authz
export const authz = (childProps) => {
	const { t, i18n } = useTranslation();

	let disabled = childProps.resources && childProps.resource ? childProps.resources.indexOf(childProps.resource) === -1 : true;
	// If user is superuser, then button is enabled
	if (childProps.resources && childProps.resources.indexOf('authz:superuser') !== -1) {
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
	return {disabled: disabled, hide: hide, title: title};
}

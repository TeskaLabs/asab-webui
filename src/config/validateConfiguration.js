/*

	Function for configuration validation with current tenant

	It will work only when Tenant module is loaded in the application
	It require app props and configuration
	Configuration has to be of type `object` (not array of objects)
	It returns `false` if configuration does not match validation criteria on tenant
	It returns `true` if configuration match the validation criteria on tenant

	Example of usage in the configuration:

	```
		"Authorization" {
			"tenants": "tenant1, tenant2"
		}
	```

	Example of usage within the code:

	```
	import { validateConfiguration } from 'asab-webui';

	...


		if (configuration && Object.keys(configuration).length > 0) {

			...

			// This part will manage if the configuration is suitable for further processing
			if (validateConfiguration(props, configuration)) {
				return;
			}

			// Processing configuration which passed the authorization criteria
			...
		}
	```

	Example of config for validateConfiguration function

	```
		...

		let config = {
				...

				"SectionName:datasource" {
					...
				},
				"Authorization" {
					"tenants": "tenant1, tenant2"
				},
				...
			}

		if (validateConfiguration(props, config)) {
			return;
		}
		...

	```

	The result of processing after validation should be that configuration, which has specified tenants
	in the configuration and does match the criterion (match the configured tenants in the `Authorization`
	section with current tenant of the user), will be visible only to the users, whos current tenant matches
	the criteria.

*/
export const validateConfiguration = (props, config) => {
	// Check if Tenant module is present within the application
	if (props.app.Services.TenantService) {
		let currentTenant = props.app.Services.TenantService.get_current_tenant();
		// Get object with authorization setup (if defined in the configuration)
		// TODO: Remove support of ":authorization" by the end of 2022
		let authSection = Object.keys(config).filter(res => res.includes(`:authorization`) || res == "Authorization");
		// Check if current tenant exist and if authorization section is present within the configuration
		if (currentTenant && config[authSection[0]]) {
			let tenantsSplit = config[authSection[0]]?.tenants ? config[authSection[0]]?.tenants.toString().split(",") : [""];
			let tenantsArray = [];
			tenantsSplit.map(value => {
				// Check if there is a whitespace in the first position of the string, and if so, erase that
				if(value.substring(0,1) == " ") {
					tenantsArray.push(value.substring(1));
				} else {
					tenantsArray.push(value);
				}
			})
			if (tenantsArray[0] != "" && tenantsArray.indexOf(currentTenant) == -1) {
				return true;
			}
		}
		return false;
	}
	return false;
}

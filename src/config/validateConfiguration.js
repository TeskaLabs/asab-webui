// import React from 'react';

// TODO: here I must implement check on :authorization >> to get the correct config section

export const validateConfiguration = (props, config) => {
	let currentTenant = props.app.Services.TenantService ? props.app.Services.TenantService.get_current_tenant() : undefined;

	if (currentTenant && typeof config.tenants == "string") {
		let tenantsSplit = config.tenants.toString().split(",");
		let tenantsArray = [];
		tenantsSplit.map(value => {
			// Check if there is a whitespace in the first position of the string, and if so, erase that
			if(value.substring(0,1) == " ") {
				tenantsArray.push(value.substring(1));
			} else {
				tenantsArray.push(value);
			}
		})
		if (tenantsArray.indexOf(currentTenant) == -1) {
			return false;
		}
		return true;
	}
	return true;
}
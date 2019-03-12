export const types = {
    GET_TENANTS_SUCCESS: "GET_TENANTS_SUCCESS",
    GET_TENANTS_ERROR: "GET_TENANTS_ERROR",
    SELECT_TENANT: "SELECT_TENANT",
}

export const getTenants = () => ({ type: types.GET_TENANTS, payload: tenants })
export const selectTenant = currentTenant => ({ type: types.SELECT_TENANT, payload: currentTenant })

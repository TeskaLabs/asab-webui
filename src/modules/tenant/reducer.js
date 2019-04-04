// Actions
import {types} from './actions';
  

const initialState = {
    tenants: [],
    currentTenant: null,
    error: null,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
      case types.GET_TENANTS_SUCCESS:
        return {
            error: null,
            tenants: action.payload,
            currentTenant: action.payload[0].id
        }
        
      case types.GET_TENANTS_ERROR:
        return {
            ...state,
            error: action.error
        }      
        
    
      case types.SELECT_TENANT:
        return {
            ...state,
            currentTenant: action.payload
        }
  
      default:
        return state
    }
}
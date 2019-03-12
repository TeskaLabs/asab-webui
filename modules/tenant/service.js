import Service from '../../abc/Service';
import Api from './api';

export default class TenantService extends Service {
    constructor(app, name="TenantService") {
        super(app, name);
      }

    initialize() {
        this.Store = this.App.Store;
        this.get_tenants();
    }

    get_tenants() {
        Api.get_tenants().then(response => {
            let payload = response.data; 
            console.log(payload);
            this.Store.dispatch({ type: GET_TENANTS_SUCCESS, payload });
          }).catch((error) => {
            this.Store.dispatch({ type: GET_TENANTS_ERROR, error });
          });	
    }
}
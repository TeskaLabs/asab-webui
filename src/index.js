import "babel-polyfill";

export {default as Application} from './containers/Application';
export {getBaseName} from './basename';

export {
	default as TenantModule
} from './modules/tenant/module';

import "./style.scss";

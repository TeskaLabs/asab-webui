import "babel-polyfill";

export { default as Application } from './containers/Application';
export { getBaseName } from './basename'; // THIS FUNCTION HAS BEEN DEPRECATED - DELETE AFTER SEP 2021

export { DateTime } from './containers/DateTime';
export { Humanize } from './containers/Humanize';
export { DataTable } from './containers/DataTable';
export { ButtonWithAuthz } from './modules/auth/ButtonWithAuthz';
export { Spinner } from './containers/Spinner';
export { KnowledgeBase } from './containers/KnowledgeBase';
export { default as SplashScreen } from './containers/SplashScreen';
export { default as Pagination } from './containers/Pagination';
export { default as ControlledSwitch } from './containers/ControlledSwitch';
export { default as UncontrolledSwitch } from './containers/UncontrolledSwitch';
export { UsernameTranslation } from './containers/UsernameTranslation'

import "./style.scss";

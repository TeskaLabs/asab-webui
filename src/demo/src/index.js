import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {
	notificationsRedux
} from 'asab-webui-kit' ;


const store = createStore(
	combineReducers({
		notifications: notificationsRedux.reducer
	}),
);

ReactDOM.render((
	<Provider store={store}>
		<App />
	</Provider>
), document.getElementById('root'));
registerServiceWorker();

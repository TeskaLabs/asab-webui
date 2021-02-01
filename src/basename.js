/*
 This function to be used with Browser router:

import { Application, getBaseName } from 'asab-webui';
...

// Render
ReactDOM.render((
	<BrowserRouter basename={getBaseName()}>
		<Application modules={modules} />
	</BrowserRouter>
), document.getElementById('app'));
*/
// DELETE AFTER SEP 2021
export const getBaseName = () => {
	console.warn('\"getBaseName\" function has been deprecated.');
	var publicUrl = __CONFIG__["publicUrl"];
	if (publicUrl == "") {
		return "";
	}
	else if (publicUrl.startsWith("/")) {
		return publicUrl;
	} else {
		publicUrl = new URL(publicUrl);
		return publicUrl.pathname;
	}
}

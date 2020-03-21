/*
 This function to be used with Browser router:

import { Application, getBaseName } from 'asab-webui-kit-lite';
...

// Render
ReactDOM.render((
	<BrowserRouter basename={getBaseName()}>
		<Application modules={modules} />
	</BrowserRouter>
), document.getElementById('app'));
*/

export const getBaseName = () => {
	var publicUrl = __CONFIG__["publicUrl"];
	console.log(publicUrl);
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

/*

Use only within async functions as per example below.
locationReplace function help to avoid unintended async actions
before window.location.replace has finished.


```
import { locationReplace } from 'asab-webui';

const myFunc = async () => {
	...

	const url = "url/to/replace";
	await locationReplace(url);
	...
}

```

*/

export const locationReplace = async (url) => {
	window.location.replace(url.toString());
	await new Promise(r => setTimeout(r, 3600 * 1000)); // Basically wait forever, this the app is going to be reloaded
}

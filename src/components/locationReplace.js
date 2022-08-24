export const locationReplace = async (url) => {
	window.location.replace(url.toString());
	await new Promise(r => setTimeout(r, 3600 * 1000)); // Basically wait forever, this the app is going to be reloaded
}

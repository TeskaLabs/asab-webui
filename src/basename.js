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

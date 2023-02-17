import React from "react";

export class Renderer {
	// Renderer defaults
	constructor(app) {
	}

	render(key, value, schemaField) {
		return (<span>{value}</span>);
	}

	plain(key, value, schemaField)	{
		return value?.toString();
	}
}

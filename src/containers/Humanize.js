import React, { Component } from 'react'

/*
Diplays values in human readable form.

Usage:

import { Humanize } from 'asab-webui';
...

<Humanize value={123456789} base={1000} decimals={5} displaySizes={true} />


The input `value` is mandatory, others are optional:

* `value` - value to be humanized
* `base` - conversion size
* `decimals` - number of decimals to be displayed
* `displaySizes` - default false, if set to true, it will display predefined prefixes for sizes

*/

export function Humanize(props) {
	let base = 1024;
	let decimals = 2;
	let displaySizes = false

	if ((props.value === null) || (props.value === undefined)) {
		return (
			<span className="humanize">{' '}</span>
		)
	}

	Object.keys(props).map((prop) => {
		if (prop === "base") {
			base = props[prop]
		}
		if (prop === "decimals") {
			decimals = props[prop]
		}
		if (prop === "displaySizes") {
			displaySizes = props[prop]
		}
		});


	var h = formatInput(props.value, base, decimals, displaySizes);

	return (
		<span className="humanize">
			{h}
		</span>
	)
}


function formatInput(value, base, decimals, displaySizes) {
	if (value === 0) return '0';

	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
	const i = Math.floor(Math.log(value) / Math.log(base));

	if (displaySizes === true) {
		return parseFloat((value / Math.pow(base, i)).toFixed(dm)) + ' ' + sizes[i];	
	}
	return parseFloat((value / Math.pow(base, i)).toFixed(dm));
}

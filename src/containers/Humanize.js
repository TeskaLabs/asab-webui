import React, { Component } from 'react'

/*
Diplays values in human readable form, like:
0.000001 => 1 µ
0.00001 => 10 µ
0.0001 => 100 µ
0.001 => 1 m
0.01 => 10 m
0.1 => 100 m
1 => 1
10 => 10
100 => 100
1000 => 1 k
10000 => 10 k
100000 => 100 k
1000000 => 1 M
etc

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
	let base = props.base ? props.base : 1000;
	let decimals = props.decimals ? props.decimals : 0;
	let displaySizes = props.displaySizes ? props.displaySizes : false;

	if ((props.value === null) || (props.value === undefined)) {
		return (
			<span className="humanize">{' '}</span>
		)
	}

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


	if (value >= 1.0) {
		const index = Math.floor(Math.log(value) / Math.log(base));
		const units = ['', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
		if (displaySizes === true) {
			return parseFloat((value / Math.pow(base, index)).toFixed(dm)) + ' ' + units[index];
		}

		return parseFloat((value / Math.pow(base, index)).toFixed(dm));
	}

	if (value > 0.0 && value < 1.0) {

		const index = (-1) * Math.floor(Math.log(value) / Math.log(base));
		const units = ['', 'm', 'µ', 'n', 'p', 'f', 'a', 'z', 'y']

		if (displaySizes === true) {
			return parseFloat((value * Math.pow(base, index)).toFixed(dm)) + ' ' + units[index];
		}

		return parseFloat((value * Math.pow(base, index)).toFixed(dm));
	}

	if (value < 0.0 && value > -1.0) {

		const absoluteValue = value * -1
		const index = (-1) * Math.floor(Math.log(absoluteValue) / Math.log(base));
		const units = ['', 'm', 'µ', 'n', 'p', 'f', 'a', 'z', 'y']

		if (displaySizes === true) {
			return '-' + parseFloat((absoluteValue * Math.pow(base, index)).toFixed(dm)) + ' ' + units[index];
		}

		return '-' + parseFloat((absoluteValue * Math.pow(base, index)).toFixed(dm));
	}

	if (value <= -1.0) {
		const absoluteValue = value * -1
		const index = Math.floor(Math.log(absoluteValue) / Math.log(base));
		const units = ['', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
		if (displaySizes === true) {
			return '-' + parseFloat((absoluteValue / Math.pow(base, index)).toFixed(dm)) + ' ' + units[index];
		}

		return '-' + parseFloat((absoluteValue / Math.pow(base, index)).toFixed(dm));
	}
}

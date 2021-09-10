import React from 'react';

import { Table } from 'reactstrap';
import { DateTime } from 'asab-webui';

import JSONObject from './JSONObject';

export const isObject = value => Object.prototype.toString.call(value) === "[object Object]";
export const isDate = value => typeof value === 'string' && value[value.length-1] === "Z" && !isNaN(new Date(value))

const JSONTable = ({ data }) => {
	const headers = [];
	
	data.forEach(obj => {
		Object.keys(obj).forEach(key => {
			if (headers.indexOf(key) === -1)
				headers.push(key);
		})
	})


	return (
		<Table responsive bordered>
			<thead>
				<tr>
					{headers.map((header, idx) => 
						<th key={idx}>{header}</th>
					)}
				</tr>
			</thead>
			<tbody>
				{data.map((obj, dataIdx) => (
					<tr key={dataIdx}>
						{headers.map((header, headerIdx) => {
							let value=obj[header];

							if (isDate(value)) {
								value = <DateTime value={value} />
							}
							else if (isObject(value) || Array.isArray(value)) {
								value = <JSONObject data={value} />
							}

							return headerIdx === 0 ? (
								<th scope="row" key={headerIdx}>{value}</th>
							) : <td key={headerIdx}>{value}</td>
						})}
					</tr>
				))}
			</tbody>
		</Table>
	);
}

export default JSONTable;

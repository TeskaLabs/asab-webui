import React from 'react';

import { Table } from 'reactstrap';
import { DateTime } from 'asab-webui';

import { isObject, isDate } from './JSONTable';

const JSONObject = ({ data }) => {
	const headers = Object.keys(data);

	return (
		<Table size="sm">
			<tbody>
				{headers.map((header, idx) => {
					let value = data[header];

					if (isDate(value)) {
						value = <DateTime value={value} />
					}
					else if (isObject(value) || Array.isArray(value)) {
						value = <JSONObject data={value} />
					}

					return (
						<tr key={idx}>
							<th>{header}</th>
							<td>{value}</td>
						</tr>
				)})}
			</tbody>
		</Table>
	)
}

export default JSONObject;
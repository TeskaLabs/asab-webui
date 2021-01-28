import React from 'react';
import { connect } from 'react-redux';

import ReactJson from 'react-json-view';
import { Table } from 'reactstrap';

const TableCell = ({ value, idx, json }) => {
	if (!value) return <td className="pl-3" style={{ whiteSpace: "nowrap" }}>-</td>;

	let cell;
	if (json) cell = <ReactJson src={value} name={false} collapsed />
	else cell = value

	return idx === 0 ? (
		<th scope="row" style={{ whiteSpace: "nowrap", maxWidth: "40rem", textOverflow: "ellipsis" , overflow: "hidden" }}>
		{cell}
		</th>
		) : (
		<td className="pl-3" style={{ whiteSpace: "nowrap" }}>
		{cell}
		</td>
		);
};

const Headers = ({ headers }) => (
	<>
		<colgroup>
		{headers.map((_, idx) =>
			<col
			style={{ width: idx === headers.length - 1 ? "auto" : "1px" }}
			key={idx}
			/>
		)}
		</colgroup>
		<thead>
		<tr>
			{headers.map((header, idx) => <th key={idx} className={idx !== 0 ? "pl-3" : null}>{header.name}</th>)}
		</tr>
		</thead>
	</>
);

function ASABTable ({ data, headers, advmode }) {
	const headersRow = [...headers];
	if (advmode) headersRow.push({ name: ' ', json: true });

	const TableRows = data.map((obj, i) => (
		<tr key={i}>
		{headersRow.map((header, idx) => {
			if (header.json) return <TableCell value={obj} json key={idx}/>
			return <TableCell value={obj[header.key]} key={idx} idx={idx}/>
			})}
		</tr>
	));

	return (
		<Table size="sm">
		<Headers headers={headersRow} />
		<tbody>
			{TableRows}
		</tbody>
		</Table>
	);
};

const mapStateToProps = (state) => ({ advmode: state.advmode.enabled });

export default connect(mapStateToProps)(ASABTable);
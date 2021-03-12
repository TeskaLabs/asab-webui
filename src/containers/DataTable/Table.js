import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ReactJson from 'react-json-view';
import { Table } from 'reactstrap';

import { DateTime } from '../DateTime';

const TableCell = ({ obj, header, idx, advmode }) => {
	if (!obj) return <td className="pl-3" style={{ whiteSpace: "nowrap" }}>-</td>

	let cell;

	if (advmode) cell = <ReactJson src={obj} name={false} collapsed />

	else if (header.json) cell = (
		<ReactJson
			src={obj[header.key]}
			name={false}
			collapsed
			enableClipboard={false}
		/>
	);
	
	else if (header.link) {
		const pathname = header.link.pathname + obj[header.link.key];
		cell = obj[header.key] ? <Link to={{ pathname }}>{obj[header.key]}</Link> : "-";
	}

	else if (header.datetime) cell = obj[header.key] ? (
		<DateTime
			value={obj[header.key]}
			format={header.datetime.format}
		/>
	) : "-";
	else if (header.customComponent) {
		cell = header.customComponent(obj, header);
	}

	else cell = obj[header.key];

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

const Headers = ({ headers, advmode }) => (
	<>
		<colgroup>
			{headers.map((_, idx) =>
				<col
					style={{ width: (idx === headers.length - 1) && !advmode ? "auto" : "1px" }}
					key={idx}
				/>
			)}
			{advmode && <col style={{ width: "auto" }}/>}
		</colgroup>

		<thead>
			<tr>
				{headers.map((header, idx) => <th key={idx} className={idx !== 0 ? "pl-3" : null}>{header.name}</th>)}
				{advmode && <th className="pl-3">{" "}</th>}
			</tr>
		</thead>
	</>
);

const ASABTable = ({ data, headers, advmode }) => (
	<Table size="sm">
		<Headers headers={headers} advmode={advmode}/>
		<tbody>
			{data.map((obj, i) => (
				<tr key={i}>
					{headers.map((header, idx) => (
						<TableCell 
							obj={obj}
							header={header}
							idx={idx}
							key={idx}
						/>
					))}
					{advmode && <TableCell obj={obj} advmode/>}
				</tr>
			))}
		</tbody>
	</Table>
);

const mapStateToProps = (state) => ({ advmode: state.advmode.enabled });

export default connect(mapStateToProps)(ASABTable);

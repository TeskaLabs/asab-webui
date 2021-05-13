import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ReactJson from 'react-json-view';
import { Table, Button, Collapse } from 'reactstrap';
import { Transition } from 'react-transition-group';

import { DateTime } from '../DateTime';

import ActionButton from './ActionButton';

const TableCell = ({ obj, header, idx, showJson }) => {
	if (!obj) return <td className="pl-3" style={{ whiteSpace: "nowrap" }}>-</td>

	let cell, icon;

	if (header?.icon) {
		icon =  typeof header.icon === 'string' ? (<i className={`${header.icon} pr-1`}></i>) : (header.icon);
	} else {
		icon = null;
	}

	if (showJson) {
		return (
			<td className="pr-3 data-table-td" style={{ padding: "auto" }}>
				<span
					onClick={showJson}
					className="data-table-button text-primary"
					style={{ cursor: "pointer" }}
				>
					<i className="cil-list-low-priority"></i>
				</span>
			</td>
		);
	}

	else if (header.json) cell = (
		<ReactJson
			className="data-table-reactjson"
			src={obj[header.key]}
			name={false}
			collapsed
			enableClipboard={false}
		/>
	);

	else if (header.link) {
		const pathname = header.link.pathname + obj[header.link.key];
		cell = obj[header.key] ? <Link to={{ pathname }} className="data-table-link">{icon} {obj[header.key]}</Link> : "-";
	}

	else if (header.datetime) cell = obj[header.key] ? (
		<DateTime
			className="data-table-datetime"
			value={obj[header.key]}
			format={header.datetime.format}
		/>
	) : "-";

	else if (header.actionButton) {
		cell = (
			<ActionButton
				row={obj}
				header={header}
				actionButton={header.actionButton} 
			/>
		);
	}

	else if (header.customComponent) {
		cell = header.customComponent.generate(obj, header);
	}

	else cell = obj[header.key];

	if (icon && !(header.link || header.datetime || header.actionButton)) {
		cell = <>{icon} {cell}</>;
	}

	return idx === 0 ? (
			<th
				className="data-table-th"
				scope="row"
				style={{
					whiteSpace: "nowrap",
					maxWidth: "40rem",
					textOverflow: "ellipsis",
					overflow: "hidden" 
				}}
			>
				{cell}
			</th>
		) : (
			<td className="pl-3 data-table-td" style={{ whiteSpace: "nowrap" }}>
				{cell}
			</td>
		);
};

const Headers = ({ headers, advmode }) => (
	<>
		<colgroup className="data-table-colgroup">
			{advmode && <col style={{ width: "1px" }}/>}
			{headers.map((_, idx) =>
				<col
					className={`data-table-col${idx}`}
					style={{ width: (idx === headers.length - 1) ? "auto" : "1px" }}
					key={idx}
				/>
			)}
		</colgroup>

		<thead className="thead-light data-table-thead">
			<tr className="data-table-tr">
				{advmode && <th className="pl-3 data-table-adv-header-th">{" "}</th>}
				{headers.map((header, idx) => <th key={idx} className={`data-table-header-th${idx !== 0 ? " pl-3" : null}`}>{header.name}</th>)}
			</tr>
		</thead>
	</>
);

const TableRow = ({ obj, advmode, headers }) => {
	const [isUnwrapped, setUnwrapped] = useState(false);

	return (
		<>
			<tr className="data-table-tr">
				{advmode && <TableCell obj={obj} showJson={() => setUnwrapped(prev => !prev)}/>}
				{headers.map((header, idx) => (
					<TableCell 
						obj={obj}
						header={header}
						idx={idx}
						key={idx}
					/>
				))}
			</tr>
			
			
			{advmode && isUnwrapped && (
				<tr className="data-table-adv-tr" style={{ backgroundColor: "rgba(0, 0, 0, 0.025)"}}>
					<td 
						colSpan={headers.length+1}
						className="data-table-adv-td"
					>
						<ReactJson
							src={obj}
							name={false}
						/>
					</td>
				</tr>
			)}
			
		</>
	)
}

const ASABTable = ({ data, headers, advmode }) => (
	<Table size="sm" hover responsive>
		<Headers headers={headers} advmode={advmode} className="data-table-header"/>
		<tbody className="data-table-tbody">
			{data.map((obj, idx) => (
				<TableRow {...{ obj, advmode, headers }} key={idx}/>
			))}
		</tbody>
	</Table>
);

const mapStateToProps = (state) => ({ advmode: state.advmode.enabled });

export default connect(mapStateToProps)(ASABTable);

import React, { useState, useMemo } from 'react';
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import ReactJson from 'react-json-view';
import { Table } from 'reactstrap';

import { DateTime } from '../DateTime';

import { ActionButton } from './Buttons';

const TableCell = ({
	obj, header, idx,
	showJson, jsonTheme, isSublist
}) => {
	if (!obj) return <td className="pl-3" style={{ whiteSpace: "nowrap" }}>-</td>

	let cell, icon, customCellStyle;
	let textLinkStyle = {
		whiteSpace: "nowrap",
		marginBottom: 0
	}

	if (header?.customCellStyle) {
		customCellStyle = header.customCellStyle;
		textLinkStyle = {...textLinkStyle, ...customCellStyle}
	}

	if (header?.icon) {
		icon =  typeof header.icon === 'string'
			? (<i className={`${header.icon} pr-1`}></i>)
			: (header.icon);
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
					<i className="at-u-turn-arrow-down"></i>
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
			theme={jsonTheme}
		/>
	);

	else if (header.link) {
		let pathname = "#";
		if (typeof header.link === "object") {
			pathname = header.link.pathname + obj[header.link.key];
		} else if (typeof header.link === "function") {
			pathname = header.link(obj, header);
		}
		cell = obj[header.key] ? (
			<Link
				to={{ pathname }}
				className="data-table-link"
				style={textLinkStyle}
				title={obj[header.key]}
			>
				{icon} {obj[header.key]}
			</Link>
		) : "-";
	}

	else if (header.datetime) cell = obj[header.key] ? (
		<DateTime
			className="data-table-datetime"
			value={obj[header.key]}
			dateTimeFormat={header?.datetime?.dateTimeFormat ? header?.datetime?.dateTimeFormat : "medium"}
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

	else cell = obj[header.key] ? (
		<p style={textLinkStyle} title={obj[header.key]}>{obj[header.key]}</p>
	) : "-";

	if (icon && !(header.link || header.datetime || header.actionButton)) {
		cell = <>{icon} {cell}</>;
	}

	return idx === 0 && !isSublist ? (
			<th className="data-table-th" scope="row" style={{...customCellStyle}}>
				{cell}
			</th>
		) : (
			<td className="pl-3 data-table-td" style={{ whiteSpace: "nowrap", ...customCellStyle }}>
				{cell}
			</td>
		);
};

const Headers = ({ headers, advmode, sublists }) => (
	<>
		<colgroup className="data-table-colgroup">
			{advmode && <col style={{ width: "1px" }} />}
			{sublists && <col style={{ width: "1px" }} />}
			{headers.map((_, idx) =>
				<col
					className={`data-table-col${idx}`}
					style={{ width: (idx === headers.length - 1) ? "auto" : "8em", ..._.customHeaderStyle }}
					key={idx}
				/>
			)}
		</colgroup>

		{/* <thead className={`thead-${theme === "theme-dark" || !theme ? "light" : "dark"} data-table-thead`}> */}
		<thead className="data-table-thead">
			<tr className="data-table-tr">
				{advmode && <th className="pl-3 data-table-adv-header-th">{" "}</th>}
				{sublists && <th className="pl-3 data-table-sub-header-th">{" "}</th>}
				{headers.map((header, idx) => <th key={idx} className={`data-table-header-th${idx !== 0 ? " pl-3" : ""}`}>{header.name}</th>)}
			</tr>
		</thead>
	</>
);

const TableRow = ({
	obj, advmode, headers,
	rowStyle, rowClassName, category,
	collapseChildren, toggleChildrenOnRowClick
}) => {
	const [isAdvUnwrapped, setAdvUnwrapped] = useState(false);
	const [isSubUnwrapped, setSubUnwrapped] = useState((collapseChildren == false) ? true : false);
	const theme = useSelector(state => state?.theme);

	const getStyle = (obj) => {
		if (rowStyle?.condition && rowStyle?.condition(obj)) {
			return rowStyle.style;
		}
		return {};
	}

	const getClassName = (obj) => {
		if (rowClassName?.condition && rowClassName?.condition(obj)) {
			return rowClassName.className;
		}
		return "";
	}

	const getJsonTheme = (obj) => {
		if (rowStyle?.jsonTheme && rowStyle?.condition(obj)) {
			return rowStyle.jsonTheme;
		}
		else if (rowClassName?.jsonTheme && rowClassName?.condition(obj)) {
			return rowClassName.jsonTheme;
		}
		else if (theme !== "light") {
			return "chalk";
		} 
		else {
			return "rjv-default";
		}
	}

	const style = useMemo(() => getStyle(obj), [obj]);
	const className = useMemo(() => getClassName(obj), [obj]);
	const jsonTheme = useMemo(() => getJsonTheme(obj, theme), [obj, theme]);

	return (
		<>
			<tr
				// Enable data-table-tr-cursor class only when category is present and toggleChildrenOnRowClick is set to true
				className={`data-table-tr ${className} ${category && (toggleChildrenOnRowClick == true) && "data-table-tr-cursor"}`}
				style={style}
				// Enable onClick only when category is present and toggleChildrenOnRowClick is set to true
				onClick={() => category && (toggleChildrenOnRowClick == true) && setSubUnwrapped(prev => !prev)}
			>
				{advmode && <TableCell obj={obj} showJson={() => setAdvUnwrapped(prev => !prev)}/>}
				{category && (
					<td className="data-table-arrow-btn" onClick={() => (toggleChildrenOnRowClick == true) ? null : setSubUnwrapped(prev => !prev)}>
						<i className={isSubUnwrapped ? "at-arrow-down-circle" : "at-arrow-right-circle"}></i>
					</td>
				)}
				{
					(headers.map((header, idx) => (
						<TableCell
							obj={obj}
							header={header}
							idx={idx}
							key={idx}
							jsonTheme={jsonTheme}
						/>
					)))
				}
			</tr>
			{category?.sublistKey && obj[category.sublistKey] && isSubUnwrapped &&
				obj[category.sublistKey]["data"].map((child, idx) => (
					<tr className="data-table-tr-child" style={style} key={`child-${idx}`}>
						{advmode && <td></td>}
						<td></td>
						{headers.map((header, idx) => (
							<TableCell
								isSublist
								obj={child}
								header={header}
								idx={idx}
								key={idx}
								jsonTheme={jsonTheme}
							/>
						))}
					</tr>
			))}
			
			
			{advmode && isAdvUnwrapped && (
				<tr className="data-table-adv-tr" style={{ backgroundColor: "rgba(0, 0, 0, 0.025)"}}>
					<td
						colSpan={category?.sublistKey ? headers.length+2 : headers.length+1}
						className="data-table-adv-td"
					>
						<ReactJson
							theme={theme === 'dark' ? "chalk" : "rjv-default"}
							src={obj}
							name={false}
						/>
					</td>
				</tr>
			)}
			
		</>
	)
}

const ASABTable = ({
	data, headers, advmode,
	rowStyle, rowClassName, category,
	collapseChildren, toggleChildrenOnRowClick
}) => (
	<Table size="sm" hover responsive>
		<Headers sublists={!!category} headers={headers} advmode={advmode} className="data-table-header"/>
		<tbody className="data-table-tbody">
			{data && data.map((obj, idx) => (
				<TableRow {...{ obj, advmode, headers, rowStyle, rowClassName, category, collapseChildren, toggleChildrenOnRowClick }} key={idx} />
			))}
		</tbody>
	</Table>
);

const mapStateToProps = (state) => ({
	theme: state.theme
});

export default connect(mapStateToProps)(ASABTable);

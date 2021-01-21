import React from 'react';

import ReactJson from 'react-json-view';
import DateTime from '../DateTime';
import { Table } from 'reactstrap';

const TableCell = ({ value, type, isHeader }) => {
  if (!value) return <td className="pl-3" style={{ whiteSpace: "nowrap" }}>-</td>;
  let cell;
  if (type.toLowerCase() === "json") {
    cell = <ReactJson src={value} name={false} collapsed />
  }
  else if (type === "Date") {
    cell = <DateTime value={value} />
  }
  else cell = value;

  return isHeader ? (
    <th scope="row" style={{ whiteSpace: "nowrap", maxWidth: "40rem", textOverflow: "ellipsis" , overflow: "hidden" }}>
      {cell}
    </th>
    ) : (
    <td className="pl-3" style={{ whiteSpace: "nowrap" }}>
      {cell}
    </td>
    );
};

export default function ({ data, headers }) {
  const TableRows = data.map((obj, i) => (
    <tr key={i}>
      {headers.map((header, idx) => <TableCell value={obj[header.name]} type={header.type} isHeader={idx === 0} key={idx}/>)}
    </tr>
  ));

  return (
    <Table size="sm">
      <colgroup>
        {headers.map((header, idx) => <col style={{ width: header.type.toLowerCase() === 'json' ? "auto" : "1px" }} key={idx}/>)}
      </colgroup>
      <thead>
        <tr>
          {headers.map((header, idx) => <th key={idx}>{header.name[0].toUpperCase() + header.name.slice(1)}</th>)}
        </tr>
      </thead>
      <tbody>
        {TableRows}
      </tbody>
    </Table>
  );
};
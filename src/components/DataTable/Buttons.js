import React, { useState } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import {
	Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

export const CreateButton = ({ createButton }) => {

	return (
		<div className="float-end ms-3 data-table-create-button">
			<Link to={{ pathname: createButton.pathname }}>
				<Button tag="span">
					{createButton.icon &&
						<span className="pe-1">
							{typeof createButton.icon === 'string' ? <i className={createButton.icon}></i> : createButton.icon}
						</span>
					}
					{createButton.text}
				</Button>
			</Link>
		</div>
	);
}

export const DownloadButton = ({ onDownload, headers, title }) => {

	const downloadHandler = () => {
		const list = onDownload();
		let csv = headers.map(header => header.name).join(',') + "\n" +
			list.map(item => headers.map(header => {
				if (header.customComponent) {
					if (header.customComponent.onDownload)
						return header.customComponent.onDownload(item, header).replace(',', ';');
					return '-';
				}
				return JSON.stringify(item[header.key])?.replace(',', ';');
			}).join(',')).join('\n');
		let blob = new Blob([csv], {type: "text/csv;charset=utf-8"});
		let name = title?.text || "";
		saveAs(blob, `${name.replace(' ', '_')}_${format(new Date, 'dd-MM-yyyy')}.csv`);
	}

	return (
		<div className="float-end ms-3 data-table-download-button">
			<Button tag="span" onClick={downloadHandler} >
				<i className="cil-arrow-bottom"></i>
				Download
			</Button>
		</div>
	);
}

export const ActionButton = ({ actionButton, row, header }) => {
	const [isOpen, setOpen] = useState(false);

	return (
		<Dropdown
			className="action-button-dropdown float-end me-2"
			isOpen={isOpen}
			toggle={() => setOpen(prev => !prev)}
			size="sm"
		>
			<DropdownToggle
				className="action-button-dropdown-toggle text-primary"
				tag="span"
				style={{ textDecoration: "none", cursor: "pointer" }}
			>
				<i className="cil-ellipsis" style={{ fontSize: "1.25rem" }}></i>
			</DropdownToggle>
			<DropdownMenu>
				{actionButton.title && (
					<DropdownItem
						header
						className="action-button-dropdown-header"
					>
						<span style={{ fontWeight: 700 }}>{actionButton.title}</span>
					</DropdownItem>
				)}
				{actionButton.actions?.map((action, idx) => (
					<DropdownItem
						className="action-button-dropdown-item"
						key={idx}
						onClick={() => action.onClick(row, header)}
					>
						{action.icon && <i className={action.icon}></i>}
						{action.name}
					</DropdownItem>
				))}
			</DropdownMenu>
		</Dropdown>
	)
}

export const CustomButton = ({ customButton }) => {

	return (
		<div className="data-table-create-button data-table-button">
			<Button
				tag="span"
				{...customButton?.props}
			>
				{customButton.icon &&
					<span className="pe-1">
						{typeof customButton.icon === 'string' ?
							<i className={customButton.icon}></i> : customButton.icon
						}
					</span>
				}
				{customButton?.text}
			</Button>
		</div>
	)
}

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ReactMarkdown from 'react-markdown'
import { Card, CardHeader, CardBody, CardFooter, FormGroup, FormText, Input, Label, Pagination, PaginationItem, PaginationLink } from "reactstrap";


export function Wizard({
	name, wizardPages
}) {

	const [rows, setRows] = useState();
	const [page, setPage] = useState(1);
	const [totalCount, setTotalCount] = useState(0); //TODO: calculate
	const [progressStep, setProgressStep] = useState(20);
	const [pageTitle, setPageTitle] = useState("");
	const { register, handleSubmit, setValue, getValues, errors, reset } = useForm();

	useEffect(() => {
		setTotalCount(wizardPages.length);
	}, []);

	useEffect(() => {
		getRows();
		setPageTitle(wizardPages[page - 1].title ? wizardPages[page - 1].title : page - 1); // pagination counts index from 1, not 0
	}, [page]);

	const getRows = () => {
		var view = []
		if (wizardPages != undefined) {
			var pageView = wizardPages[page - 1]
			if (pageView.rows != undefined) {
				pageView.rows.forEach(row => {
					if (row.type == "markdown") {
						view.push(
							<ReactMarkdown>
								{row.contents}
							</ReactMarkdown>
						)
					} else if (row.type == "object") {
						var line = row.properties
						Object.keys(line).map((key, idx) => {
							view.push(<InputStringItem
								key={line[key].$id}
								id={line[key].$id}
								label={line[key].title}
								description={line[key].description}
								placeholder={line[key].default}
								description={line[key].description}
								register={register}
							/>)
						})
					};
				});
			};
			setRows(view)
		};
	};


	return (
		<Card className="height-100">
			<CardHeader>
				{pageTitle}
			</CardHeader>

			<CardBody className="table-responsive">
				{rows}
			</CardBody>
			<CardFooter>
				<ListPagination
					page={page}
					pageTitle={pageTitle}
					onPageChange={setPage}
					max={totalCount}
					progressStep={progressStep}
				/>
				{/* Here should be some progress indicator */}
			</CardFooter>
		</Card>
	);
}




function ListPagination(props) {

	const slots = Math.min(5, props.max);

	var start = props.page - Math.floor(slots / 2);
	var end = props.page + Math.floor(slots / 2);

	if (start < 1) {
		start = 1;
		end = Math.min(slots, props.max);
	}

	else if (end > props.max) {
		start = Math.max(props.max - slots + 1, 1);
		end = props.max;
	}

	let pages = [];
	var i;
	for (i = start; i <= end; i++) {
		pages.push(i);
	}

	return (
		<Pagination>
			<PaginationItem>
				<PaginationLink
					previous
					disabled={props.pages <= 1}
					onClick={(e) => props.onPageChange(Math.max(1, props.page - 1))}
				>
				</PaginationLink>
			</PaginationItem>

			{pages.map((i, x) =>
				<PaginationItem key={x} active={(i) == props.page}>
					<PaginationLink
						onClick={(e) => {
							props.onPageChange(i);
						}}
					>
						{i}
					</PaginationLink>
				</PaginationItem>
			)}

			<PaginationItem>
				<PaginationLink
					next
					disabled={props.page >= props.max}
					onClick={(e) => {
						props.onPageChange(props.page + 1)
					}}
				>
				</PaginationLink>
			</PaginationItem>
		</Pagination>
	);
}


// TODO: Different types of Item to cover formats such as "number", "boolean", checkbox, radiobox
export function InputStringItem(props) {
	return (
		<FormGroup>
			<Label for={props.id}>
				{props.label}
			</Label>
			<Input
				type="text"
				name={props.id}
				id={props.id}
				placeholder={props.placeholder}
				innerRef={props.register()}
			/>
			<FormText color="muted">
				{props.description}
			</FormText>
		</FormGroup>
	);
}

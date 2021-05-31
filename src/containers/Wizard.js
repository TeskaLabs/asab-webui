import React, { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown'
import { Row, Col, Card, CardHeader, CardBody, CardFooter, FormGroup, Input, Label, Pagination, PaginationItem, PaginationLink, Progress } from "reactstrap";

export function Wizard({
	name, wizardPages
}) {

	const [rows, setRows] = useState();
	const [page, setPage] = useState(1);
	const [totalCount, setTotalCount] = useState(0); //TODO: calculate
	const [progressStep, setProgressStep] = useState(20);
	const [pageTitle, setPageTitle] = useState("");

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
					} else if (row.type == "input") {
						view.push(
							<FormGroup>
								<Label for="inputField">{row.label}</Label>
								<Input type="text"
									name={row.label}
									id={row.label}
									placeholder={row.hint ? row.hint : ""}
								/>
							</FormGroup>
						);
					} else {
						// TODO: maybe it's not even needed
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

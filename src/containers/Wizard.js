import React, { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown'
import { Row, Col, Card, CardHeader, CardBody, CardFooter, FormGroup, Input, Label, Pagination, PaginationItem, PaginationLink } from "reactstrap";

export function Wizard({
	name, wizardPages
}) {

	const [rows, setRows] = useState();
	const [page, setPage] = useState(1);
	const [totalCount, setTotalCount] = useState(2); //TODO: calculate
	// const [limit, setLimit] = useState(1); // TODO: remove

	useEffect(() => {
		setTotalCount(wizardPages.length);
	}, []);

	useEffect(() => {
		getRows();
		console.warn("pageIdx in useeffect", page)
	}, [page]);

	useEffect(() => {
		console.warn("totalCount in useeffect", totalCount)
	}, [totalCount]);

	const getRows = () => {
		var view = []
		if (wizardPages != undefined) {
			console.log("wizardPages", wizardPages)
			console.log("pageIdx", page)
			console.log("wizardPages[pageIdx]", wizardPages[page])
			var pageView = wizardPages[page-1]
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
		<Row>
			<Col>
				<Card>
					<CardHeader>
						{/* {pages[pageIdx].title} */}
					</CardHeader>

					<CardBody className="table-responsive">
						{rows}
					</CardBody>
					<CardFooter>
						<ListPagination
							page={page}
							onPageChange={setPage}
							max={totalCount}
						/>
						{/* Here should be some progress indicator */}
					</CardFooter>
				</Card>
			</Col>
		</Row>
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
					first={true}
					onClick={(e) => props.onPageChange(1)}
				>
					<i className="cil-media-step-backward" />
				</PaginationLink>
			</PaginationItem>

			<PaginationItem>
				<PaginationLink
					previous
					disabled={props.pages <= 1}
					onClick={(e) => props.onPageChange(Math.max(1, props.page - 1))}
				>
					<i className="cil-media-skip-backward" />
				</PaginationLink>
			</PaginationItem>

			{pages.map((i, x) =>
				<PaginationItem key={x} active={(i) == props.page}>
					<PaginationLink
						onClick={(e) => {props.onPageChange(i);
						console.error("clicked!!!")
						console.error("clicked!!!", props.page)
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
					onClick={(e) => {props.onPageChange(props.page + 1)
						console.error("clicked!!! props.page + 1", props.page)
					}}
				>
					<i className="cil-media-skip-forward" />
				</PaginationLink>
			</PaginationItem>

			{ props.max != undefined ?
				<PaginationItem>
					<PaginationLink
						last={true}
						onClick={(e) => props.onPageChange(props.max)}
					>
						<i className="cil-media-step-forward" />
					</PaginationLink>
				</PaginationItem>
				: null}

		</Pagination>
	);
}

import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import {
	CardBody, Row, Col,
	Button, Input, Label,
	FormGroup, FormText, InputGroup,
	InputGroupText, Card, CardHeader
} from 'reactstrap';


const Import = ({
	api, app, setChosenPanel, getTypes
}) => {
	const { t } = useTranslation();
	const [chosenFilename, setChosenFilename] = useState("No file chosen");
	const [type, setType] = useState("merge");
	const [errors, setErrors] = useState(false);
	const inputFileRef = useRef(null)
	const formRef = useRef(null);

	const chooseFile = () => {
		if (!inputFileRef.current) return;

		inputFileRef.current.click();
	}

	const updateFilename = () => {
		if (!inputFileRef.current) return;

		// Get filename from input and remove path
		const filename = inputFileRef.current.value.replace(/.*[\/\\]/, '');
		setChosenFilename(filename);

		// Check if file is tar
		if (!filename.includes(".tar.gz")) {
			setErrors(true);
		} else {
			setErrors(false);
		}
	}

	const onTypeChange = (e) => setType(e.target.value);

	const onTextChange = (e) => setChosenFilename(e.target.value)

	const importConfiguration = async event => {
		event.preventDefault();
		try {
			const data = new FormData(formRef.current);
			const response = await api.put(`/import?type=${type}`, data, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})

			if (response.data.result !== "OK") throw new Error(`Response result is ${response.data.result}. File has not been imported`);
			getTypes();
			console.log(getTypes, "get types");
			setChosenPanel("configurator");
			// retrieveAll();
			app.addAlert("success", t("ASABConfig|Configuration has been successfully imported"));
		} catch (e) {
			console.error("Failed to import configuration\n", e);
			app.addAlert("warning", t("ASABConfig|Failed to import configuration"));
		}

	}

	return (
		<Card>
			<CardHeader>
				<div
					style={{ height: "28px" }}
					className="d-flex justify-content-between align-items-center"
				>
					<div className="card-header-title"></div>
					<Button
						size="sm"
						color="danger"
						className="mr-2 ml-auto"
						onClick={() => setChosenPanel("editor")}
					>
						{t("ASABLibraryModule|Back")}
					</Button>
				</div>
			</CardHeader>
			<CardBody>
				<form
					id="upload-library"
					ref={formRef}
					onSubmit={importConfiguration}
				>
					<Col>
						<h5>{t("ASABConfig|Import configuration")}</h5>
						<hr />

						<Input
							id="file"
							name="file"
							type="file"
							className="hidden-file-input"
							innerRef={inputFileRef}
							onChange={updateFilename}
						/>
						<FormGroup className="file-input">
							<InputGroup onClick={chooseFile}>
								<InputGroupText>{t("ASABConfig|Choose file")}</InputGroupText>
								<Input type="text" onChange={onTextChange} value={t(`ASABConfig|${chosenFilename}`)} />
							</InputGroup>
							<FormText color={errors ? "danger" : ""}>{t("ASABConfig|Only tar.gz files are allowed")}</FormText>
						</FormGroup>

						<Col>
							<Row>

								<FormGroup check className="mr-2">
									<Input
										className="input-radio"
										type="radio"
										value="merge"
										checked={type === "merge"}
										onChange={onTypeChange}
									/>
									<Label check>
										{t("ASABConfig|Merge")}
									</Label>
								</FormGroup>

								<FormGroup check>
									<Input
										className="input-radio"
										type="radio"
										value="override"
										checked={type === "override"}
										onChange={onTypeChange}
									/>
									<Label check>
										{t("ASABConfig|Override")}
									</Label>
								</FormGroup>

							</Row>
						</Col>
						<hr />

						<Row>
							<Col>
								<Button
									type="submit"
									color="primary"
									disabled={errors || !chosenFilename}
								>
									{t("ASABConfig|Import")}
								</Button>
							</Col>
						</Row>

					</Col>
				</form>
			</CardBody>
		</Card>
	)
}

export default Import;

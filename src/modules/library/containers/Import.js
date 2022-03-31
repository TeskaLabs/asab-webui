import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import {
	CardBody, Row, Col,
	Button, Input, Label,
	FormGroup
} from 'reactstrap';

const Import = ({
	api, app, setChosenPanel, retrieveAll
}) => {
	const { t } = useTranslation();
	const [chosenFilename, setChosenFilename] = useState("");
	const [type, setType] = useState("override");
	const [errors, setErrors] = useState("");
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
		if (!filename.includes(".tar")) {
			setErrors(true);
		} else {
			setErrors(false);
		}
	}

	const onTypeChange = (e) => setType(e.target.value);

	const importLibrary = async event => {
		event.preventDefault();
		try {
			const data = new FormData(formRef.current);
			const response = await api.put(`/library/upload?type=${type}`, data, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})

			if (response.data.result !== "OK") throw new Error(`Response result is ${response.data.result}. File has not been uploaded`);

			setChosenPanel("editor");
			retrieveAll();
			app.addAlert("success", t("ASABLibraryModule|Library has been successfully uploaded"));
		} catch (e) {
			console.error("Failed to upload library\n", e);
			app.addAlert("warning", t("ASABLibraryModule|Failed to upload library"));
		}
		
	}

	return (
		<CardBody>
			<form
				id="upload-library"
				ref={formRef}
				onSubmit={importLibrary}
			>
				<Col>

					<Row>
						<Col>
							<h5>{t("ASABLibraryModule|Import library")}</h5>
							<p>{t("ASABLibraryModule|Only tar files are allowed")}</p>
							<hr />
						</Col>
					</Row>

					<Row>
						<Col>
							<Input
								type="file"
								id="file"
								name="file"
								className="hidden-file-input"
								innerRef={inputFileRef}
								onChange={updateFilename}
							/>
						</Col>
					</Row>

					<Row className="mb-2">
						<Col sm={4} className="font-weight-bold">
							{t("ASABLibraryModule|Filename")}
						</Col>
						<Col className='p-0'>
							{chosenFilename}
						</Col>
					</Row>

					<Row>
						<Col sm={4} className="font-weight-bold">
							{t("ASABLibraryModule|Type")}
						</Col>

						<Col>
							<Row>
								<FormGroup check>
										<Input
											type="radio"
											value="override"
											checked={type === "override"}
											onChange={onTypeChange}
										/>
										<Label check>
											{t("ASABLibraryModule|Override")}
										</Label>
								</FormGroup>
								<FormGroup check className="ml-2">
										<Input
											type="radio"
											value="merge"
											checked={type === "merge"}
											onChange={onTypeChange}
										/>
										<Label check>	
											{t("ASABLibraryModule|Merge")}
										</Label>
								</FormGroup>
							</Row>
						</Col>
					</Row>

					{errors && (
						<Row>
							<Col>
								<span className="text-danger">
									{t("ASABLibraryModule|Warning. Only tar files are allowed")}
								</span>
							</Col>
						</Row>
					)}

					<hr />

					<Row>
						<Col>
							<Button
								className="mr-2"
								onClick={chooseFile}
							>
								{t("ASABLibraryModule|Choose file")}
							</Button>
							<Button
								type="submit"
								color="primary"
								disabled={errors || !chosenFilename}
							>
								{t("ASABLibraryModule|Import")}
							</Button>
						</Col>
					</Row>

				</Col>
			</form>
		</CardBody>
	)
}

export default Import;

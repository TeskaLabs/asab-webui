import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import {
	CardBody, Row, Col,
	Button, Input
} from 'reactstrap';

const Import = ({ api, app }) => {
	const { t } = useTranslation();
	const [chosenFilename, setChosenFilename] = useState("");
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

	const importLibrary = async event => {
		event.preventDefault();
		try {
			const data = new FormData(formRef.current);
			const type = data.get("upload-type");
			data.delete("upload-type");
			const response = await api.put(`/library/upload?type=${type}`, data, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})

			if (response.data.result !== "OK") throw new Error(response);

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
							<p>{t("ASABLibraryModule|Choose library you want to import (only tar files are allowed) and type of importing")}</p>
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
						<Col>
							{chosenFilename}
						</Col>
					</Row>

					<Row>
						<Col sm={4} className="font-weight-bold">
							{t("ASABLibraryModule|Type")}
						</Col>
						<Col>
							<Input
								size="sm"
								type="select"
								id="upload-type"
								name="upload-type"
								className="w-50"
							>
								<option value="merge">{t("ASABLibraryModule|Merge")}</option>
								<option value="override">{t("ASABLibraryModule|Override")}</option>
							</Input>
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

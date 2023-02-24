import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
	CardBody, CardHeader, CardFooter, Row, Col,
	Button, Input, Label,
	FormGroup, FormText, InputGroup,
	InputGroupText, Card, ButtonGroup
} from 'reactstrap';
import {types} from "./actions/actions";


const ConfigImport = (props) => {

	const ASABConfigAPI = props.app.axiosCreate('asab_config');
	const { t } = useTranslation();
	const [chosenFilename, setChosenFilename] = useState("No file chosen");
	const [type, setType] = useState("merge");
	const [errors, setErrors] = useState(false);
	const inputFileRef = useRef(null)
	const formRef = useRef(null);

	useEffect(() => {
		if (props.configImported) {
			props.getTree();
			props.app.Store.dispatch({
				type: types.CONFIG_IMPORTED,
				config_imported: false
			});
		}
	}, [props.configImported])

	// Choose file, click simulation on reference of the another <Input/>
	const chooseFile = () => {
		if (!inputFileRef.current) return;

		inputFileRef.current.click();
	}
	// File formatting
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

	// Import PUT request
	const importConfiguration = async (event) => {
		event.preventDefault();
		try {
			const data = new FormData(formRef.current);
			const response = await ASABConfigAPI.put(`/import?type=${type}`, data, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})

			if (response.data.result !== "OK") throw new Error(`Response result is ${response.data.result}. File has not been imported`);
			props.app.Store.dispatch({
				type: types.CONFIG_IMPORTED,
				config_imported: true
			});
			props.setChosenPanel("editor");
			props.app.addAlert("success", t("ASABConfig|Configuration has been successfully imported"));
		} catch (e) {
			console.error("Failed to import configuration\n", e);
			props.app.addAlert("warning", `${t("ASABConfig|Failed to import configuration")}. ${e?.response?.data?.message}`, 30);
		}
	}

	return (
		<Card>
			<form
				id="upload-configuration"
				ref={formRef}
				onSubmit={importConfiguration}
			>
				<CardHeader className="border-bottom">
					<div className="card-header-title">
						<i className="cil-cloud-upload mr-2" />
						{t("ASABConfig|Import configuration")}
					</div>
				</CardHeader>
				<CardBody>
					<Col>
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
								<Input type="text" readOnly={true} value={t(`ASABConfig|${chosenFilename}`)} />
							</InputGroup>
							<FormText color={errors ? "danger" : ""}>{t("ASABConfig|Only tar.gz files are allowed")}</FormText>
						</FormGroup>

						<Col>
							<Row>
								<FormGroup check className="mr-2">
									<Input
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
					</Col>
				</CardBody>
				<CardFooter>
					<ButtonGroup>
						<Button
							type="submit"
							color="primary"
							disabled={errors || !chosenFilename}
						>
							{t("ASABConfig|Import")}
						</Button>
						<Button
							color="primary"
							outline
							onClick={() => props.setChosenPanel("editor")}
						>
							{t("ASABLibraryModule|Back")}
						</Button>
					</ButtonGroup>
				</CardFooter>
			</form>
		</Card>
	)
}

export default ConfigImport;

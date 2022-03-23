import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import {
	CardBody, Row, Col,
	Button, Input
} from 'reactstrap';

const Export = ({ importLibrary, serviceURL, uploadedFileRef }) => {
	const { t } = useTranslation();

	return (
		<CardBody>
			<Row>
				<Col>
					<h5>Export whole library</h5>
					<a href={`${serviceURL}/library/download`} download className="text-dark">
						<Button>Export</Button>
					</a>
				</Col>
			</Row>
			<hr />
			<Row>
				<Col>
					<h5>Import library</h5>
					<form id="upload-library" ref={uploadedFileRef} onSubmit={importLibrary} >
						<Input
							type="file"
							id="file"
							name="file"
							className="mb-4"
						/>
						<Input
							type="select"
							id="upload-type"
							name="upload-type"
							className="mb-4"
						>
							<option value="merge">{t("ASABLibraryModule|Merge")}</option>
							<option value="override">{t("ASABLibraryModule|Override")}</option>
						</Input>
						<Button type="submit" color="primary">{t("ASABLibraryModule|Import")}</Button>
					</form>
				</Col>
			</Row>
		</CardBody>
	)
}

export default Export;

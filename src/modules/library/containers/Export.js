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
				<Col >
					<h5>{t("ASABLibraryModule|Import library")}</h5>
					<hr />
					<form
						id="upload-library"
						ref={uploadedFileRef}
						onSubmit={importLibrary}
					>
						<Row>
							<Col>
								<Input
									type="file"
									id="file"
									name="file"
									className="mb-4"
								/>
							</Col>
						</Row>
						<Row>
							<Col>
								<Input
									type="select"
									id="upload-type"
									name="upload-type"
									className="mb-4"
								>
									<option value="merge">{t("ASABLibraryModule|Merge")}</option>
									<option value="override">{t("ASABLibraryModule|Override")}</option>
								</Input>
							</Col>
						</Row>
						<Row>
							<Col>
								<Button type="submit" color="primary">{t("ASABLibraryModule|Import")}</Button>
							</Col>
						</Row>
					</form>
				</Col>
			</Row>
		</CardBody>
	)
}

export default Export;

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Row, Col } from 'reactstrap';
import { ControlledSwitch } from 'asab-webui';

const Disable = ({ switchFileState, tenant }) => {
	const { t } = useTranslation();
	const [isDisabled, setDisabled] = useState(false);

	const toggle = async () => {
		const result = await switchFileState(tenant);
		if (result === "OK") setDisabled(prev => !prev);
	}

	return (
		<Row>
			<Col md={3}>
				{tenant}
			</Col>
			<Col>
				<ControlledSwitch
					size="sm"
					isOn={!isDisabled}
					toggle={toggle}
					title={t(`ASABLibraryModule|${isDisabled ? "Disabled" : "Enabled"}`)}
				/>
			</Col>
		</Row>
	)
}

export default Disable;

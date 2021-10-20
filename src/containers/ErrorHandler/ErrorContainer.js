import React from 'react';
import { useTranslation } from 'react-i18next';

import { Container } from 'reactstrap';
import AceEditor from "react-ace";
import 'ace-builds/src-noconflict/theme-terminal';

const ErrorContainer = props => {
	const { t } = useTranslation();

	return (
		<Container style={{ marginTop: props.isParentError ? "100px" : "50px" }}>
			<h3>{t("Ooops. We're sorry. Something went wrong.")} <i className="cil-sad ml-1"></i> </h3>
			<AceEditor
				theme="terminal"
				name="error-container"
				width="100%"
				value={props.error.toString() + '\n' + props.errorInfo.componentStack}
				readOnly
				fontSize={15}
				showGutter={false}
				setOptions={{
					showInvisibles: false,
					showPrintMargin: false,
					useSoftTabs: false,
				}}
			/>
		</Container>
	)
}

export default ErrorContainer;
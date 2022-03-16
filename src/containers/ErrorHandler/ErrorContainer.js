import React from 'react';
import { useTranslation } from 'react-i18next';

import { Container } from 'reactstrap';

import { DateTime } from '../../components/DateTime';

const ErrorContainer = props => {
	const { t } = useTranslation();

	return (
		<Container style={{ marginTop: props.isParentError ? "100px" : "50px" }}>
			<h3>{t("Ooops. We're sorry. Something went wrong.")} <i className="cil-sad ml-1"></i> </h3>
			<DateTime value={props.datetime}/>
			<div className="error-handler-container">
				<p className="error-handler-title">{props.error.toString()}</p>
				<div>
					{props.errorInfo.componentStack.split("\n").map((item, idx) => (
						<p className="error-handler-stack" key={idx}>
							{item}
						</p>
					))}
				</div>
			</div>
		</Container>
	)
}

export default ErrorContainer;
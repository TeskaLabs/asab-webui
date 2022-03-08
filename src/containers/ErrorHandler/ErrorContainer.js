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
			<div 
				style={{
					backgroundColor: "black",
					color: "white",
					padding: "0.5rem",
					marginTop: "1rem",
					fontFamily: "monospace",
					minHeight: "500px"
				}}
			>
				<p>{props.error.toString()}</p>
				<div>
					{props.errorInfo.componentStack.split("\n").map((item, idx) => (
						<p key={idx} style={{ marginBottom: "0.1rem", marginLeft: "1rem" }} >
							{item}
						</p>
					))}
				</div>
			</div>
		</Container>
	)
}

export default ErrorContainer;
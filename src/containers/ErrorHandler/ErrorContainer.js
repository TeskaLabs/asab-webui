import React from 'react';
import { useTranslation } from 'react-i18next';

import { Container, Card, CardHeader, CardBody } from 'reactstrap';

import { DateTime } from '../../components/DateTime';

const ErrorContainer = props => {
	const { t } = useTranslation();

	return (
		<Container fluid>
			<Card>
				<CardHeader>
					<h3>{t("Ooops. We're sorry. Something went wrong.")} <i className="at-wrench ms-1"></i> </h3>
				</CardHeader>
				<CardBody>
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
				</CardBody>
			</Card>
		</Container>
	)
}

export default ErrorContainer;
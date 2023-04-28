import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
	Container, Row, Col,
	Card, CardHeader, CardTitle, CardBody
} from 'reactstrap';

/*
	Unauthorized Access screen can be displayed only when:
	- AuthModule is present within the application
	- user does not have a particular resource and user is not superuser

	Unauthorized Access screen replace the content of the container by its own screen with
	information about what resource is missing to enable the access to the desired (blocked)
	screen.
*/
export default function UnauthorizedAccessScreen(props) {

	const { t } = useTranslation();
	const resources = useSelector((state) => state.auth?.resources ? state.auth.resources : []);

	// Check if auth module is active. If not, return the original component
	if (props.app.Modules.filter(obj => obj.Name === "AuthModule").length == 0) {
		return <>{props.routeComponent}</>;
	}

	// Check for desired resource. If present or user is superuser, return the original component
	if ((resources.indexOf(props.resource) != -1) || (resources.indexOf("authz:superuser") != -1)) {
		return <>{props.routeComponent}</>;
	}

	// Else return the Not authorized screen
	return(
		<Container className="fadeIn unauthorized-container" fluid>
			<Card className="h-100 unauthorized-card">
				<CardHeader className="text-center border-bottom">
					<div className="card-header-title">
						<i className="cil-warning pr-2 text-warning" title={t("UnauthorizedAccessScreen|Unauthorized access")}/>
						<CardTitle className="text-primary mb-0">
							{t('UnauthorizedAccessScreen|Unauthorized access')}
						</CardTitle>
					</div>
				</CardHeader>
				<CardBody className="text-center unauthorized-cardbody">
					<Row className="justify-content-center">
						<Col>
							<Row className="justify-content-center">
								<p className="unauthorized-p">{t("UnauthorizedAccessScreen|You are not authorized to access this part of the application. Please ask your application administrator for following resource")}:</p>
							</Row>
							<Row className="justify-content-center">
								<p className="unauthorized-p bold">{props.resource}</p>
							</Row>
						</Col>
					</Row>
				</CardBody>
			</Card>
		</Container>
	)
}

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
	Container, Row, Col,
	Card, CardHeader, CardBody, CardFooter,
} from 'reactstrap';

/*

	Language localizations for AboutScreen can be added to the translation.json files of
	public/locales/en & public/locales/cs of the product where AboutScreen component is used.

	Example:

	{
		"AboutScreen": {
			"Release": "Release",
			"Version": "Version",
			"Vendor": "Vendor"
		}
	}

*/

function AboutScreen(props) {
	return (
		<Container>
			<Row className="justify-content-center">
				<Col md="6">
					<AboutCard app={props.app} />
				</Col>
			</Row>
		</Container>
	);
}

export default AboutScreen;


function AboutCard(props) {
	const { t, i18n } = useTranslation();
	const App = props.app;
	const title = App.Config.get("title");
	const vendor = App.Config.get("vendor");
	const email = App.Config.get("email");
	const webSiteLink = window.location.origin;
	const webSiteName = window.location.host;

	return(
		<Card className="shadow animated fadeIn">
			<CardHeader className="text-center">
				<h1>{title}</h1>
			</CardHeader>

			<CardBody>
				<Row>
					<Col>
						<h5>{t('AboutScreen|Web site')}</h5>
					</Col>
					<Col>
						<Link to={webSiteLink}>{webSiteName}</Link>
					</Col>
				</Row>
				<hr/>
				<Row>
					<Col>
						<h5>{t('AboutScreen|Vendor')}</h5>
					</Col>
					<Col>
						{vendor}
					</Col>
				</Row>
				<hr/>
				<Row>
					<Col></Col>
					<Col>
						<a href={`mailto:${email}`}>{email}</a>
					</Col>
				</Row>
			</CardBody>
		</Card>
	)
}

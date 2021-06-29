import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import Module from '../../abc/Module';
import {
	Container, Row, Col,
	Card, CardHeader, CardTitle, CardSubtitle, CardBody, CardFooter,
	Button
} from 'reactstrap';

/*

	Language localizations for AboutScreen can be added to the translation.json files of
	public/locales/en & public/locales/cs of the product where AboutScreen component is used.

	Example:

	{
		"AboutScreen": {
			"About": "About",
			"Product": "Product",
			"Version": "Version",
			"Release": "Release",
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
	let history = useHistory();
	let App = props.app;
	let title = App.Config.get("title");
	let version = App.Config.get("version");
	let vendor = App.Config.get("vendor");
	let locale = t('AboutScreen|About') === "About" ? "en" : "cs";
	let releaseDate = new Date(App.Config.get("release_date")).toLocaleDateString(locale, {year: "numeric", month: "long", day: "numeric"});
	let email = App.Config.get("email");

	return(
		<Card className="shadow animated fadeIn">
			<CardHeader className="text-center">
				<h1>{t('AboutScreen|About')}</h1>
			</CardHeader>

			<CardBody>
				<React.Fragment>
					<Row>
						<Col>
							<h5>{t('AboutScreen|Product')}</h5>
						</Col>
						<Col>
							{title}
						</Col>
					</Row>
					<hr/>
				</React.Fragment>
				<Row>
					<Col>
						<h5>{t('AboutScreen|Release')}</h5>
					</Col>
					<Col>
						{releaseDate}
					</Col>
				</Row>
				<hr/>
				{version &&
					<React.Fragment>
						<Row>
							<Col>
								<h5>{t('AboutScreen|Version')}</h5>
							</Col>
							<Col>
								{version}
							</Col>
						</Row>
						<hr/>
					</React.Fragment>
				}
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

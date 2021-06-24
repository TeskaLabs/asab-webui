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
			"Name": "Name",
			"Version": "Version",
			"Maintainer": "Maintainer",
			"Mail to the": "Mail to the"
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
	let maintainer = App.Config.get("maintainer");
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
							<h5>{t('AboutScreen|Name')}</h5>
						</Col>
						<Col>
							<p>{title}</p>
						</Col>
					</Row>
					<hr/>
				</React.Fragment>
				<Row>
					<Col>
						<h5>{t('AboutScreen|Version')}</h5>
					</Col>
					<Col>
						<p>{version}</p>
					</Col>
				</Row>
				<hr/>
				<Row>
					<Col>
						<h5>{t('AboutScreen|Maintainer')}</h5>
					</Col>
					<Col>
						<p>{maintainer}</p>
					</Col>
				</Row>
				<hr/>
				<Row className="justify-content-center">
					<Col>
						<p className="text-center"><a href={`mailto:${email}`}>{email}</a></p>
					</Col>
				</Row>
			</CardBody>
			<CardFooter>
				<Row className="justify-content-center">
					<Col>
						<Button
							size="sm"
							outline
							block
							color="link"
							type="button"
							onClick={() => history.goBack()}
						>
							<i className="cil-arrow-thick-left"></i>
							{' '}
							{t("AccessControlScreen|Previous screen")}
						</Button>
					</Col>
				</Row>
			</CardFooter>
		</Card>
	)
}

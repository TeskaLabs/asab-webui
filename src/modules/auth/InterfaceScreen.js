import React from 'react';
import { useTranslation } from 'react-i18next';
import { DateTime } from 'asab-webui';

import {
	Container, Row, Col,
	Card, CardHeader, CardTitle, CardSubtitle, CardBody, CardFooter
} from 'reactstrap';

/*

	Language localizations for InterfaceScreen can be added to the translation.json files of
	public/locales/en & public/locales/cs of the product where AccessControlScreen component is used.

	Example:

	{
		"InterfaceScreen": {
			"User interface": "User interface",
			"See details of your interface": "You can see details of your interface here",
			"Last build": "Last build",
			"Version": "Version"
		}
	}

*/

function InterfaceScreen(props) {
	const { t, i18n } = useTranslation();

	const version = __VERSION__;
	const buildDate = __BUILD_DATE__;

	return (
		<Container>
			<Row className="justify-content-center">
				<Col md="6">
					<Card className="shadow animated fadeIn">
						<CardHeader className="text-center">
							<CardTitle tag="h1">{t('InterfaceScreen|User interface')}</CardTitle>
							<CardSubtitle tag="p" className="lead">
								{t('InterfaceScreen|See details of your interface')}
							</CardSubtitle>
						</CardHeader>

						<CardBody>
							<Row>
								<Col>
									<h5>{t('InterfaceScreen|Last build')}</h5>
								</Col>
								<Col>
									<DateTime value={buildDate} format="YYYY-MM-DD"/>
								</Col>
							</Row>
							<hr/>
							<Row>
								<Col>
									<h5>{t('InterfaceScreen|Version')}</h5>
								</Col>
								<Col>
									{version}
								</Col>
							</Row>
							<hr/>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

export default InterfaceScreen;

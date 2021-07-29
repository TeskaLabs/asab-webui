import React from 'react';
import { useTranslation } from 'react-i18next';

import {
	Row, Col, Card,
	CardHeader, CardBody
} from 'reactstrap';

/*

	Language localizations for UserInterfaceCard can be added to the translation.json files of
	public/locales/en & public/locales/cs of the product where AccessControlScreen component is used.

	Example:

	{
		"AboutCard": {
			"Web site": "Web site",
			"Vendor": "Vendor"
		}
	}

*/


function AboutCard(props) {
	const { t, i18n } = useTranslation();
	const App = props.app;
	const title = App.Config.get("title");
	const vendor = App.Config.get("vendor");
	const email = App.Config.get("email");

	return(
		<Card className="shadow animated fadeIn">
			<CardHeader className="text-center">
				<h1>{title}</h1>
			</CardHeader>

			<CardBody>
				<Row>
					<Col>
						<h5>{t('AboutCard|Web site')}</h5>
					</Col>
					<Col>
						<a href="https://teskalabs.com" target="_blank" rel="noopener noreferrer">
							teskalabs.com
						</a>
					</Col>
				</Row>
				<hr/>
				<Row>
					<Col>
						<h5>{t('AboutCard|Vendor')}</h5>
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

export default AboutCard;

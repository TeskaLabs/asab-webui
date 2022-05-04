import React from 'react';
import { useTranslation } from 'react-i18next';

import {
	Row, Col, Card,
	CardHeader, CardBody
} from 'reactstrap';

/*

	Language localizations for AboutCard can be added to the translation.json files of
	public/locales/en & public/locales/cs

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
	const website = App.Config.get("website");
	const email = App.Config.get("email");

	return(
		<Card className="shadow animated fadeIn">
			<CardHeader>
				<h3 className='card-header-title'>{title}</h3>
			</CardHeader>

			<CardBody>
				<Row>
					<Col>
						<h5>{t('AboutCard|Vendor')}</h5>
					</Col>
					<Col>
						{vendor}
					</Col>
				</Row>
				{ website &&
					<React.Fragment>
						<hr/>
						<Row>
							<Col>
								<h5>{t('AboutCard|Website')}</h5>
							</Col>
							<Col>
								<a href={website} target="_blank" rel="noopener noreferrer">
									{website}
								</a>
							</Col>
						</Row>
					</React.Fragment>
				}
				{ email &&
					<React.Fragment>
						<hr/>
						<Row>
							<Col>
								<h3 className='card-header-title'>Email</h3>
							</Col>
							<Col>
								<a href={`mailto:${email}`}>{email}</a>
							</Col>
						</Row>
				</React.Fragment>
				}
			</CardBody>
		</Card>
	)
}

export default AboutCard;

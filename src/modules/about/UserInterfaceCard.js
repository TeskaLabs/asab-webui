import React from 'react';
import { useTranslation } from 'react-i18next';
import { DateTime } from 'asab-webui';

import {
	Container, Row, Col,
	Card, CardHeader, CardBody
} from 'reactstrap';

/*

	Language localizations for UserInterfaceCard can be added to the translation.json files of
	public/locales/en & public/locales/cs

	Example:

	{
		"UserInterfaceCard": {
			"User interface": "User interface",
			"Last build": "Last build",
			"Version": "Version"
		}
	}

*/

function UserInterfaceCard() {
	const { t, i18n } = useTranslation();

	const version = __VERSION__;
	const buildDate = __BUILD_DATE__;

	return (
		<Card className="shadow animated fadeIn mt-2">
			<CardHeader className='border-bottom'>
				<h3 className='card-header-title'>{t('UserInterfaceCard|User interface')}</h3>
			</CardHeader>
			<CardBody>
				{ version &&
					<React.Fragment>
						<Row>
							<Col>
								<h6>{t('UserInterfaceCard|Version')}</h6>
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
						<h6>{t('UserInterfaceCard|Build date')}</h6>
					</Col>
					<Col>
						<DateTime value={buildDate} format="YYYY-MM-DD"/>
					</Col>
				</Row>
			</CardBody>
		</Card>
	);
}

export default UserInterfaceCard;

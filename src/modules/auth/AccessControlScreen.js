import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import {
	Container, Row, Col,
	Card, CardHeader, CardTitle, CardSubtitle, CardBody, CardFooter,
	Button
} from 'reactstrap';

/*

	Language localizations for AccessControlScreen can be added to the translation.json files of
	public/locales/en & public/locales/cs of the product where AccessControlScreen component is used.

	Example:

	{
		"AccessControlScreen": {
			"Access control": "Access control",
			"See your details": "You can see your access permissions here",
			"Tenant": "Tenant",
			"Resources": "Resources"
		}
	}

*/

function AccessControlScreen(props) {

	return (
		<Container>
			<Row className="justify-content-center">
				<Col md="6">
					<ConnectedAccessControlCard app={props.app} />
				</Col>
			</Row>
		</Container>
	);
}

export default AccessControlScreen;


function AccessControlCard(props) {
	const { t, i18n } = useTranslation();
	const userinfo = props.userinfo;
	const App = props.app;
	let currentTenant;
	// Check Tenant service availability
	if (App.Services.TenantService) {
		currentTenant = App.Services.TenantService.get_current_tenant();
	}

	return(
		<Card className="shadow animated fadeIn">
			<CardHeader className="text-center border-bottom card-header-login">
				<div className="card-header-title">
					<CardTitle tag="h1">{t('AccessControlScreen|Access control')}</CardTitle>
					<CardSubtitle tag="p">
						{t('AccessControlScreen|See your details')}
					</CardSubtitle>
				</div>
			</CardHeader>

			<CardBody>
				{ userinfo ? (
					<>
						{App.Services.TenantService &&
							<React.Fragment>
								<Row>
									<Col>
										<h6>{t('AccessControlScreen|Tenant')}</h6>
									</Col>
									<Col>
										<p style={{marginBottom: "5px"}}>{currentTenant}</p>
									</Col>
								</Row>
								<hr/>
							</React.Fragment>
						}
						<Row>
							<Col>
								<h6>{t('AccessControlScreen|Resources')}</h6>
							</Col>
							<ItemToRender userinfo={userinfo} item='resources' />
						</Row>
					</>
					) : (
					<div className="text-center">
						<h6>{t("AccessControlScreen|The user information is invalid, you session is likely expired.")}</h6>
					</div>
				)}
			</CardBody>
		</Card>
		)
}


function ItemToRender(props) {
	let item = props.item;
	return(
		<Col>
			{props.userinfo[item] ?
				props.userinfo[item].map(itm => {
					return(<p style={{marginBottom: "5px"}} key={itm}>{itm}</p>)
				})
				:
				null
			}
		</Col>
		)
}


function mapStateToProps(state) {
	return {
		userinfo: state.auth.userinfo
	}
}

let ConnectedAccessControlCard = connect(mapStateToProps)(AccessControlCard);

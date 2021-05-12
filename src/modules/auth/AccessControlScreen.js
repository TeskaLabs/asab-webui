import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

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
			"Current tenant": "Current tenant",
			"Roles": "Roles",
			"Resources": "Resources",
			"Previous screen": "Back to previous screen"
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
	let history = useHistory();
	let userinfo = props.userinfo;
	let App = props.app;
	let currentTenant;
	// Check Tenant service availability
	if (App.Services.TenantService) {
		currentTenant = App.Services.TenantService.get_current_tenant();
	}

	return(
		<Card className="shadow animated fadeIn">
			<CardHeader className="text-center">
				<CardTitle tag="h1">{t('AccessControlScreen|Access control')}</CardTitle>
				<CardSubtitle tag="p" className="lead">
					{t('AccessControlScreen|See your details')}
				</CardSubtitle>
			</CardHeader>

			<CardBody>
				{App.Services.TenantService &&
					<React.Fragment>
						<Row>
							<Col>
								<h5>{t('AccessControlScreen|Current tenant')}</h5>
							</Col>
							<Col>
								<ul style={{padding: 0}}>
									<li>{currentTenant}</li>
								</ul>
							</Col>
						</Row>
						<hr/>
					</React.Fragment>
				}
				<Row>
					<Col>
						<h5>{t('AccessControlScreen|Roles')}</h5>
					</Col>
					<ItemToRender userinfo={userinfo} item='roles' />
				</Row>
				<hr/>
				<Row>
					<Col>
						<h5>{t('AccessControlScreen|Resources')}</h5>
					</Col>
					<ItemToRender userinfo={userinfo} item='resources' />
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


function ItemToRender(props) {
	let item = props.item;
	return(
		<Col>
			<ul style={{padding: 0}}>
			{props.userinfo[item] ?
				props.userinfo[item].map(itm => {
					return(<li key={itm}>{itm}</li>)
				})
				:
				null
			}
			</ul>
		</Col>
		)
}


function mapStateToProps(state) {
	return {
		userinfo: state.auth.userinfo
	}
}

let ConnectedAccessControlCard = connect(mapStateToProps)(AccessControlCard);

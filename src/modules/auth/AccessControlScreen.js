import React from 'react';
import { useTranslation } from 'react-i18next';
import {connect, useSelector} from 'react-redux';

import {
	Container, Row, Col,
	Card, CardHeader, CardTitle, CardSubtitle, CardBody
} from 'reactstrap';

import ReactJson from "react-json-view";

import "./styles.scss";

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
		<Container className='access-control-container'>
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
	const resources = props.resources;
	const App = props.app;
	let currentTenant;
	// Check Tenant service availability
	if (App.Services.TenantService) {
		currentTenant = App.Services.TenantService.getCurrentTenant();
	}
	const advmode = useSelector(state => state.advmode?.enabled);
	const theme = useSelector(state => state.theme);

	return (
		<>
			<Card className="shadow animated fadeIn">
				<CardHeader className="text-center border-bottom card-header-login">
					<div className="card-header-title">
						<CardTitle className="text-primary mb-0">
							{t('AccessControlScreen|Access control')}
						</CardTitle>
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
											{t('AccessControlScreen|Tenant')}
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
									{t('AccessControlScreen|Resources')}
								</Col>
								<ItemToRender userinfo={userinfo} resources={resources} item='resources' currentTenant={currentTenant} />
							</Row>
						</>
					) : (
						<div className="text-center">
							{t("AccessControlScreen|The user information is invalid, you session is likely expired.")}
						</div>
					)}
				</CardBody>
			</Card>
			{ advmode &&
				<Card className="shadow animated fadeIn mt-4">
					<CardHeader className="border-bottom">
						<div className="card-header-title">
							<i className="cil-code pr-2"></i>
							JSON
						</div>
					</CardHeader>
					<CardBody>
						{ userinfo ?
							<ReactJson
								theme={theme === 'dark' ? "chalk" : "rjv-default"}
								src={userinfo}
								name={false}
								collapsed={false}
							/>
						:
							<div className="text-center">
								{t("AccessControlScreen|The user information is invalid, you session is likely expired.")}
							</div>
						}
					</CardBody>
				</Card>
			}
		</>
	)
}


function ItemToRender(props) {
	let item = props.item;
	return(
		<Col>
			{props.userinfo[item] ?
				item == "resources" ?
					props.resources.map(itm => {
						return(<p style={{marginBottom: "5px"}} key={itm}>{itm}</p>)
					})
				:
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
		userinfo: state.auth.userinfo,
		resources: state.auth.resources
	}
}

let ConnectedAccessControlCard = connect(mapStateToProps)(AccessControlCard);

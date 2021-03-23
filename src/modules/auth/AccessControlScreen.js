import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import {
	Container, Row, Col,
	Card, CardHeader, CardTitle, CardSubtitle, CardBody, CardFooter,
	Button
} from 'reactstrap';


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
	let currentTenant = props.current;

	return(
		<Card className="shadow animated fadeIn">
			<CardHeader className="text-center">
				<CardTitle tag="h1">{t('AccessControlScreen|Access control')}</CardTitle>
				<CardSubtitle tag="p" className="lead">
					{t('AccessControlScreen|See your details')}
				</CardSubtitle>
			</CardHeader>

			<CardBody>
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
		userinfo: state.auth.userinfo,
		current: state.tenant.current
	}
}

let ConnectedAccessControlCard = connect(mapStateToProps)(AccessControlCard);

import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';

import { Modal, NavLink, Card, CardHeader, CardBody, Button } from 'reactstrap';


export default function HelpButton() {
	const { t } = useTranslation();

	const [modal, setModal] = useState(false);

	const content = useSelector(state => state?.header.content);
	if (content == undefined) return null;

	const toggle = () => setModal(!modal);

	return (
		<>
			<NavLink
				className="help-button"
				onClick={toggle}
				title={t("Show help info")}
				href="#"
			>
				<i>?</i>
			</NavLink>

			<Modal isOpen={modal} toggle={toggle} className="center help-modal-card">
				<Card>
					<CardHeader className="border-bottom">
						<div className="card-header-title">
							<i className="cil-info pr-2" />
							{t("HelpButton|Help")}
						</div>
						<Button outline color="primary" onClick={toggle}>
							<i className="cil-x"/>
						</Button>
					</CardHeader>
					<CardBody>
						<iframe className="help-iframe" src={`https://docs.teskalabs.com/logman.io/${content}`} title=""/>
					</CardBody>
				</Card>
			</Modal>
		</>
	);
}


import React, {useState, useEffect} from 'react';
import {useTranslation} from "react-i18next";
import {useSelector} from 'react-redux';

import {Modal, NavLink, Card, CardHeader, CardBody, Button} from 'reactstrap';


export default function HelpButton() {
	const {t} = useTranslation();

	const [modal, setModal] = useState(false);

	const path = useSelector(state => state?.header.helpPath);
	if (path == undefined) return null;

	const toggle = () => setModal(!modal);

	return (
		<>
			<NavLink
				className="help-button"
				onClick={toggle}
				title={t("HelpButton|Show help info")}
				href="#"
			>
				<i className='at-question-message'/>
			</NavLink>

			<Modal isOpen={modal} toggle={toggle} className="center help-modal-card">
				<Card>
					<CardHeader className="border-bottom">
						<div className="card-header-title">
							<i className="at-info-circle pr-2" />
							{t("HelpButton|Help")}
						</div>
						<Button outline color="primary" onClick={toggle}>
							<i className="at-xmark-circl"/>
						</Button>
					</CardHeader>
					<CardBody>
						<iframe className="help-iframe" src={path} />
					</CardBody>
				</Card>
			</Modal>
		</>
	);
}


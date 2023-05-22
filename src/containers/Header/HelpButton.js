import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';

import { Modal, NavLink, Card, CardHeader, CardBody, Button } from 'reactstrap';


export default function HelpButton() {
    const { t } = useTranslation();

    const [modal, setModal] = useState(false);

    const path = useSelector(state => state?.helpButton.path);

    if ((path == undefined) || (path == "")) return null;

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
                        {/*<div>{content}</div>*/}
                        {/*TODO: uncomment and use when the documentation is ready to be displayed in the iframe*/}
                        <iframe className="help-iframe" src={`https://ru.legacy.reactjs.org/${path}`} title=""/>
                    </CardBody>
                </Card>
            </Modal>
        </>
    );
}


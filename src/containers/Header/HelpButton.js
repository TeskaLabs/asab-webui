import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { useSelector } from 'react-redux';

import './header.scss';

import { Modal, NavLink, Card, CardHeader, CardBody, Button } from 'reactstrap';


export default function HelpButton() {
    const { t } = useTranslation();

    const [modal, setModal] = useState(false);

    const description = useSelector(state => state?.helpButton.description);
    if ((description == undefined) || (description == "")) return null;

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
                            Help Card
                        </div>
                        <Button outline color="primary" onClick={toggle}>
                            <i className="cil-x"/>
                        </Button>
                    </CardHeader>
                    <CardBody>
                        <ReactMarkdown
                            rehypePlugins={[rehypeRaw]}
                            width="100%"
                            height="100%"
                        >
                            {description}
                        </ReactMarkdown>
                        {/*TODO: don't remove, comment on when the documentation is ready to be displayed in the iframe*/}
                        {/*<iframe className="help-iframe" src="" title=""/>*/}
                    </CardBody>
                </Card>
            </Modal>
        </>
    );
}
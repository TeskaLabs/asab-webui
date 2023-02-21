import React, {useState} from 'react';
import { connect } from 'react-redux';
import {useTranslation} from "react-i18next";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import './header.scss';

import {Modal, NavLink, Card, CardHeader, CardBody, Button} from 'reactstrap';


const HelpButton = () => {
    // if (!url) return null;
    const { t, i18n } = useTranslation();
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <>
            <NavLink
                className="help-button"
                onClick={toggle}
                title={t("Show help info")}
                href="#"
            >
                <i className="cil-info"></i>
            </NavLink>

            <Modal isOpen={modal} toggle={toggle} className="center help-modal-card">
                <Card>
                    <CardHeader className="border-bottom">
                        <div className="card-header-title">
                            <i className="cil-info pr-2" />
                            Help Card
                        </div>
                        <Button color="danger" onClick={toggle}>
                            <i className="cil-info"></i>
                        </Button>
                    </CardHeader>
                    <CardBody>
                        <ReactMarkdown
                            rehypePlugins={[rehypeRaw]}
                            width="100%"
                            height="100%"
                        >
                            {
                                "empty\nbooo\nmbmbmbmbhiii\n\n## Hello title\n"}
                            {/*{description}*/}
                        </ReactMarkdown>
                    </CardBody>
                </Card>
            </Modal>
        </>
    );
}

const mapStateToProps = state => ({ ...state.helpButton });

export default connect(mapStateToProps)(HelpButton);
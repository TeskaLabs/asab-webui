import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { 
	Container, Card, CardBody, 
	CardHeader, Col, Row
 } from 'reactstrap';
import { DateTime } from 'asab-webui';
import ReactJSON from 'react-json-view';

import AttentionCard from './AttentionCard';

const MicroserviceDetailContainer = (props) => {
	const theme = useSelector(state => state.theme);
	const [svc, setSvc] = useState(null);
	const [error, setError] = useState(null);
	const { t } = useTranslation();
	const { svc_name } = useParams();

	const ASABConfigAPI = props.app.axiosCreate('asab_config');

	useEffect(() => {
		getMicroservice();
	}, []);

	const getMicroservice = async () => {
		try {
			const response = await ASABConfigAPI.get(`microservices/${svc_name}`);

			if (response.data.result !== "OK") throw new Error(response);

			setSvc(response.data.data);
		} catch (e) {
			if (e.response.status == 400) {
				console.error(e.response.message);
				props.app.addAlert("warning", t("MicroserviceDetailContainer|This microservice doesn't exist"));
				setError("This microservice doesn't exist");
			}
			else {
				console.error("Failed to get service\n", e);
				props.app.addAlert("warning", t("MicroserviceDetailContainer|Failed to get the microservice"));
				setError("Something went wrong and this microservice wasn't found")
			}
		}
	}

	return (
		<Container>
			<Row className="justify-content-md-center">
				<Col md={8}>
					<Card>
						<CardHeader>
							<div className="card-header-title">
								{svc?.appclass || t("MicroserviceDetailContainer|Service")}
							</div>
						</CardHeader>
						<CardBody>
							{error ? (
									<div className="text-center">
										<h5>{t(`MicroserviceDetailContainer|${error}`)}</h5>
									</div>
								) : (
								<>
									<Row>
										<Col md={3}>{t("MicroserviceDetailContainer|ID")}</Col>
										<Col>{svc_name}</Col>
									</Row>
									<Row className="mt-3">
										<Col md={3}>{t("MicroserviceDetailContainer|Host")}</Col>
										<Col>{svc?.hostname}</Col>
									</Row>
									<Row className="mt-3">
										<Col md={3}>{t("MicroserviceDetailContainer|Launch time")}</Col>
										<Col>
											<DateTime value={svc?.launchtime} />
										</Col>
									</Row>
									<Row className="mt-3">
										<Col md={3}>{t("MicroserviceDetailContainer|Created at")}</Col>
										<Col>
											<DateTime value={svc?.created_at} />
										</Col>
									</Row>
									<Row className="mt-3">
										<Col md={3}>{t("MicroserviceDetailContainer|Version")}</Col>
										<Col>{svc?.version}</Col>
									</Row>
								</>
							)}
						</CardBody>
					</Card>
				</Col>
			</Row>

			{svc && (
				<Row className="justify-content-md-center mt-2">
					<Col md={8}>
						<Card>
							<CardHeader>
								<div className="card-header-title">
									{t("MicroserviceDetailContainer|Detail")}
								</div>
							</CardHeader>
							<CardBody>
								<Row className="m-auto" >
									<Col>
										<ReactJSON
											src={svc}
											name={false}
											enableClipboard={false}
											theme={theme === 'dark' ? "chalk" : "rjv-default"}
										/>
									</Col>
								</Row>
							</CardBody>
						</Card>
					</Col>
				</Row>
			)}
			{svc && svc["attention_required"] && Object.keys(svc["attention_required"]).length > 0 && (
				<AttentionCard attention={svc["attention_required"]} />
			)}
		</Container>
	)
}

export default MicroserviceDetailContainer;
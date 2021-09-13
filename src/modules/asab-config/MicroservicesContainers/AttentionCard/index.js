import React from 'react';
import { useTranslation } from 'react-i18next';

import { 
	Card, CardBody, 
	CardHeader, Col, Row
 } from 'reactstrap';

import JSONTable from './JSONTable';

const AttentionCard = ({ attention }) => {
	const { t } = useTranslation();

	const formattedAttention = [];

	Object.keys(attention).forEach(key => {
		formattedAttention.push({ "id": key, ...attention[key] })
	})

	return (
		<Row className="justify-content-md-center">
			<Col md={8}>
				<Card>
					<CardHeader>{t("MicroserviceDetailContainer|Attention")}</CardHeader>
					<CardBody>
						<Row className="m-auto" >
							<Col>
								<JSONTable data={formattedAttention} />
							</Col>
						</Row>
					</CardBody>
				</Card>
			</Col>
		</Row>
	)
}

export default AttentionCard;
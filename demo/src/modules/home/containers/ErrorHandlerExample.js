import React, { useState, useEffect } from 'react';

import { Container, Card, CardHeader, CardBody } from 'reactstrap';

const ErrorHandlerExample = () => {
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (count == 5) {
			let undf;
			setCount(undf.count);
		}
	}, [count])

	return (
		<Container>
			<Card>
				<CardHeader className="border-bottom">
				<div className="card-header-title">
					<i className="cil-error" />
					Click on number to increment. When it'll reach 5 this container will throw error and ErrorHandler will be rendered
				</div>
				</CardHeader>
				<CardBody><span onClick={() => setCount(prev => prev+1)}>{count}</span></CardBody>
			</Card>
		</Container>
	)
};

export default ErrorHandlerExample;

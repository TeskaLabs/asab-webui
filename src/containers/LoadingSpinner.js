import React from 'react';

import { Container, Row, Spinner } from 'reactstrap';

export const LoadingSpinner = ({ color, size, type, style }) => (
    <Container>
        <Row className="justify-content-center align-items-center">
            <Spinner
                color={color || "primary"}
                size={size || "md"}
                type={type}
                style={style}
            />
        </Row>
    </Container>
);
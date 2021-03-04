import React, { useState, useEffect } from 'react';

import {
    Container, Card, CardHeader,
    CardBody, CardFooter,
    ListGroup, ListGroupItem
} from 'reactstrap';

export default (props) => {
    const [list, setList] = useState([]);

    useEffect(() => {
        const ASABConfigAPI = props.app.axiosCreate('asab_config');
        ASABConfigAPI.get('/svcs').then(res => setList(console.log(res.data)));
    }, []);

    return (
        <Container>
            <Card>
                <CardHeader>Microservices List</CardHeader>
                <CardBody>
                    <ListGroup>
                        {list.map((item, idx) => <ListGroupItem key={idx}><b>{item}</b></ListGroupItem>)}
                    </ListGroup>
                </CardBody>
            </Card>
        </Container>
    )
}

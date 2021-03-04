import React, { useState, useEffect } from 'react';

import {
    Container, Card, CardHeader,
    CardBody, CardFooter,
    ListGroup, ListGroupItem
} from 'reactstrap';

import { DataTable } from 'asab-webui';

export default (props) => {
    const [list, setList] = useState(null);
    const [page, setPage] = useState(1);
    const headers = [{name: 'Name', key: 'name'}, {name: 'IP', key: 'ip'}];
    const limit = 10;

    useEffect(() => {
        const parseDataIntoArr = (data) => {
            return Object.keys(data).map(name => {
                const item = data[name];
                return {
                    ...item,
                    name: name,
                    ip: item.web[0][0]
                };
            });
        };

        const ASABConfigAPI = props.app.axiosCreate('asab_config');

        ASABConfigAPI.get('/svcs').
            then(res => parseDataIntoArr(res.data)).
            then(lst => setList(lst));
    }, []);

    return (
        <Container>
            {list && 
                <DataTable 
                    headers={headers}
                    data={list.slice((page-1)*limit, limit*page)}
                    page={page}
                    setPage={setPage}
                    count={list.length}
                    limit={limit}
                    title={{
                        text: "Microservices List"
                    }}
                />
            }
        </Container>
    )
}

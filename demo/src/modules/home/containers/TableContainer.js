import React, { useState, useEffect } from 'react';
import { DataTable } from 'asab-webui';
import { Container } from 'reactstrap';

export default function (props) {
  const headers = [ { name: 'name', type: 'string' }, { name: 'provider', type: 'string' }, { name: 'type', type: 'string' }, { name: ' ', type: 'Json' }, ];
  const initialData = [
    {
      id: 1,
      ['name']: 'Dzmitry',
      provider: 'ext',
      type: 'mongodb',
      ' ': {
        "_id": "mongodb:ext:5ffdc6ffa5a3c6fe397c4dfd",
        "_type": "mongodb",
        "_provider_id": "ext",
        "_v": 1,
        "_c": "2021-01-12T15:57:51.471000",
        "_m": "2021-01-12T15:57:51.471000",
        "phone": "3240715",
        "username": "Dzmitry"
      }
    },
    {
      id: 2,
      ['name']: 'Harry Potter',
      provider: 'ext',
      type: 'mongodb',
      ' ': {
        "_id": "mongodb:ext:5ffdc6ffa5a3c6fe397c4dfd",
        "_type": "mongodb",
        "_provider_id": "ext",
        "_v": 2,
        "_c": "2021-01-12T15:57:51.471000",
        "_m": "2021-01-12T15:57:51.471000",
        "phone": "3240715",
        "username": "Harry Potter"
      }
    },
    {
      id: 3,
      ['name']: 'Shrek',
      provider: 'ext',
      type: 'mongodb',
      ' ': {
        "_id": "mongodb:ext:5ffdc6ffa5a3c6fe397c4dfd",
        "_type": "mongodb",
        "_provider_id": "ext",
        "_v": 3,
        "_c": "2021-01-12T15:57:51.471000",
        "_m": "2021-01-12T15:57:51.471000",
        "phone": "3240715",
        "username": "Shrek"
      }
    },
    {
      id: 4,
      ['name']: 'Peter Parker',
      provider: 'ext',
      type: 'mongodb',
      ' ': {
        "_id": "mongodb:ext:5ffdc6ffa5a3c6fe397c4dfd",
        "_type": "mongodb",
        "_provider_id": "ext",
        "_v": 4,
        "_c": "2021-01-12T15:57:51.471000",
        "_m": "2021-01-12T15:57:51.471000",
        "phone": "3240715",
        "username": "Peter Parker"
      }
    },
    {
      id: 5,
      ['name']: 'Naruto',
      provider: 'ext',
      type: 'mongodb',
      ' ': {
        "_id": "mongodb:ext:5ffdc6ffa5a3c6fe397c4dfd",
        "_type": "mongodb",
        "_provider_id": "ext",
        "_v": 5,
        "_c": "2021-01-12T15:57:51.471000",
        "_m": "2021-01-12T15:57:51.471000",
        "phone": "3240715",
        "username": "Naruto"
      }
    },
    {
      id: 6,
      name: 'French Fries',
      provider: 'ext',
      'type': 'mongodb',
      ' ': {
        "_id": "mongodb:ext:5ffdcf2fa5a3c6fe397c5719",
        "_type": "mongodb",
        "_provider_id": "ext",
        "_v": 6,
        "_c": "2021-01-12T16:32:47.327000",
        "_m": "2021-01-12T16:32:47.327000",
        "email": "ffries@french.com",
        "username": "French Fries"
      }
    },
    {
      id: 7,
      name: 'Leo Turtle',
      'provider': 'ext',
      type: 'mongodb',
      ' ': {
        "_id": "mongodb:ext:5ffdc73aa5a3c6fe397c4e4a",
        "_type": "mongodb",
        "_provider_id": "ext",
        "_v": 7,
        "_c": "2021-01-12T15:58:50.828000",
        "_m": "2021-01-14T10:29:13.190000",
        "email": "leo@turtle.com",
        "username": "Leo Turtle",
        "suspended": true
      }
    },
    {
			id: 8,
      name: 'Giorno Giovanna',
      'provider': 'ext',
      type: 'mongodb',
      ' ': {
        "_id": "mongodb:ext:5ffdc73aa5a3c6fe397c4e4a",
        "_type": "mongodb",
        "_provider_id": "ext",
        "_v": 8,
        "_c": "2021-01-12T15:58:50.828000",
        "_m": "2021-01-14T10:29:13.190000",
        "email": "jojo@dio.com",
        "username": "Giorno Giovanna",
        "suspended": true
      }
		},
		{
			id: 9,
      name: 'Solid Snake',
      'provider': 'ext',
      type: 'mongodb',
      ' ': {
        "_id": "mongodb:ext:5ffdc73aa5a3c6fe397c4e4a",
        "_type": "mongodb",
        "_provider_id": "ext",
        "_v": 9,
        "_c": "2021-01-12T15:58:50.828000",
        "_m": "2021-01-14T10:29:13.190000",
        "email": "metal@gear.com",
        "username": "Solid Snake",
        "suspended": true
      }
		},
		{
			id: 10,
      name: 'Mandolorian',
      'provider': 'ext',
      type: 'mongodb',
      ' ': {
        "_id": "mongodb:ext:5ffdc73aa5a3c6fe397c4e4a",
        "_type": "mongodb",
        "_provider_id": "ext",
        "_v": 10,
        "_c": "2021-01-12T15:58:50.828000",
        "_m": "2021-01-14T10:29:13.190000",
        "email": "star.wars@lucas.com",
        "username": "Mandolorian",
        "suspended": true
      }
		},
		{
			id: 11,
      name: 'Jesse Pinkman',
      'provider': 'ext',
      type: 'mongodb',
      ' ': {
        "_id": "mongodb:ext:5ffdc73aa5a3c6fe397c4e4a",
        "_type": "mongodb",
        "_provider_id": "ext",
        "_v": 9,
        "_c": "2021-01-12T15:58:50.828000",
        "_m": "2021-01-14T10:29:13.190000",
        "email": "breaking.good@gmail.com",
        "username": "Jesse Pinkman",
        "suspended": true
      }
		}
  ];

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  useEffect(() => setData(initialData.slice((page-1)*limit, limit*page)), [limit, page]);

  const onSearch = (str) => {
    if (str) alert(`Filter value: ${str || 'None'}`)
  };

  return (
    <Container>
      <DataTable
        title={{text: "Table Demo", icon: 'cil-user'}}
        data={data}
        headers={headers}
        count={initialData.length}
        limit={limit}
        setLimit={setLimit}
        currentPage={page}
        setPage={setPage}
        search={{ placeholder: "Search", icon: 'cil-magnifying-glass' }}
        createButton={{ text: "Create", icon: 'cil-plus', pathname: '#' }}
        onSearch={onSearch}
      />
    </Container>
  )
};
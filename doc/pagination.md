# ASAB WebUI Pagination component

`Pagination` is a react reusable component for displaying pagination

## Example code

```javascript
import React, { useEffect, useState } from 'react';
import  { Pagination } from 'asab-webui';

function MyBeautifulComponent () {
	const [page, setPage] = useState(1);
	const [beautiesDisplayed, setBeautiesDisplayed] = useState(null);
	
	const myBeauties = new Array(100).fill("beauty");
	const lastPage = Math.ceil(myBeauties.length / 10);

	useEffect(() => {
		let arr = myBeauties.slice((page - 1) * 10, page * 10);
		setBeautiesDisplayed(arr);
	}, [page]);

	return(
		<React.Fragment>
			{beautiesDisplayed &&
				<React.Fragment>
					{beautiesDisplayed.map((b, i) => <p key={i}>{b}</p>)}
{					<Pagination
						currentPage={page}
						lastPage={lastPage}
						setPage={setPage}
					/>
				</React.Fragment>
			}
		</React.Fragment>
	)
}

export default MyBeautifulComponent;

```

## Available props

| Prop | Required | Type | Description |
| ---- | -------- | ---- | ----------- |
| currentPage | Yes | Number | Current page |
| lastPage | Yes | Number | Number of pages / Number of the last page |
| setPage | Yes | Function | Changes currentPage when clicking to a different page on pagination |

## Using Pagination in DataTable component

If you are using `DataTable` component of `asab-webui`, `Pagination` is already included in it

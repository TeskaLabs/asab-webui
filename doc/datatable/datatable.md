# ASAB WebUI DataTable component

`DataTable` is react reusable component.
It is used to display common data like numbers and strings. 

Also `DataTable` supports `advmode`. When `advmode` is enabled, `DataTable` displays extra column which is json for data passed in as `data` prop. More info about `advmode` can be found in `doc/advmode.md`.

Demo app's path: `asab-webui/demo/src/modules/home/containers/TableContainer.js`.

# Implementation

DataTable can be mounted in its own container as it is implemented in demo app or as a widget in another app's container. In first case you must create container for `DataTable` and connect it to any module of your application by adding it's route and navigation item. 

Example from demo:

```js
import HomeContainer from './containers/HomeContainer'
import Module from 'asab-webui/abc/Module';
import TableContainer from './containers/TableContainer';


export default class HomeModule extends Module {
	constructor(app, name){
		super(app, "HomeModule");
		app.Router.addRoute({ path: '/', exact: true, name: 'Home', component: HomeContainer });
		app.Router.addRoute({ path: '/Table', exact: true, name: 'Table', component: TableContainer });
		app.Navigation.addItem({
			name: 'Home',
			url: '/',
			icon: 'cil-home',
		})
		app.Navigation.addItem({
			name: 'Table',
			url: '/Table',
			icon: 'at-graph-chart',
		})
	}
}

```

DataTable needs obligatory props `headers`, `data`, `count`, `currentPage`, `setPage` and `title` to render.

Example of `DataTable` with obligatory props:

```js
<DataTable
	title={{text: "Table Demo", icon: 'cil-user'}}
	data={data}
	headers={headers}
	count={count}
	currentPage={page}
	setPage={setPage}
/>
```

Some props can be obtained from configuration of the project  (e.g. in demo app `headers` and `limit` props are obtained from the configuration).

Example of configuration for `DataTable`:

```js
let ConfigDefaults = {
	...
	table: {
		title: { text: "Table Demo", icon: "cil-user" },
		headers: [
			{ name: 'Name', key: 'username' },
			{ name: 'Provider', key: '_provider_id' },
			{ name: 'Type', key: '_type' } 
		],
		limit: 10
	},
	...
};
```

Example of obtaining configuration in Container:

```js
	...
	const headers = props.app.Config.get('table').headers;
	const configLimit = props.app.Config.get('table').limit;
	const title = props.app.Config.get('table').title;
	...
```

Prop `title` is an object that has obligatory property `text` which is string and it will be rendered as table title. Also `title` has optional property `icon` for rendering icon alongside the table title and which can be either React Component (e.g. from package `@material-ui/icons`) or it can also be a string which is classname for icon element and will be rendered as `<i className={icon}></i>`

Example:

```js
headers: [ 
		{ 
			name: 'Name',
			key: 'username',
			customHeaderStyle: { minWidth: '100px' },
			customCellStyle: { textOverflow: "ellipsis", 
							overflow: "hidden", 
							whiteSpace: "nowrap", 
							maxWidth: "15ch"
						}
		},
```

Prop `headers` is basically an array containing objects with obligatory properties `name` and `key` and optional properties `link`, `datetime`, `json`, `actionButton`, `customRowStyle`, `customRowClassName`, `customCellStyle`, `customHeaderStyle` and `customComponent`. Order of headers in a table is the same as it is in prop `headers`.

`header`'s property `customCellStyle` allows to add custom styling to all data cells in column assigned below partucilar header(but not the header itself and column's width - for that see `customHeaderStyle`).

`header`'s property `customHeaderStyle` adds custom styling only to the particular header cell. it is also used to change default column size (default is `width: 5em`).

Property `name` is a string that will be rendered as a header cell in headers row of the table. Property `key` is a key name for getting data from `data` prop, it must be the same as it is in objects in `data` prop.

Property `customData` is an object, which allows developers to use custom styling for all cells in column assigned below partucilar header.

Example:

```
title: {
	text: "Table Demo",
	icon: "cil-user"
}
```

Optional property `link` is either an object or a function. 
Object contains properties `pathname` and `key`, where `pathname` is a string which is representing pathname for <Link> component and `key` is a key name for getting id for pathname.
Output for link cell would look like:

```js
<Link to={{ pathname: link.pathname + obj[link.key] }} >
```
A function allows more variability and returns complete path. Output for link cell would be a string returned from calling the link function.

```js
const headers = [
		...,
		{
			name: 'Demo Link',
			key: 'username',
			link: (obj, header) => `my/awesome/custom/path/${header.key}/${obj.username}`,
		}
	];
```


If `pathname` is "/user/", `key` is "_id" and data for that cell is 
{
	...
	_id: 1,
	...
 } then href would be /user/1

Optional property `datetime` is boolean or object, and it tells `DataTable` if cells below current header is date. If `datetime` is true then it returns <DateTime> component with default format 'PPp'.
If you want to change date format, then you should provide `datetime` as object with property `datetime: {datetimeFormat: "iso"}`.

There are 3 options for changing the time format in the table:

> - `datetime: true` It displays the time in format 'PPp' -> `Nov 22, 2022, 1:13 PM`.
> - `{datetimeFormat: "long"}` It displays the time in format 'PPpp' with seconds -> `Nov 22, 2022, 1:13:00 PM`
> - `{datetimeFormat: "iso"}` It displays the time in ISO format with milliseconds -> `2022-11-03T13:13:00+01:00`

Optional property `json` is needed if data has nested objects inside itself. It is boolean, and it returns `react-json-view` components into cells below the header.

Optional property `actionButton` is needed to put an ellipsis with actions dropdown for some list of actions into the row of the datatable. This property is an object with two children — `title`, which is a string and will be placed as a dropdown header, and `actions`, which is a list of objects (actions). Those objects in the `actions` list have two required properties: a string `name` and a function `onClick` and one optional property `icon`. Property `name` will be placed as a dropdown item, clicking on it calls the `onClick` function, which accepts two arguments — `row` and `header`. `row` is the appropriate row object and `header` is a header where you defined an `actionButton`. A property `icon` is a string with the Core UI icon.
Also `actionButton` has an alignment to the right, so the header with action buttons should be the last one in the headers list.

Optional properties `customRowStyle` and `customRowClassName` are needed if you want to highlight some rows base on some condition. Both properties should be objects with key `condition` which is a function that accepts the target object, base on target object it should return boolean values. If `true` than style or class is applied to the whole row, if false then it will have default styles for row. The difference in props are in second property. For `customRowStyle` it is an object with keyname `style` with jsx styles and for `customRowClassName` it is a string with keyname `className` which will be added to `<tr>` element.

Example of `customRowStyle`:
```js
const customRowStyle = {
	condition: obj => obj.suspended === true,
	style: {
		backgroundColor: "#fff3cd",
		color: "#856404"
	}
}

return (
	<DataTable
		...
		customRowStyle={customRowStyle}
	>
)
```

Example of `customRowClassName`:
```js
const customRowClassName = {
	condition: obj => obj.suspended === true,
	className: "row-suspended"
}

return (
	<DataTable
		...
		customRowClassName={customRowClassName}
	>
)
```

About how to use optional property `customComponent` you may find information in section Custom Components.

Example:

```js
headers: [
	{ name: 'ID', key: '_id' },
	{ name: 'Name', key: 'username', link: { pathname: '/user/', key: '_id' } },
	{ name: 'Provider', key: '_provider_id' },
	{ name: 'Type', key: '_type' },
	{ name: 'Date 1', key: '_date', datetime: true },
	{ name: 'Date 2', key: '_date', datetime { format: 'lll' }},
	{ name: 'Actions', actionButton: {
		title: 'Actions',
		actions: [
			{ 
				name: "Action 1",
				onClick(row, header) { alert(row._id); },
				icon: "cib-jenkins"
			},
		]
	}}
]
```

Prop `data` is an array of objects. `DataTable` component goes through objects in `data` and for each object looks for those properties which has the same key name that was defined in `headers[idx]`. If properties exist in that object from `data`, they will be rendered as string under the appropriate headers. Otherwise if some properties doesn't exist in that object, the `-` symbol will be rendered instead.
Prop's `data` length should be less or equal to 10 or to `limit` prop if such is defined. If `data` length is more than `limit`, then it will be cutted.
If `data` length is zero then `DataTable` will return message "No items" in it's body (for translating it check `localization.md` doc).

Array `data` may be fetched from `axios` in container of the `DataTable` for example. In demo we used predefined `initData` object contains data collection and `fetch(limit, page, str)` method that accepted Table's limit, current page and string from search input field. The `fetch` method is immitating fetch request from the server. You may take a look at our demo app to see how data for `data` prop is initialized and updated.

Example of fetching data with axios:

```js
const fetchData = (page, searchValue="", limit=10) => {
	Axios.get("", {params: {p:page, i: limit, f: searchValue}})
	.then(response => {
		setData(response.data);
	})
	.catch(e => {
		console.log(e);
		props.app.addAlert("warning", "Failed to fetch the data");
	});
};
```

Also `DataTable` needs props `count`, `currentPage` and `setPage`. Prop `count` is number representing the count of all items, it is used to calculate last page in pagination of `DataTable`. Props `currentPage` and `setPage` are number and function respectively, first represents current page of `DataTable`, second is used to navigate between pages in `DataTable`.

Example of handling and using `data`, `count`, `currentPage` and `setPage`:

```js
import React, { useState } from 'react';
...

function (props) {
	...

	const [data, setData] = useState([]);
	const [page, setPage] = useState(1);
	const [count, setCount] = useState(0);
	
	...
	const fetchData = (page) => {...}  
	...

	useEffect(() => {
		fetchData(page);
	}, [page]);

	...

	return (
		<DataTable
			...
			data={data}
			count={count}
			currentPage={page}
			setPage={setPage}
			...
		/>
	)

}
```

Prop `count` is usually obtained from API endpoint with fetched data.

Example of fetched data:

```js
{
	data: [...],
	count: /*some amount*/
}
```

# Optional

`DataTable` can also accept optional props `limit`, `setLimit`, `createButton`, `buttonWithAuthz`, `customButton`, `customComponent`, `search`, `onSearch`, `isLoading`, `noItemsComponent`, `customCardBodyComponent`, `sublistsKey`, `onDownload`, `height`, `disableAdvMode`.

Example of `DataTable` with all props:

```js
<DataTable
	title={{text: "Table Demo", icon: 'cil-user'}}
	data={data}
	headers={headers}
	count={count}
	limit={limit}
	setLimit={setLimit}
	currentPage={page}
	setPage={setPage}
	search={{ icon: 'icon', placeholder: 'placeholder' }}
	onSearch={onSearch}
	createButton={{ text: "Create", icon: 'icon', pathname: '#' }}
	buttonWithAuthz={buttonWithAuthzProps}
	customButton={customButton}
	customComponent={customComponent}
	onDownload={onDownload}
	isLoading={isLoading}
	noItemsComponent={noItemsComponent}
	height={height}
	disableAdvMode={true}
/>
```

Props `limit` and `setLimit` is used to handle limiting the amount of objects per page. Prop `limit` is number and represents the amount of rendered objects per page and calculate amount of pages in `DataTable`, default value is 10. Prop `setLimit` is a function for changing `limit`. If `setLimit` exists `DataTable` renders dropdown box for setting limit with values 5, 10, 15, 20.

Example of handling and using:

```js
import React, { useState } from 'react';

...

function (props) {
	...
	const [limit, setLimit] = useState(10);
	...
	return (
		<DataTable
			...
			limit={limit}
			setLimit={setLimit}
			...
		>
	);
}
```

Prop `createButton` is used for rendering button with a link for redirecting to create page. It is an object with obligatory properties `text` and `pathname` which are text inside the button and pathname for redirecting respectively.
`createButton` also accepts optional property `icon` for rendering icon on the right side of the text inside the button.
Property `icon` can either be a React Component (e.g. from package `@material-ui/icons`) or a string which is className and will be rendered as `<i className={icon}></i>`

Example:

```js
	...
	return (
		<DataTable
			...
			createButton={{ text: "Create", icon: "icon-classname", pathname: "#" }}
			...
		>
	);
	...
```

`createButton` may also be obtained from configuration.

Example of `createButton` in `configDefaults`:
```
let ConfigDefaults = {
	...
	table: {
		create_button: { text: "Create", icon: "icon-classname", pathname: "#" }
	},
	...
};
```

You may also use `buttonWithAuthz` which will create `ButtonWithAuthz` component in the header. `buttonWithAuthz` accepts all `ButtonWithAuthz` props. For additional information check how to use `ButtonWithAuthz`

Example of `buttonWithAuthz`:
```js
...
	const buttonWithAuthzProps = {
		title:"Button with authz",
		color:"danger",
		size:"sm",
		onClick() {alert("You've clicked button with authz")},
		resource: "res:res",
		resources: ["res:res"],
		children: (<><i className="at-trash mr-2"></i>ButtonWithAuthz</>)
	}
	...

	return (
		...
		<DataTable
			...
			buttonWithAuthz={buttonWithAuthzProps}
			...
		/>
	)

```

And there is also one prop `customButton` which we may consider as custom button. It just uses `Button` component with tag `span` from `reactstrap` library.
Prop `customButton` accepts object with three properties:
1) `text` - title which will be displayed inside of button
2) `icon` - optional property which displays icon alognsied the button's title
3) `props` - object with props which will be passed to `Button` component of `reactstrap`

Example of `customButton`:
```js
...
	const customButton = {
		text: "Custom button",
		icon: "cil-warning",
		props: {
			color: "primary",
			onClick: () => {
				alert("This is warning after button is clicked");
			}
		}
	}
	...

	return (
		...
		<DataTable
			...
			customButton={customButton}
			...
		/>
	)

```

Prop `customComponent` is used in case if you need to create custom component in the header of `DataTable`. It accepts some component which will be placed at the end of the header:

Example of `customComponent`:
```js
...
	const customComponent = (
		<Button
			size="sm"
			color="success"
			onClick={nextPage}
		>
			Next Page
		</Button>
	);
	...

	return (
		...
		<DataTable
			...
			customComponent={customComponent}
			...
		/>
	)

```

Props `search` and `onSearch` is used to render input search box in `DataTable`. First prop `search` is either a boolean or an object containing optional property `placeholder` for placeholder of search input box and optional property `icon` which can either be a React Component (e.g. from package `@material-ui/icons`) or a string which is className and will be rendered as `<i className={icon}></i>`.Prop `search` may be obtained from configuration.
Second prop `onSearch` is a function which executes after 500ms after last change in search input box has been made, it can be used with axios to filter data (example below).

Example of handling and using search and onSearch:

```js
import React, { useState } from 'react';
...

function (props) {
	...
	const search = props.app.Config.get('table').search;

	const [data, setData] = useState([]);
	const [page, setPage] = useState(1);
	const [count, setCount] = useState(0);
	const [str, setStr] = useState('');
	
	...
	const fetchData = (page, str="") => {...}  
	...

	useEffect(() => {
		fetchData(page, str);
	}, [page, str]);

	const onSearch = (value) => {
		setStr(value);
	};
	...

	return (
		<DataTable
			...
			data={data}
			count={count}
			currentPage={page}
			setPage={setPage}
			search={search}
			onSearch={onSearch}
			...
		/>
	)

}
```

Example of configDefaults for `search`:

```js
let ConfigDefaults = {
	...
	table: {
		...
		search: { icon: 'icon-classname', placeholder: 'placeholder' }
	}
};
```

Prop `category` is an object which contains a key `sublistKey` for children object from list of data and `key` which will be taken to render td for target parent object. Also you can path some type prop like `link` or `customComponent` to generate cell component for parent.
`sublistKey` value of parent object also should an object with such structure: 
```js
"children": {
	"data": [...],
	"count": 10
}
```
NOTE: If `sublistKey` is not present in target parent object then sublist for this object will not be generated 

```js
const data = [
	{ // this item will have sublist
		"parent_title": "Parent item",
		"children": [
			{
				"child_title": "Child item",
				"age": 0
			},
			"count": 1
		]
	},
	{ // this item will not have a sublist
		"parent-title": "Item without children"
	}
]

const headers = [
	{
		key: "child_title",
		name: "Title"
	},
	{
		key: "age",
		name: "Age"
	}
]

...
return (
	<DataTable 
		...
		data={data}
		category={{
			key: "parent_title",
			sublistsKey:"children",
			customComponent: (parentObj) => parentObj.name
		}}
	/>
);
```

Prop `onDownload` is a function that returns a list of items that needs to be downloaded. When such function is provided `DataTable` will automatically download csv with provided list.
For downloading content which is displayed with custom components check section Custom Components.

Prop `isLoading` is used to notify user if content of DataTable is loading. It accepts boolean and if `true` then `DataTable` return `Spinner` component in it's body. You may set it to true when your application is trying to fetch data for you `DataTable` and set to false when fetching has finished.

Example of using `isLoading`:
```js
const [isLoading, setLoading] = useState(false);

useEffect(() => {
	setLoading(true);
	axios.get('https://your-address.com')
		.then(res => {
			/* work with fetched data */
			setLoading(false);
		})
		.catch(res => {
			/* work with error */
			setLoading(false);
		})
}, [])

return (
	...
	<DataTable
		...
		isLoading={isLoading}
		...
	/>
)
```

Prop `noItemsComponent` is used if you want to define custom component or string for displaying message when number of items in data passed into `DataTable` is zero. As string just write message you want to display. 

Example of using `noItemsComponent` as string:
```js
...
import { DataTable } from 'asab-webui';

...
	return (
		<DataTable
		...
		noItemsComponent="Some custom message"
		/>
	);
```

Also you can pass into `noItemsComponent` your custom component instead of string. `DataTable` will render it instead of default one with default styles.

Example of using `noItemsComponent` as string:
```js
...
import { DataTable } from 'asab-webui';

...
	return (
		<DataTable
		...
		noItemsComponent={<div className="m-auto text-bold text-primary">Some custom message</div>}
		/>
	);

```

Prop `customCardBodyComponent` is used to place your custom component in card's body between card header and table itself.

Usage:
```js
...
import { DataTable } from 'asab-webui';

...
	return (
		<DataTable
			customCardBodyComponent={<div className="m-auto text-bold text-primary">Some custom description message</div>}
		/>
	);

```

### Custom Components

In some cases you may understand that in `DataTable` you need to have some external component instead of regular cells. Or you may just want to somehow style your cells. Then `customComponent` property of header may help you.

Optional property `customComponent` is needed to provide some uncommon component inside table cell. That property is object with obligatory `generate` and optional `onDownload` functions.

Function `generate` is called with two arguments during `DataTable` rendering process and it should return component which will be placed inside table cell. First argument is object from data array representing row. Below is example how such header may look like:

```js
headers = [
	...
	{
		name: "Fancy text",
		customComponent:{
			generate: (row) => <SomeFancyComponent>{row.some_key}</SomeFancyComponent>
		}
	}
]
```

Second argument that `DataTable` pass to `generate` is header itself and it is needed if you want to provide some data from header to your custom component. Example of using that is below:

```js
{
	name: "Fancy text",
	customComponent:{
		generate: (row, header) => <SomeFancyComponent>{header.name} | {row.some_key}</SomeFancyComponent>
	}
}
```

Property `onDownload` of `customComponent` is needed if you want to use custom components with downloading `DataTable` content functionality. It is a simple function that returns some string and which will be called when csv file is generating. It should also accept object and header as arguments. Below you may find example:

```js
{
	name: "Fancy text",
	customComponent:{
		generate: (row, header) => <SomeFancyComponent>{header.name} | {row.some_key}</SomeFancyComponent>,
		onDownload: (row, header) => `${header.name} | ${row.some_key}`;
	}
}
```

Property `height` is needed if you want the item of elements in the table to adjust to the height of the web page when it first loads.
NOTE: `height` should be used in conjunction with the `limit` and `setLimit`.
> You will need two `useEffect`:
> 
> - The first will calculate the height of the container when it is first loaded. 
> - The second you need to have the number of rows displayed dynamically, you need to add a condition (`limit > 0`), where you call the function that gets the data for the table. It will be in the same `useEffect` in which you called the function before.
> 
You also need to add `useRef`. You will need to place it on the wrapper tag. It can only be `<div>`.Be sure to style this tag to 100% height.
The number of items displayed per page will be a multiple of 5.
```js
import React, { useState, useEffect, useRef } from 'react';

	...

function (props) {
	...
	const [limit, setLimit] = useState(0);
	const [height, setHeight] = useState(0);
	const ref = useRef(null);

	useEffect(() => {
		setHeight(ref.current.clientHeight);
	}, []);

	useEffect(() => {
		if (limit > 0) {
			fetchData();
		}
	}, [...,limit]);

	const fetchData = () => {...}

	return (
		<div className="h-100" ref={ref}>
			<DataTable
			...
			limit={limit}
			setLimit={setLimit}
			height={height}
			...
			>
		</div>
	);
	..
}
```


Property `disableAdvMode`is necessary to disable the advanced mode in the DataTable.

Example of using `disableAdvMode`:
```js
...
import { DataTable } from 'asab-webui';

...
	return (
		<DataTable
		...
			disableAdvMode={true}
		/>
	);

```

# DataTable props

```js
props: {
  data: Array<objects> // objects that will represent rows in a table
  headers: Array<{
    name: string, // name of the headers in a table
    key: 'string'', // name of the key for searching properties in objects in props.data
	link?: function | {
		pathname: string,
		key: string
	},
	datetime?: boolean | { format: string },
	customCellStyle?: object
	customHeaderStyle?: object
  }>,
  count: number, // count of all items
  currentPage: number, // current page of the table
  setPage: function, // function for setting page number
  title: {
    text: string, // name of a table
    icon?: string | React.Component // Icon that will be displayed alongside the text as component or 
                                    // as <i className={icon}></i> in case icon is string. 
  }, 
  limit?: number, // limit of items per page. Default is 10
  setLimit?: function, // function for setting limit
  height?: number, // table height
  createButton?: {
    text: string, // text inside button
    pathname: string, // URL for redirecting to create page
    icon?: string|React.component, // Icon that will be displayed alongside the text as component or 
                                  // as <i className={icon}></i> in case icon is string. 
  },
  search?: boolean | {
    placeholder?: string, // placeholder for search input box
    icon?: string | React.Component // Icon that will be displayed alongside the text as component or 
                                    // as <i className={icon}></i> in case icon is string.
  },
  onSearch?: function, // function that is called in 500ms after changes has been made in search input box
  isLoading?: boolean, // indicator for DataTable for showing spinner,
  disableAdvMode?: boolean, // prop to turn off the advanced mode,
  noItemsComponent?: string | React.component // custom component for displaying message when there are no items
}

```
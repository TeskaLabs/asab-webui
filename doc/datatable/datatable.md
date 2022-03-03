# ASAB WebUI DataTable component

`DataTable` is react reusable component.
It is used to display common data like numbers and strings. 

Also `DataTable` supports `advmode`. When `advmode` is enabled, `DataTable` displays extra column which is json for data passed in as `data` prop. More info about `advmode` can be found in `doc/advmode.md`.

Demo app's path: `asab-webui/demo/src/modules/home/containers/TableContainer.js`.

# Implementation

DataTable can be mounted in its own container as it is implemented in demo app or as a widget in another app's container. In first case you must create container for `DataTable` and connect it to any module of your application by adding it's route and navigation item. 

Example from demo:

```
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
			icon: 'cil-chart',
		})
	}
}

```

DataTable needs obligatory props `headers`, `data`, `count`, `currentPage`, `setPage` and `title` to render.

Example of `DataTable` with obligatory props:

```
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

```
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

```
	...
	const headers = props.app.Config.get('table').headers;
	const configLimit = props.app.Config.get('table').limit;
	const title = props.app.Config.get('table').title;
	...
```

Prop `title` is an object that has obligatory property `text` which is string and it will be rendered as table title. Also `title` has optional property `icon` for rendering icon alongside the table title and which can be either React Component (e.g. from package `@material-ui/icons`) or it can also be a string which is classname for icon element and will be rendered as <i className={icon}></i>

Example:

```
title: {
	text: "Table Demo",
	icon: "cil-user"
}
```

Prop `headers` is basically an array containing objects with obligatory properties `name` and `key` and optional properties `link`, `datetime`, `json`, `actionButton` and `customComponent`. Order of headers in a table is the same as it is in prop `headers`.

Property `name` is a string that will be rendered as a header cell in headers row of the table. Property `key` is a key name for getting data from `data` prop, it must be the same as it is in objects in `data` prop.

Optional property `link` is an object containing properties `pathname` and `key`. `pathname` is a string which is representing pathname for <Link> component, `key` is a key name for getting id for pathname. 
Output for link cell would look like:

```
<Link to={{ pathname: link.pathname + obj[link.key] }} >
```

If `pathname` is "/user/", `key` is "_id" and data for that cell is 
{
	...
	_id: 1,
	...
 } then href would be /user/1

Optional property `datetime` is boolean and it tells `DataTable` if cells below current header is date. If `datetime` is true then it returns <DateTime> component with default format 'lll'. 
If you want to change date format, then you should provide `datetime` as object with property `format`.

Optional property `json` is needed if data has nested objects inside itself. It is boolean and it returns `react-json-view` components into cells below the header.

Optional property `actionButton` is needed to put an ellipsis with actions dropdown for some list of actions into the row of the datatable. This property is an object with two children — `title`, which is a string and will be placed as a dropdown header, and `actions`, which is a list of objects (actions). Those objects in the `actions` list have two required properties: a string `name` and a function `onClick` and one optional property `icon`. Property `name` will be placed as a dropdown item, clicking on it calls the `onClick` function, which accepts two arguments — `row` and `header`. `row` is the appropriate row object and `header` is a header where you defined an `actionButton`. A property `icon` is a string with the Core UI icon.
Also `actionButton` has an alignment to the right, so the header with action buttons should be the last one in the headers list.

About how to use optional property `customComponent` you may find information in section Custom Components.

Example:

```
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

```
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

```
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

Prop `count` is ussualy obtained from API endpoint with fetched data.

Example of fetched data:

```
{
	data: [...],
	count: /*some amount*/
}
```

# Optional

`DataTable` can also accept optional props `limit`, `setLimit`, `createButton`, `buttonWithAuthz`, `customButton`, `customComponent`, `search`, `onSearch`, `isLoading`, `noItemsComponent`, `customCardBodyComponent` and `onDownload`.

Example of `DataTable` with all props:

```
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
/>
```

Props `limit` and `setLimit` is used to handle limiting the amount of objects per page. Prop `limit` is number and represents the amount of rendered objects per page and calculate amount of pages in `DataTable`, default value is 10. Prop `setLimit` is a function for changing `limit`. If `setLimit` exists `DataTable` renders dropdown box for setting limit with values 5, 10, 15, 20.

Example of handling and using:

```
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
Property `icon` can either be a React Component (e.g. from package `@material-ui/icons`) or a string which is className and will be rendered as <i className={icon}></icon>

Example:

```
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
```
...
	const buttonWithAuthzProps = {
		title:"Button with authz",
		color:"danger",
		size:"sm",
		onClick() {alert("You've clicked button with authz")},
		resource: "res:res",
		resources: ["res:res"],
		children: (<><i className="cil-trash mr-2"></i>ButtonWithAuthz</>)
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
```
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
```
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

Props `search` and `onSearch` is used to render input search box in `DataTable`. First prop `search` is either a boolean or an object containing optional property `placeholder` for placeholder of search input box and optional property `icon` which can either be a React Component (e.g. from package `@material-ui/icons`) or a string which is className and will be rendered as <i className={icon}></icon>.Prop `search` may be obtained from configurtion.
Second prop `onSearch` is a function which executes after 500ms after last change in search input box has been made, it can be used with axios to filter data (example below).

Example of handling and using search and onSearch:

```
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

```
let ConfigDefaults = {
	...
	table: {
		...
		search: { icon: 'icon-classname', placeholder: 'placeholder' }
	}
};
```

Prop `onDownload` is a function that returns a list of items that needs to be downloaded. When such function is provided `DataTable` will automatically download csv with provided list.
For downloading content which is displayed with custom components check section Custom Components.

Prop `isLoading` is used to notify user if content of DataTable is loading. It accepts boolean and if `true` then `DataTable` return `Spinner` component in it's body. You may set it to true when your application is trying to fetch data for you `DataTable` and set to false when fetching has finished.

Example of using `isLoading`:
```
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
```
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
```
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

```
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

```
{
	name: "Fancy text",
	customComponent:{
		generate: (row, header) => <SomeFancyComponent>{header.name} | {row.some_key}</SomeFancyComponent>
	}
}
```

Property `onDownload` of `customComponent` is needed if you want to use custom components with downloading `DataTable` content functionality. It is a simple function that returns some string and which will be called when csv file is generating. It should also accept object and header as arguments. Below you may find example:

```
{
	name: "Fancy text",
	customComponent:{
		generate: (row, header) => <SomeFancyComponent>{header.name} | {row.some_key}</SomeFancyComponent>,
		onDownload: (row, header) => `${header.name} | ${row.some_key}`;
	}
}
```

# DataTable props

```
props: {
  data: Array<objects> // objects that will represent rows in a table
  headers: Array<{
    name: string, // name of the headers in a table
    key: 'string'', // name of the key for searching properties in objects in props.data
	link?: {
		pathname: string,
		key: string
	},
	datetime?: boolean | { format: string }
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
  noItemsComponent?: string | React.component // custom component for displaying message when there are no items
}

```
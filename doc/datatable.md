# ASAB WebUI DataTable component

`DataTable` is react reusable component.
It is used to display common data like numbers and strings. 

Also `DataTable` supports `advmode`. When `advmode` is enabled, `DataTable` displays extra column which is json for data passed in as `data` prop. More info about `advmode` can be found in `doc/advmode.md`.

Demo app's path: `asab-webui/demo/src/modules/home/containers/TableContainer.js`.

# Implementation

DataTable can be mounted in its own container as it is implemented in demo app or as a widget in another app's container. In first case you must create container for `DataTable` and connect it to Home Module of your application by adding it's route and navigation item. Example may be found in `demo/src/modules/home/index.js`.

DataTable needs obligatory props `headers`, `data`, `count`, `currentPage`, `setPage` and `title` to render.

Some props can be obtained from configuration of the project  (e.g. in demo app `headers` and `limit` props are obtained from the configuration).

Prop `title` is an object that has obligatory property `text` which is string and it will be rendered as table title. Also `title` has optional property `icon` for rendering icon alongside the table title and which can be either React Component (e.g. from package `@material-ui/icons`) or it can also be a string which is classname for icon element and will be rendered as <i className={icon}></i>

Prop `headers` is basically an array containing objects with obligatory properties `name` and `key`. Property `name` is a string that will be rendered as a header cell in headers row of the table. Property `key` is a key name for getting data from `data` prop, it must be the same as it is in objects in `data` prop.
Order of headers in a table is the same as it is in prop `headers`.

Prop `data` is an array of objects. `DataTable` component goes through objects in `data` and for each object looks for those properties which has the same key name that was defined in `headers[idx]`. If properties exist in that object from `data`, they will be rendered as string under the appropriate headers. Otherwise if some properties doesn't exist in that object, the `-` symbol will be rendered instead.
Prop's `data` length should be less or equal to 10 or to `limit` prop if such is defined. If `data` length is more than `limit`, then it will be cutted. 
Array `data` may be fetched from `axios` in container of the `DataTable` for example. In demo we used predefined `initData` object contains data collection and `fetch(limit, page, str)` method that accepted Table's limit, current page and string from search input field. The `fetch` method is immitating fetch request from the server. You may take a look at our demo app to see how data for `data` prop is initialized and updated.

Also `DataTable` needs props `count`, `currentPage` and `setPage`. Prop `count` is number representing the count of all items, it is used to calculate last page in pagination of `DataTable`. Props `currentPage` and `setPage` are number and function respectively, first represents current page of `DataTable`, second is used to navigate between pages in `DataTable`.

# Optional

`DataTable` can also accept optional props `limit`, `setLimit`, `createButton`, `search` and `onSearch`.

Props `limit` and `setLimit` is used to handle limiting the amount of objects per page. Prop `limit` is number and represents the amount of rendered objects per page and calculate amount of pages in `DataTable`, default value is 10. Prop `setLimit` is a function for changing `limit`. If `setLimit` exists `DataTable` renders dropdown box for setting limit with values 5, 10, 15, 20.

Prop `createButton` is used for rendering button with a link for redirecting to create page. It is an object with obligatory properties `text` and `pathname` which are text inside the button and pathname for redirecting respectively.
`createButton` also accepts optional property `icon` for rendering icon on the right side of the text inside the button.
Property `icon` can either be a React Component (e.g. from package `@material-ui/icons`) or a string which is className and will be rendered as <i className={icon}></icon>

Props `search` and `onSearch` is used to render input search box in `DataTable`. First prop `search` is either a boolean or an object containing optional property `placeholder` for placeholder of search input box and optional property `icon` which can either be a React Component (e.g. from package `@material-ui/icons`) or a string which is className and will be rendered as <i className={icon}></icon>.Second prop `onSearch` is a function which executes after 500ms after last change in search input box has been made.


# DataTable props

```
props = {
  data: Array<objects> // objects that will represent rows in a table
  headers: Array<{
    name: string, // name of the headers in a table
    key: 'string'' // name of the key for searching properties in objects in props.data
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
  }
  onSearch?: function // function that is called in 500ms after changes has been made in search input box
}

```
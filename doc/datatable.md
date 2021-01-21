# ASAB WebUI DataTable component

`DataTable` is react reusable component.
It is used to display common data like numbers and strings alongside with JSON objects.

# Implementation

DataTable needs obligatory props `headers`, `data`, `count`, `currentPage`, `setPage` and `title` to render.

Prop `title` is an object that has obligatory property `text` which is string and it will be rendered as table title. Also `title` has optional property `icon` for rendering icon alongside the table title and which can be either React Component (e.g. from package `@material-ui/icons`) or it can also be a string which is classname for icon element and will be rendered as <i className={icon}></i>

Prop `headers` is basically an array containing objects with obligatory properties `text` and `type`. Property `text` is a string that will be rendered as a header (first letter of `headers.text` automaticly will be converted to uppercase) in headers row of the table. Property `type` is a type of data in each cell for column of that header, it can be either `string` or `json`.
Order of headers in a table is the same as in prop `headers`.

Prop `data` is an array of objects. `DataTable` goes through `data` and looks for those properties which has the same name as 
`headers[idx].text`, if such exist, it will be rendered under that `headers[idx].text` as string or json.

Also `DataTable` needs props `count`, `currentPage` and `setPage`. Prop `count` is number representing the count of all items, it is used to calculate last page in pagination of `DataTable`. Props `currentPage` and `setPage` are number and function respectively, first represents current page of `DataTable`, second is used to navigate between pages in `DataTable`.

# Optional

`DataTable` can also accept optional props `limit`, `setLimit`, `createButton`, `search` and `onSearch`.

Props `limit` and `setLimit` is used to handle limiting the amount of objects per page. Prop `limit` is number and represents the amount of rendered objects per page and calculate amount of pages in `DataTable`, default value is 20. Prop `setLimit` is a function for changing `limit`. If `setLimit` exists `DataTable` renders dropdown box for setting limit with values 5, 10, 15, 20.

Prop `createButton` is used for rendering button with a link for redirecting to create page. It is an object with obligatory properties `text` and `pathname` which are text inside the button and pathname for redirecting respectively.
`createButton` also accepts optional property `icon` for rendering icon on the right side of the text inside the button.
Property `icon` can either be a React Component (e.g. from package `@material-ui/icons`) or a string which is className and will be rendered as <i className={icon}></icon>

Props `search` and `onSearch` is used to render input search box in `DataTable`. First prop `search` is either a boolean or an object containing optional property `placeholder` for placeholder of search input box and optional property `icon` which can either be a React Component (e.g. from package `@material-ui/icons`) or a string which is className and will be rendered as <i className={icon}></icon>.Second prop `onSearch` is a function which executes after 500ms after last change in search input box has been made.


# DataTable props

```
props = {
  data: Array<objects> // objects that will represent rows in a table
  headers: Array<{
    text: string, // name of the headers in a table
    type: 'string'|'JSON' // type of data in a column of the header
  }>,
  count: number, // count of all items
  currentPage: number, // current page of the table
  setPage: function, // function for setting page number
  title: {
    text: string, // name of a table
    icon?: string | React.Component // Icon that will be displayed alongside the text as component or 
                                    // as <i className={icon}></i> in case icon is string. 
  }, 
  limit?: number, // limit of items per page. Default is 20
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
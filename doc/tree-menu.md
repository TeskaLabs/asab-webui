# ASAB WebUI TreeMenu component

This component is based on the library [react-simple-tree-menu](https://github.com/iannbing/react-simple-tree-menu).

Displays menu items in a clear structure.

## Example code

```javascript
import { TreeMenu } from 'asab-webui';
...

<TreeMenu
	resource={resource}
	data={treeData}
	hasSearch={true}
	hasNodes={true} // default: false
	searchOptions={{
		placeholder: t("Search"),
		dropdown: {
			title: t("Actions"),
			children: ChildrenCustomDropdownComponent
		}
	}}
/>

```


## Props:

#### Required:

	- `data`: object or array, data in a special structure. The detailed data structure is described in the library documentation react-simple-tree-menu.

	- `hasSearch`: boolean, changes the styles for the search input and affects the display of placeholder

	- `hasNodes`: boolean, if a `TreeNode` is the last node of its branch	

	- `resource`: string, resource granting display disabled tree-menu-item elements


#### Optional:
More additional parameters can be found [here](https://github.com/iannbing/react-simple-tree-menu#api).

	- `searchOptions`: object, conducts placeholder and the dropdown component


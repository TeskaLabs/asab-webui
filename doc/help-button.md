# ASAB WebUI HelpButton component

Display documentation for your desired screen in modal. The documentation can be found [here](https://docs.teskalabs.com/logman.io/user/)

If you want to add this component, you need to call the `addHelpButton` method. This method takes only 1 parameter:
>- `path` (string) e.g.: `"export"` or `"dashboards"`, ...

It will be sufficient to indicate the **correct** part of the documentation (parts of the documentation are in the sidebar), specify the path that comes after this part `https://docs.teskalabs.com/logman.io/user/`

#### Example code

```javascript
export function Container(props) {
	props.app.addHelpButton("Path/part/to/documentation");
}
```

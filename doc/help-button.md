# ASAB WebUI HelpButton component

Display information info for the desired screen in the modal screen.

If you wand to add this component, you need to call the `addHelpButton` method. This method will take 1 parameter:
>- Parameter is `path`, for example (Exports/Detail, Dashboards/SomeDashboardName)
## Example code

```javascript
export function Container(props) {
	props.app.addHelpButton("Path/to/help-content");
}

```

In order for the help-content to be displayed, it must be added to the Library in the directory `Help`. File with help-content must have a file extension `json`.

```json
{
    "content": "Help content"
}
```
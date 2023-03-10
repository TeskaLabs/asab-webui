# ASAB WebUI HelpButton component

Display information info for the desired screen in the modal screen.

If you wand to add this component, you need to call the `addHelpButton` method. This method will take 1 parameter:
>- Parameter is `path`, for example (Exports/Detail, Dashboards/SomeDashboardName)
## Example code

```javascript
const ExportsContainerDetail = (props) => {
	props.app.addHelpButton("Dashboards/SomeDashboardName");
	return (...);
}

export default ExportsContainerDetail;
```

In order for the description to be displayed, it must be added to the Library.
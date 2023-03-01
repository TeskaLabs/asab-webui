# ASAB WebUI HelpButton component

Display information info for the desired screen in the modal screen.

If you wand to add this component, you need to call the `addHelpButton` method. This method will take 2 parameters:
>- First parameter is `screenName`, for example (Exports, Dashboards, Discover, Lookups, Library)
>- Second parameter is `screenType`, for example if it is a dashboard, pass the name of the selected dashboard (Office 365) or if it is an Exports, pass the param for which type of screen you want to display this (Detail, Create)

## Example code

```javascript
const ExportsContainerDetail = (props) => {
	props.app.addHelpButton("Export", "Detail.json");
	return (...);
}

export default ExportsContainerDetail;
```
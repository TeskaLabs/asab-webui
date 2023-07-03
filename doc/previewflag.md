# ASAB WebUI PreviewFlag component

`PreviewFlag` is a react reusable component.
It is used to display a customizable (preview) flag. 

# Setup
For adding a custom flag, call the method `setFlag` and set the custom flag `name` (string) for the particular container.

# Usage

```
function SomeContainer(props){
	...
	props.app.setFlag(t("Preview"));
	
	...
}
```
# ASAB WebUI Advanced mode

The advanced mode can be activated by pressing `CTRL 1` - and disabled by pressing `CTRL 1` again.

This mode can be used to display technical infromations such as JSONs on the WebUI.
The advanced mode is `off` by default.


## Stores in Redux state

`App > Store > getState() > advmode.enabled` as a boolean


## Use in props and React Hooks

```
function Container(props) {

	...

	return (
		...

		// This is a conditional card visible only in advanced mode
		{(props.advmode == true) && <Card> ... </Card>}
		...
	)
}


// Map Redux state into props
function mapStateToProps(state) {
	return {
		...
		advmode: state.advmode.enabled,
		...
	}
}

export default connect(mapStateToProps)(Container);
```

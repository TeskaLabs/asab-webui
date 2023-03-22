# ASAB WebUI HelpButton component

Display information for your desired screen in modal.

If you want to add this component, you need to call the `addHelpButton` method. This method takes only 1 parameter:
>- `path` (string) e.g.: `"Exports/Detail"` or `"Dashboards/SomeDashboardName"`, ...

`Path/to/help-content` - is a path you set up in Library. **`Help` folder is excluded from this path.** Content file's extension can be omitted.

#### Example code

```javascript
export function Container(props) {
	props.app.addHelpButton("Path/to/help-content");
}
```


### Add help-content to Library

1. Create `Help` folder in Library.
2. Inside, create a new subfolder (e.g. `Dashboards`, `Clients`, `Credentials`,..)
	- Naming should match sidebar item's name (as in examples above)
3. Inside newly created subfolder, create a _json_ file named after the page where you want the HelpButton component to appear (e.g. `DashboardsName.json`).
4. This _json_ file carries the content which appears in modal (content supports markdown).

#### Specific example

```
- Library
	- Help
		- Dashboards
			- DashboardsName.json
```

#### `DashboardsName.json` content example
```json
{
    "content": "Help content"
}
```

#### Usage inside component
```javascript
export function DashboardsName(props) {
...
	props.app.addHelpButton("Dashboards/DashboardsName");
...
}
```
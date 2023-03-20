# ASAB WebUI HelpButton component

Display information info for the desired screen in the modal screen.

If you wand to add this component, you need to call the `addHelpButton` method. This method will take 1 parameter:
>- Parameter is `path`, for example (Exports/Detail, Dashboards/SomeDashboardName)

`Path/to/help-content` - is the path you set up in the Library without the main folder `Help`

#### Example code

```javascript
export function Container(props) {
	props.app.addHelpButton("Path/to/help-content");
}

```

### Add help-content to the Library

In the Library, create `Help` folder and inside of it, create a new subfolder which has a some section name (the section name can be found on the sidebar) `SectionName` and inside of it, create a file called (it as the name of the page where you want it to appear) `SomeHelpContent.json` for which you wish to add a help-button.

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

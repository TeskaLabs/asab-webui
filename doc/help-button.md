### Default

Help button may have default href. You can define this default href in configuration of your application:

```
let ConfigDefaults = {
    ...
    default_help_url: "https://github.com/TeskaLabs/asab-webui",
    ...
}
```

### Dynamic href

For changing href, icon or target of Help Button you can call function (`props.app.addHelpButton()`) that will automatically add Help Button with href, icon and target defined by you. On unmount of component where this function was called it will also change button's href to default one with default icon and target if default href is specified or it will remove button from the screen if default href isn't provided.

This function (`props.app.addHelpButton(href)`) requires obligatory argument `href`, it is your custom href to another page.

Example:
```
const YourContainer = (props) => {
    props.app.addHelpButton("https://www.your-custom-href.com");
    return (...);
}

export default YourContainer;
```

### Customizing icon and target of Help Button

`addHelpButton()` also accepts two optional arguments: 

1) You can provide classname of icon from coreui icons library and it will replace original info icon. Just pass icon classname as second argument:

```
props.app.addHelpButton("https://www.your-custom-href.com", "cil-plus");
```

2) You can specify target (default is "_blank") for Help Button if needed:

```
props.app.addHelpButton("https://www.your-custom-href.com", "cil-plus", "_self");
```
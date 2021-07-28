# User interface screen

## Setting user interface

The User interface screen is an optional part of an `auth` module dropdown of ASAB Web UI. It shows the information about version and build date.

```
User interface
You can see the details of your user interface here

Last build | 2021-07-27
Version    | 8992ba2+dirty
```

### Setup

Load the page by adding a route in `asab-webui/src/modules/auth/index.js`

```javascript
app.Router.addRoute({
	path: '/auth/interface',
	exact: true,
	name: "User interface",
	component: InterfaceScreen
})
```

Add a link to the page in  `asab-webui/src/modules/auth/header.js`:

```javascript
<DropdownItem tag={Link} to="/auth/interface">
	{t('AuthHeaderDropdown|User interface')}
</DropdownItem>
```

The link will appear inside user `auth` dropdown on the top right of the screen.

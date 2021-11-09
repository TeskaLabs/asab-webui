# Translating breadcrumbs

Breadcrumbs automatically add translating function with key `Breadcrumbs` to crumb name. In order to create translation just add into your `translation.json` files `Breadcrumbs` block and inside add definitions your translations:

```
"Breadcrumbs": {
	"crumb": "drobek"
}

# Disabling breadcrumbs in app

To disable breadcrumbs in all of containers in your asab-webui based application pass into `Application` component prop `disableAppBreadcrumbs` and assign it to `true`. If you bootstrapped your project from asab-webui demo app then your `Application` component should be in `src/index.js` file.

```
<Application
	configdefaults={ConfigDefaults}
	modules={modules}
	defaultpath={__CONFIG__.defaultpath ? __CONFIG__.defaultpath : "/"}
	disableAppBreadcrumbs={true}
/>
```

# Disabling breadcrumbs in one specific container

To disable breadcrumbs in one specific container you should pass key `disableContainerBreadcrumbs` with value `true` into your object you pass as argument into `app.Router.addRoute()` method in `index.js` of module of this container.

```
app.Router.addRoute({
	path: "/myFirstPath/mySecondPath",
	name: "My Container",
	component: MyContainer,
	disableContainerBreadcrumbs: true
});
```
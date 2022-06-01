# ASAB-WebUI Styles

ASAB-WebUI styles are written with using a SASS preprocessor on top of bootstrap v4 styles and Reactstrap components.

We've also created a bunch of CSS variables and SASS variables with support of light and dark mode for colors in order to keep the same styles across all of the applications.

## Recomendations

It is highly recommended to use SASS (`.scss` files) in new styles files and SASS variables and keep your design and code-style the same as in ASAB-WebUI.

## SASS variables and CSS variables

SASS variables are basically a dynamic CSS variables. Value of those contants changes base on the current theme of the ASAB-WebUI based application.

In order to use SASS variables in your ASAB-WebUI based application outside of `asab-webui` itself you can import those variables at the top of your `*.scss` file.

```s
@import "~asab-webui/styles/constants/index.scss";

h1 {
	color: $primary;
}

```

If you're not familiar with CSS variables you can check this link - [Using CSS custom properties (variables)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

If you're not familiar with SASS variables and differences from CSS variable you can check this link - [SASS variables](https://sass-lang.com/documentation/variables)

### List of pre-created SASS variables

```s
	$primary
	$secondary
	$success
	$danger
	$warning
	$info
	$light
	$dark
	$white-night
	$white

	$night-blue
	$light-violet
	$light-gray
	$gray
	$dark-gray
	$beige-gray
	$off-white
	$light-green
	$dark-green
	$pink
	$dark-pink

	$bg-color
	$bg-color-dark
	$bg-color-darker
	$highlighted-bg-color
	$border-color

	$text-color
	$text-secondary-color
	$reversed-text-color
	$highlighted-text-color
	$link-color
	$text-code-highlight

	$highlighted-font-weight
```

### Pre-created CSS variables
If for some reason you're not able to use SASS variables in your code then you can use CSS variables for them.

#### CSS variables names
CSS variables have the same name as SASS variables but with the only difference in the way how those styles are defined.

```s
SASS variable -> CSS variable
$primary -> --primary
```

#### Using CSS variables in `*.css` file
In case you're decided to use CSS variable in `*.css` file you don't have to import file where those variables are declared.
Just simply put variable which you want to use into `var()` CSS function.

```s
h1 {
	color: var(--primary);
}
```

#### Using CSS variables in `JSX`
You need to import your CSS file into component where you want to use CSS variable. But don't bother yourself with it if you're going to use pre-created ASAB-WebUI CSS variables. File with CSS variables is already imported into the root of your application by default.

```jsx
	<div
		style={{ color: "var(--danger)" }}
	>
		My danger div
	</div>
```


### Creating new variables
In order to create and use new variables in your application first you have to understand where to place them. 

1. `asab-webui` repo: If new variable will be used across different projects (products) you can declare them directly in asab-webui repository in `asab-webui/src/styles/constants`.
2. In one particular project: You can create a new styles file with your variables and import it into your project's `index.js` file.
3. In one module/component: You can declare your new variables inside of the styles file of particular module/component.

#### Creating new variables in `asab-webui` repo

Declare SASS variable in `asab-webui/src/styles/constants/index.js`:

```s
$highlighted-font-weight: 500; 
```

If you want to create a new color keep in mind that you might need to define it also for dark theme. In that case first declare CSS variables in `theme-light.scss` and `theme-dark.scss` files inside of `asab-webui/src/styles/constants/`.

`theme-light.scss`:
```s
:root[data-theme="light"] {
	--primary: #315EE3;
}
```

`theme-dark.scss`:
```s
:root[data-theme="dark"] {
	--primary: #7A9CFF;
}
```

After you can declare a SASS variable inside of `asab-webui/src/styles/constants/index.js`:
```s
$primary: var(--primary);
```

#### Creating new variables in one particular project
Create a `style.scss` file in `/src/` of your project and import it into `/src/index.js`:

Example:
```s
:root[data-theme="dark"] {
	--seacat-primary: #7A9CFF;
}

:root[data-theme="light"] {
	--seacat-primary: #315EE3;
}

$seacat-primary: var(--seacat-primary);

h1 {
	color: $seacat-primary
}

```

Note: Please add project name to variables names or some another indificator so you will not conflict with pre-created variables.

#### Creating new variables in one component/module
In your styles file of particular component/module add your new variables at the top of the file. And don't forget to import it into your component or module.

Example:
```s
:root[data-theme="dark"] {
	--seacat-primary: #7A9CFF;
}

:root[data-theme="light"] {
	--seacat-primary: #315EE3;
}

$seacat-primary: var(--seacat-primary);

h1 {
	color: $seacat-primary
}

```

Note: Please add component/module name to variables names or some another indificator so you will not conflict with pre-created variables.



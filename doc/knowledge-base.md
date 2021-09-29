# KnowledgeBase component

`KnowledgeBase` is reusable react component. It helps you to render list of markdown files and theirs content. 

# Getting started

## 1. Preparing files, paths and API

### Files and paths

To start using `KnowledgeBase` component you will need to create your markdown files and json file (in our example we will call it `index.json`) with titles and paths to those markdown files and put everything in `public` folder of your asab-webui based aplication, you also have to create subfolders for that in order to handle paths for api calls. 

In our example we will create subfolder `content` and inside of it we will create one more folder `test` so path to our files is now `/public/content/test`.
For production purposes you probably will like to rename at least `test` folder. You may do this, you may even rename `content` if you want but both should always be inside `public` folder. 

Note that we do not recommend you to rename `content` folder even if it is possible.

### API

If you are using local dev server, then you need to define proxy for this path in your config file:

```
webpackDevServer: {
		port: 3000,
		proxy: {
			// Get content of public folder
			'/api/content': {
				target: "http://127.0.0.1:3000",
				pathRewrite: { '^/api/content': '/content'}
			}
		}
	}
```

In case you've renamed your `content` folder to something else, then you should change API path. For example if you've changed it to `markdowns` and now your files are stored in `public/markdowns/stuff` then your `webpackDevServer` config will look like this:

```
webpackDevServer: {
		port: 3000,
		proxy: {
			// Get content of public folder
			'/api/markdowns': {
				target: "http://127.0.0.1:3000",
				pathRewrite: { '^/api/markdowns': '/markdowns'}
			}
		}
	}
```

Note that `target`'s port and `port` may be different in your case, but the port in target should be the same as port which you define in `webpackDevServer`. In our test example we use port `3000` so our `target`'s port is also `3000` - `http://127.0.0.1:3000`.

### JSON file with paths and titles

`KnowledgeBase` component uses entry json file with defined paths and titles for your markdown files. In our example we call that file `index.json`.
This `index.json` file should contain array (list) of objects (dictionaries) with paths and titles to each markdown file. `KnowledgeBase` component will automatically read this file and render navigation bar based on order of objects inside the array and it's titles. Component also take first item's path in `index.json` list and render content of that file on this path. Every time user will click on another item in navigation bar component will take path of that item, load file on that path and render it's content.

Take a look on our example of how `index.json` file look in our getting started app:

```
[
	{
		"title": "Welcome",
		"path": "/test/welcome.md"
	},
	{
		"title": "Test 1",
		"path": "/test/test-1.md"
	},
	{
		"title": "Test 2",
		"path": "/test/test-2.md"
	}
]
```

On this step our `public` folder looks like this:
```
- public
  -- content
    --- test
      ---- welcome.md
      ---- test-1.md
      ---- test-2.md
```

## 2. Creating container and routes

### Creating container

In your application in file which will contain container with `KnowledgeBase` component you need to import `KnowledgeBase` from `asab-webui` and return it in your component with `app` prop from props of your container: 

```
import React from 'react';

import { KnowledgeBase } from 'asab-webui';

const KnowledgeBaseContainer = (props) => {
	return (
		<KnowledgeBase app={props.app} />
	);
}
```

Also we should add their `api` which we configured earlier and `entryPath` for our `index.json` file.

`KnowledgeBase` takes `apiPath` and create axios instance with `app.AxiosCreate()` method we get from asab-webui application. As we configured our api to be `content` then we pass it as string to `apiPath` prop of `KnowledgeBase`.

As we mentioned above `KnowledgeBase` takes `index.json` file to constuct itself and load content of markdown files. To fetch this `index.json` file `KnowledgeBase` needs to know path to it. As we have put our `index.json` file into `/content/test/` and we've already defined our api as `content` then we need to provide `entryPath` as `/test/index.json`. 

Now our container should look like this:

```
import React from 'react';

import { KnowledgeBase } from 'asab-webui';

const KnowledgeBaseContainer = (props) => {
	return (
		<KnowledgeBase
			app={props.app}
			apiPath="content"
			entryPath="/knowledge/index.json"
		/>
	);
}
```

But that's not all yet. We also need to create routes base on our configuration setup

### Routes

In `index.js` of your module create route like this:

```
import Module from 'asab-webui/abc/Module';
import GettingStartedContainer from './containers/GettingStartedContainer';

export default class GettingStartedModule extends Module {
	constructor(app, name){
		super(app, "GettingStartedModule");

		app.Router.addRoute({
			path: '/test/:document',
			exact: false,
			name: 'Getting Started',
			component: GettingStartedContainer
		});

		app.Navigation.addItem({
			name: 'Getting Started',
			url: '/test/welcome',
			icon: 'cil-lightbulb'
		});
	}
}

```

Let's take a closer look on what is going on here:

We've created `GettingStartedModule` from `Module` and imported our `GettingStartedContainer` which renders `KnowledgeBase` component. In `GettingStartedModule` we defined routes for our component with `app.Router.addRoute()`. Notice that path for those routes are the same as we had in our markdown files from `index.json` entry file:

```
[
	{
		"title": "Welcome",
		"path": "/test/welcome.md"
	},
	{
		"title": "Test 1",
		"path": "/test/test-1.md"
	},
	{
		"title": "Test 2",
		"path": "/test/test-2.md"
	}
]
```

This is as it should be because except fetching files from those paths `KnowledgeBase` component also takes path and push it to tab's history once markdown file should be loaded.

Also take a look on how we defined item for Sidebar:

```
app.Navigation.addItem({
	name: 'Getting Started',
	url: '/test/welcome',
	icon: 'cil-lightbulb'
});
```

In `url` we've defined the same path as in first object of list in our `index.json` entry file. This will redirect user directly to the first markdown file of our `KnowledgeBase` container when he clicks on `Getting Started` item in Sidebar.

Congrats! Our test `KnowledgeBase` application works now!
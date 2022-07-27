# Knowledge base module

`KnowledgeBase` is reusable react module. It helps to render list of markdown articles and their content.

## Prerequisities

`react-markdown` and `rehype-raw` libraries must be added to `package.json` of the application and installed.

For installation, type in terminal:

```
$ yarn add react-markdown
$ yarn add rehype-raw
```

## Add Knowledge base module

To add and load Knowledge base module, it is necessary to import it to `index.js` of the application.

```

const modules = [];

...

import KnowledgeBaseModule from 'asab-webui/modules/knowledge';
modules.push(KnowledgeBaseModule);

...

ReactDOM.render((
	<HashRouter>
		<Application modules={modules} defaultpath="/" configdefaults={ConfigDefaults}/>
	</HashRouter>
), document.getElementById('app'));
```

## Setup proxy pass

Knowledge base module takes the content out of the `public` folder of the application. Thus proxy pass has to point to it as it is in the example below:

```
module.exports = {
	app: {
		...
	},

	...

	webpackDevServer: {
		port: 3000,
		proxy: {

			...

			'/api/content': {
				target: "http://127.0.0.1:3000",
				pathRewrite: { '^/api/content': '/content'}
			}
		}
	}
}
```

## Prepare folder with markdown articles

Knowledge base module takes the content out of the `public` folder of the application. Thus folder `content` with subfolder `knowledge` has to be created inside of `public` folder.

The structure of `public` folder can be following:

```
- public
	- content
		- knowledge
			- index.json
			- my-first-markdown.md
			- my-second-markdown.md
			- somefolder
				- my-third-markdown.md
				- my-fourth-markdown.md
	- locales
	- media
	...
```

### Prepare content of the index.json file

The `index.json` file is important part of the Knowledge base, because it helps to distinguish what markdown articles and in what order one would like to display them in tree menu of Knowledge base module.

- The `title` will be displayed in the tree menu as an item.

- The `path` is the location where the article is stored in `knowledge` folder.

The content of `index.json` file can look like (for folder structure example above):

```
[
	{
		"title": "Welcome",
		"path": "/knowledge/my-first-markdown.md"
	},
	{
		"title": "My second article",
		"path": "/knowledge/my-second-markdown.md"
	},
	{
		"title": "My third article",
		"path": "/knowledge/somefolder/my-third-markdown.md"
	},
	{
		"title": "My fourth article",
		"path": "/knowledge/somefolder/my-fourth-markdown.md"
	}
]
```

## Add locales

Implementation example of language localisation for Knowledge base in `public/locales/en/translation.json` file:

```
{
	...

	"Sidebar": {
		...

		"Knowledge Base": "Knowledge Base",
		...
	},

	...

	"Breadcrumbs": {
		...

		"Knowledge Base": "Knowledge Base",
		...
	},

	...

	"KnowledgeBase": {
		"Something went wrong, failed to fetch Knowledge base folder content": "Something went wrong, failed to fetch Knowledge base folder content",
		"Something went wrong, failed to get the article": "Something went wrong, failed to get the article",
		"There is no article of that name and path": "There is no article of that name and path"
	},

	...
}
```

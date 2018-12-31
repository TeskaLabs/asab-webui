ASAB WebUI Starter Kit
===

## Start a project

Add this repo as a submodule to your project.

```
$ git init .
$ git submodule add [THIS_REPO]
```

Bootstrap your project with example files.

```
$ rsync -a --ignore-existing ./asab-webui-kit-lite/demo/* .
```

Install dependencies

```
$ yarn install
```

## Run

```
$ yarn start
```

## Build

```
$ yarn build
```

Build for deployment to a specific public url

```
$ yarn build -p https://example.com/app
```

or

```
$ yarn build -c ./conf/example.site.js
```


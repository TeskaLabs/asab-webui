ASAB WebUI Kit Lite
===

ASAB WebUI Kit Lite is a library of webpack build scripts and React components built on top of [CoreUI for React.js](https://coreui.io/react/) and [reactstrap](https://reactstrap.github.io/). It is inspired by the architecture of [ASAB](https://github.com/teskalabs/asab) python project.

## Start a project

Add this repo as a submodule to your project.

```
$ git init .
$ git submodule add https://github.com/TeskaLabs/asab-webui-kit-lite.git
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
$ yarn build --public-url https://example.com/app
```

or

```
$ yarn build -c ./conf/example.site.js
```


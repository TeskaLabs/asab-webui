ASAB Web UI
===========

ASAB Web UI a library of webpack build scripts and React components built on top of [CoreUI for React.js](https://coreui.io/react/) and [reactstrap](https://reactstrap.github.io/).
It is inspired by the architecture of [ASAB](https://github.com/teskalabs/asab) python project.
It is designed primarily for web-based user interfaces for ASAB microservices but it can be used in different architectures as well.


## Quick links

 - https://getbootstrap.com - Bootstrap
 - https://reactstrap.github.io - ReactStrap
 - https://coreui.io/react/demo/#/dashboard - Core UI preview
 - https://github.com/coreui/coreui-react - Core UI for React GitHub


## Unified Features

 - Admin UI template
 - Header
 - Footer
 - Sidebar
 - Alerts
 - Network activity indicator
 - Axios based REST API configuration


## REST API design

TODO ...

```
[ASAB UI App] -- [ HTTP proxy (API_PATH) ] -- [ actual microservices ]
```

TODO: Example of `webpackDevServer` proxy config.

The default `API_PATH` is `api`, it means that it uses the HTTP location of the application itself.



## Start a project

Add this repo as a submodule to your project.

```
$ git init .
$ git submodule add https://github.com/TeskaLabs/asab-webui.git
```

Bootstrap your project with example files.

```
$ rsync -a --ignore-existing ./asab-webui/demo/* .
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
$ yarn build -u https://example.com/app
```

or

```
$ yarn build -c ./conf/example.site.js
```


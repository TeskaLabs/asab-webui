asab-webui-kit
===

A javascript library project with minimum node packages requirements.

## Create an application

To create an asab-webui-kit based application, add `asab-webui-kit` as a submodule.

```
$ git init app
$ cd app
$ git submodule add git@gitlab.teskalabs.int:teskalabs/asab-webui-kit-lite.git
```

Then copy the demo files

```
$ cp -r ./asab-webui-kit-lite/src/demo/* .
$ cp ./asab-webui-kit-lite/package.json .
```

Download Philbert

```
$ wget http://wiki.teskalabs.int/_media/rd/asab/philbert-media-package.zip
$ unzip -d ./public philbert-media-package.zip
$ rm ./philbert-media-package.zip
```

Install dependencies

```
$ npm install
```

### Start application

```
$ npm start
```

### Build application

This will build the application to `./dist`

```
$ npm run build
```

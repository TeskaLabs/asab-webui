# Credentials

`Credentials` is an ASAB WebUI component which converts an array of `credentials_ids` credential ID strings and returns an object mapping these IDs to usernames Nonexisting credential IDs are skipped. Data are then saved to local storage.

## Setup

Before using this component in your project, `react-i18next` and `react-router-dom` must be installed and added into the project's `package.json` file:

```
yarn add react-i18next
yarn add react-router-dom
```

At the moment works ONLY with `apiPath='seacat_auth'`

`credentials_ids` (required, array of strings) - credential ids to be converted
`apiPath` - default (and only working so far) `'seacat_auth'`
`cleanupTime` - in milisecondes, default set to 24 hours `{1000 * 60 * 60 * 24}`

## Example:

```
import React from 'react';
import { Credentials } from 'asab-webui';

    const YourComponent = (props) => {

        ...

		return (
            <>

                ...

                <Credentials 
                    app={props.app} 
                    credentials_ids={['mongodb:ext:618bd4baa2548da08bdcb2e3', 'mongodb:ext:618ced0fe6f6e38ab6a9c8b8']} 
                    apiPath='seacat_auth' 
                    cleanupTime={1000 * 60 * 60 * 24 * 14}
                />
            </>
		)
    } 
```

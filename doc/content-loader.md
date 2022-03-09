#  ASAB WebUI ContentLoader Component

- Customisable content loader component to be used before actual data is rendered
- requires 'react-content-loader' to be installed 

## CellContentLoader

- parameters
	- rows (number / optional), default 1 - decides no. of rows in loader
	- cols (number / optional), default 3 - decides no. of columns in loader
	- title (string / optional), default '' - accepts already translated version
	- backgroundColor (string / optional), default "#E4E5E6" - color of loader's cells, in HEX format
	- foregroundColor (string / optional), default "fff" - color of flare, in HEX format
	- speed (number / optional), default 2 - animation speed in seconds
	- header (boolean / optional), default false - mimics data table's header
	- size (string / optional), default 'lg' - 'lg', 'md' - 'lg' fits bigger sizes (eg. whole screen, large data table)
	- others - all other props accepted by react-content-loader (https://www.npmjs.com/package/react-content-loader#options)

- example:
```js
import React from 'react';
import { CellContentLoader } from 'asab-webui';
import { useTranslation } from 'react-i18next';

const YourComponent = () => {
	const { t } = useTranslation();

	return (
		<CellContentLoader cols={2} rows={6} title={t('Container|Message')}/>
	)
} 
```


## ChartLoader

- Substitues actual data in bar charts
- Chart is created randomly upon every page refresh
- parameters
	- title (string / optional), default '' - accepts already translated version
	- backgroundColor (string / optional), default '#f3f3f3' - color of loader's cells, in HEX format
	- foregroundColor (string / optional), default '#ffffff' - color of flare, in HEX format
	- speed (number / optional), default 2 - animation speed in seconds
	- width (number or string(percentage) / optional), default "100%" - sets max width of the viewbox - default should work best in most cases
	- height (number / optional), default '150' - sets height of the viewbox in px
	- others - all other props accepted by react-content-loader (https://www.npmjs.com/package/react-content-loader#options)
- example:
```js
import React from 'react';
import { ChartLoader } from 'asab-webui';
import { useTranslation } from 'react-i18next';

const YourComponent = () => {
	const { t } = useTranslation();

	return (
		<ChartLoader  title={t('CustomModule|Invalid tenant')}/>
	)
}
```

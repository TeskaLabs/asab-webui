#  ASAB WebUI ContentLoader Component

- Customisable content loader component to be used before actual data is rendered
- requires 'react-content-loader' to be installed 

## CellContentLoader

- parameters
	- rows (number / optional) - decides no. of rows in loader
	- cols (number / optional) - decides no. of columns in loader
	- title (string / optional) - accepts already translated version
	- backgroundColor (string / optional) - color of loader's cells, in HEX format
	- foregroundColor (string / optional) - color of flare, in HEX format
	- speed (number / optional) - animation speed in seconds
	- header (boolean / optional) - mimics data table's header
	- size (string / optional) - 'lg', 'md' - 'lg' fits bigger sizes (eg. whole screen, large data table)
	- others - all other props accepted by react-content-loader (https://www.npmjs.com/package/react-content-loader#options)

- example:
```
import React from 'react';
import { CellContentLoader } from 'asab-webui';
import { useTranslation } from 'react-i18next';

const YourComponent = () => {
	const { t } = useTranslation();

	return (
		<CellContentLoader cols={2} row={6} title={t('Container|Message')}/>
	)
} 
```


## ChartLoader

- Substitues actual data in bar charts
- Chart is created randomly upon every page refresh
- parameters
	- title (string / optional) - accepts already translated version
	- backgroundColor (string / optional) - color of loader's cells, in HEX format (#f3f3f3)
	- foregroundColor (string / optional) - color of flare, in HEX format (#ffffff)
	- speed (number / optional) - animation speed in seconds
	- width (number or string(percentage) / optional) - sets max width of the viewbox - default 100%, should work best in most cases
	- height (number / optional) - sets height of the viewbox
	- others - all other props accepted by react-content-loader (https://www.npmjs.com/package/react-content-loader#options)
- example:
```
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
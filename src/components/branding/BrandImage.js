/* Using getBrandImage

- GetBrandImage function returns a brandImage object, based on theme.

- Under the hood, the function uses BrandingService. This service determines correct configuration tu use (dynamic, static, or default).
Then, if selected configuration's brand image is not complete (e.g. minimized variation is missing), it substitutes missing variations.

`getBrandImage(props, theme, type);`
	params:
		* props
		* theme ('light' || 'dark')
		* type (optional, default is 'brandImage') - determines content - either for brand Image (in header) or for company branding in the bottom of the sidebar

	return example
	`{
		full: 'path/to/logo-light-full',
		minimized: 'path/to/logo-light-minimized',
		href: '/subpath'
	}`

	Example:

	```javascript
		import { useState, useEffect } from 'react';
		import { getBrandImage } from 'asab-webui';
		import { useSelector } from 'react-redux';

		const YourCode = (props) => {
			const [ brandImage, setBrandImage ] = useState({});
			const theme = useSelector(state => state.theme);

			useEffect(() => {
				setBrandImage(getBrandImage(props, theme));
			}, [theme]);

			...

			return (
				<>

				...

					<img src={brandImage?.full}/>

				...

				</>
			)
		};

		export default YourCode

	```
*/

export function getBrandImage(props, theme='light', type="brandImage") {

	const BrandingService = props.app.Services.BrandingService;
	let brandImage;

	if (BrandingService && theme) {
		brandImage = BrandingService.getLogo(theme, type);
	}

	return brandImage;
};

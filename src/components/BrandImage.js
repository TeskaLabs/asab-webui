/*
	getBrandImage function returns a brandImage object based on theme.

	usage:
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

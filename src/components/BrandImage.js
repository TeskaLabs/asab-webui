export function getBrandImage(props, theme='light', type="brandImage") {

	const BrandingService = props.app.Services.BrandingService;
	let brandImage;

	if (BrandingService && theme) {
		brandImage = BrandingService.getLogo(theme, type);
	}

	return brandImage;
};

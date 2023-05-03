import { useEffect } from "react";
import { useSelector } from "react-redux";

export function getBrandImage (props) {
    const theme = useSelector(state => state?.theme);
	const BrandingService = props.app.Services.BrandingService;
	let brandImage;

	useEffect(() => {
		if (BrandingService && theme) {
			brandImage = BrandingService.getLogo(theme, 'sidebarLogo');
		}
	}, [theme]);

    return brandImage;
};

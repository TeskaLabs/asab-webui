import Module from "asab-webui/abc/Module";

export default class BrandingModule extends Module {
	constructor(app, name) {
		super(app, "BrandingModule");

		const HeaderService = app.locateService("HeaderService");
		HeaderService.setBrandImages(
		{
			src: "media/logo/header-full.svg",
			width: 120,
			height: 30,
			alt: "LogMan.io"
		},
		{
			src: "media/logo/header-minimized.svg",
			width: 30,
			height: 30,
			alt: "LogMan.io"
		});

		const FooterService = app.locateService("FooterService");
		FooterService.setFooterImage({
			src: "media/logo/footer.svg",
			width: 120,
			height: 16,
			alt: "Created by TeskaLabs Ltd",
			href: "https://teskalabs.com/",
		});

	}
}

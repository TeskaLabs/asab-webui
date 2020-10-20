import React from 'react';
import { connect } from 'react-redux';
import { AppFooter } from '@coreui/react';


export function Footer(props) {

	let FooterService = props.app.locateService("FooterService");
	let siteFooterImage = props.app.Config.get("footer_image");

	let footerImage = props.footer_image.src;
	let footerImageAlt = props.footer_image.alt;
	let footerImageHref = props.footer_image.href;

	if (siteFooterImage !== undefined) {
		if (siteFooterImage.src !== undefined && siteFooterImage.src.length !== 0) {
			footerImage = siteFooterImage.src
		}
		if (siteFooterImage.alt !== undefined && siteFooterImage.alt.length !== 0) {
			footerImageAlt = siteFooterImage.alt
		}
		if (siteFooterImage.href !== undefined && siteFooterImage.href.length !== 0) {
			footerImageHref = siteFooterImage.href
		}
	}

	return (
		<AppFooter>

			{FooterService.Items.map((item, idx) => (
				<item.component key={idx} {...item.componentProps} app={props.app}/>
			))}

			<span className="ml-auto">
				<a target="_blank" href={footerImageHref}>
					<img
						height={16}
						width={120}
						alt={footerImageAlt}
						src={footerImage}
					/>
				</a>
			</span>

		</AppFooter>
	);

}

function mapStateToProps(state) {
	return { footer_image: state.config.footer_image }
}

export default connect(mapStateToProps)(Footer);

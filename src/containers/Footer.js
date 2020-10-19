import React, { useState }  from 'react';
import { connect } from 'react-redux';
import { AppFooter } from '@coreui/react';
import axios from 'axios';


/*
	Example of use branding configuration from site:

	Site config file:

	{"branding": "path/to/the/configuration/file.json"}


	JSON file with configuration:

	{
		"footer_image": {
			"src": "path/outside/of/project/header-full.svg",
			"alt": "Created by FooBar",
			"href": "http://foobar.fb"
		}
	}

*/


export function Footer(props) {

	let FooterService = props.app.locateService("FooterService");

	// Get header branding from site
	let branding_url = props.app.Config.get("branding");
	// Set state for footer images
	const [siteFooterImageSrc, setSiteFooterImageSrc] = useState(props.footer_image.src);
	const [siteFooterImageAlt, setSiteFooterImageAlt] = useState(props.footer_image.alt);
	const [siteFooterImageHref, setSiteFooterImageHref] = useState(props.footer_image.href);
	// Check on undefined configuration
	if (branding_url !== undefined) {
		axios.get(branding_url).then(response => {
			if (response.data.footer_image !== undefined) {
				if (response.data.footer_image.src !== undefined) {
					setSiteFooterImageSrc(response.data.footer_image.src);
				}
				if (response.data.footer_image.alt !== undefined) {
					setSiteFooterImageAlt(response.data.footer_image.alt);
				}
				if (response.data.footer_image.href !== undefined) {
					setSiteFooterImageHref(response.data.footer_image.href);
				}
			}
		})
		.catch(error => {console.log(error)})
	}

	return (
		<AppFooter>

			{FooterService.Items.map((item, idx) => (
				<item.component key={idx} {...item.componentProps} app={props.app}/>
			))}

			<span className="ml-auto">
				<a target="_blank" href={siteFooterImageHref}>
					<img
						height={16}
						width={120}
						alt={siteFooterImageAlt}
						src={siteFooterImageSrc}
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

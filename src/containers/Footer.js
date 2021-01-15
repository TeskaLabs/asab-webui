import React from 'react';
import { connect } from 'react-redux';
import { AppFooter } from '@coreui/react';

export function Footer(props) {

	let FooterService = props.app.locateService("FooterService");

	return (
		<AppFooter>
			{FooterService.Items.map((item, idx) => (
				<item.component key={idx} {...item.componentProps} app={props.app}/>
			))}

			<span className="ml-auto">
				{ props.footer_image.secondImage &&
					<>
						<a target="_blank" href={props.footer_image.secondImage.href}>
							<img
								height={16}
								width={120}
								alt={props.footer_image.alt}
								src={props.footer_image.secondImage.src}
							/>
						</a>
						<span>|</span>
					</>
				}
				<a target="_blank" href={props.footer_image.href}>
					<img
						height={16}
						width={120}
						alt={props.footer_image.alt}
						src={props.footer_image.src}
					/>
				</a>
			</span>

		</AppFooter>
	);

}

function mapStateToProps(state) {
	let footerImage = !state.config.brand_image?.full ? 
		state.config.footer_image : {
			...state.config.footer_image,
			secondImage:  {
				src: state.config.default_brand_image.full,
				href: state.config.default_brand_image.href,
			},
		};

	return { footer_image: footerImage }
}

export default connect(mapStateToProps)(Footer);

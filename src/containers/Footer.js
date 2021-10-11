import React from 'react';
import { connect } from 'react-redux';

export function Footer(props) {

	let FooterService = props.app.locateService("FooterService");

	const withSidebar = props.app.props.hasSidebar !== false && props.isSidebarOpen ? "-with-sidebar" : "",
		isMinimized = props.isSidebarOpen && props.isSidebarMinimized ? "-minimized" : "";

	return (
		<footer className={`application-footer${withSidebar}${isMinimized}`}>
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

		</footer>
	);

}

function mapStateToProps(state) {
	return {
		footer_image: state.config.footer_image,
		isSidebarMinimized: state.sidebar.isSidebarMinimized,
		isSidebarOpen: state.sidebar.isSidebarOpen
	};
}

export default connect(mapStateToProps)(Footer);

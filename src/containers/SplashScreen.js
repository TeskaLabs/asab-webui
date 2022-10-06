import React from 'react';
import { connect } from 'react-redux';

function SplashScreen(props) {
	
	return (
		<div className="text-center animated fadeIn w-100">
			{props.brand_image != null ?
			<img
				className="splash-screen-img"
				src={props.brand_image.full}
				alt={props.title}
			/>
			:
			<h1 className="splash-screen-title">Loading ...</h1>
			}
			<div className="progress splash-screen-progress">
				<div
					className="progress-bar progress-bar-animated progress-bar-striped w-100" >
				</div>
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		brand_image: state.config.brand_image?.full ? state.config.brand_image : state.config.default_brand_image,
		title: state.config.title,
	}
}

export default connect(mapStateToProps)(SplashScreen);

import React from 'react';
import { connect } from 'react-redux';

function SplashScreen(props) {
	console.log(props, props.brand_image, "props");
	
	return (
		<div className="text-center animated fadeIn w-100" style={{margin: "20% auto 0"}}>
			{props.brand_image != null ?
			<img
				src={props.brand_image.full}
				alt={props.title}
				style={{maxWidth: "38%"}}
			/> : <h1>Loading ...</h1>}
			<div className="progress mt-3" style={{maxWidth: "38%", margin: "20px auto 0 auto"}}>
				<div
					style={{width: "100%"}}
					className="progress-bar progress-bar-animated progress-bar-striped" >
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

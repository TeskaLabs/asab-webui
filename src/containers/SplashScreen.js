import React from 'react';
import { connect } from 'react-redux';

function SplashScreen(props) {
	
	return (
		<div className="text-center animated fadeIn w-100">
			{props.brand_image != null ?
			<img
				src={props.brand_image.full}
				alt={props.title}
				style={{width: "38%", position: "absolute", bottom: '60%', left: '50%', transform: 'translate(-50%, 0)'}}
			/>
			:
			<h1 style={{position: "absolute", bottom: '60%', left: '50%', transform: 'translate(-50%, 0)'}}>Loading ...</h1>
			}
			<div className="progress" style={{width: "38%", margin: "20px auto 0 auto", position: "absolute", top: '40%', left: '50%', transform: 'translate(-50%, -41%)'}}>
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

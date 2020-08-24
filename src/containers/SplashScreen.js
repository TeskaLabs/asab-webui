import React, { Component } from 'react';

class SplashScreen extends React.Component {

	constructor(props) {
		super(props);

		this.App = props.app;
		this.HeaderService = this.App.locateService("HeaderService");
	}

	render() {
		return (
			<div className="text-center" style={{marginTop: "20%"}}>
				<img src={this.HeaderService.BrandImageFull.src} style={{maxWidth: "38%"}} />
				<div style={{maxWidth: "38%", height: "8px", margin: "20px auto 0 auto"}}className="progress-bar progress-bar-animated progress-bar-striped" ></div>
			</div>
		);
	}
}

export default SplashScreen;

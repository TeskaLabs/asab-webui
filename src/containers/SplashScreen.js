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
				<div className="text-center" style={{marginTop: "20px"}}>
					Loading ...
				</div>
			</div>
		);
	}
}

export default SplashScreen;

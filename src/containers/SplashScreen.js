import React from 'react';

function SplashScreen(props) {

	let header_service = props.app.locateService("HeaderService");
	
	return (
		<div className="text-center animated fadeIn" style={{marginTop: "20%"}}>
			<img
				src={header_service.BrandImageFull.src}
				style={{maxWidth: "38%"}}
			/>
			<div
				style={{maxWidth: "38%", height: "8px", margin: "20px auto 0 auto"}}
				className="progress-bar progress-bar-animated progress-bar-striped" >
			</div>
		</div>
	);
}

export default SplashScreen;

import React from 'react';

function SplashScreen(props) {

	let header_service = props.app.locateService("HeaderService");
	
	return (
		<div className="text-center animated fadeIn" style={{marginTop: "20%"}}>
			<img
				src={header_service.BrandImageFull.src}
				style={{maxWidth: "38%"}}
			/>
			<div className="progress mt-3" style={{maxWidth: "38%", margin: "20px auto 0 auto"}}>
				<div
					style={{width: "100%"}}
					className="progress-bar progress-bar-animated progress-bar-striped" >
				</div>
			</div>
		</div>
	);
}

export default SplashScreen;

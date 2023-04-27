import React from 'react';
import { useSelector, connect } from 'react-redux';

function SplashScreen(props) {
	
	const title = useSelector(state => state.config?.title);
	const brandImage = useSelector(state => state.config.brandImage?.light?.full ? state.config.brandImage.light : state.config.defaultBrandImage);

	return (
		<div className="text-center animated fadeIn w-100">
			{brandImage != null ?
			<img
				className="splash-screen-img"
				src={brandImage?.full}
				alt={title}
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

export default SplashScreen;

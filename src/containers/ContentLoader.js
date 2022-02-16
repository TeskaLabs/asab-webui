import React from 'react';
import ContentLoader from "react-content-loader";

export function ChartLoader({
	title = 'Loading Data', backgroundColor = "#f3f3f3", 
	foregroundColor = "#ecebeb", speed = 1.2, width = "100%", 
	height = 150 }, props
	) {

	let rectangleQty = new Array(55).fill(1);

	return (
		<ContentLoader 
			title={title}
			speed={speed}
			width={width}
			height={height}
			viewBox={`0 0 ${width} ${height}`}
			backgroundColor={backgroundColor}
			foregroundColor={foregroundColor}
			{...props}
		>
		{rectangleQty.map((el, i) =>  {
			let rand = Math.floor(Math.random() * (height * 0.7))
				return (
					<rect 
						x={20 * i} 
						y={rand} 
						rx="5" 
						ry="5" 
						width="10" 
						height={height-rand} 
						key={i}
					/> 
				)
		})}
		</ContentLoader>
	);
}

export function CellContentLoader({
	rows = 10, cols = 4, title = 'Loading Data', 
	backgroundColor = "#E4E5E6", foregroundColor = "#ffffff", speed = 1.2, 
	header = true, size = 'lg' }, props) {

	let rectangles = [],
		width = size === 'lg' ? 900 : 400,
		headRect = [
			[0, 0, width, 17],
			[0, 35, width, 17]
		],
		y = -10;

 	if (header) {
		y = 50
	}
	let viewBox = `0, 0, ${width}, ${y + (rows * 60)}`;

	for (let i = 0; i < rows ; i++){
		if(cols === 1) {
			rectangles.push(
				[width*0.05 , y + 20 + (i * 55), width*0.9 , 15]
			)
			headRect.push(
				[0, 12, width * 0.15, 33],
				[width*0.85, 12, width * 0.15, 33]
			)
		}
		if(cols === 2) {
			rectangles.push(
				[width*0.05 , y + 20 + (i * 55), width*0.425 , 15],
				[width*0.525 , y + 20 + (i * 55), width*0.425 , 15],
				[width*0.01, y + (i * 55), width*0.98, 2]
			)
			headRect.push(
				[0, 12, width * 0.1, 33],
				[width*0.4, 12, width * 0.2, 33],
				[width*0.9, 12, width * 0.15, 33],
			)
		}
		if(cols === 3) {
			rectangles.push(
				[width*0.05 , y + 20 + (i * 55), width*0.85/3 , 15],
				[width*(0.85/3 + 0.075) , y + 20 + (i * 55), width*0.85/3 , 15],
				[width*(0.85/3*2 + 0.1) , y + 20 + (i * 55), width*0.85/3 , 15],
				[width*0.01, y + (i * 55), width*0.98, 2]
			)
			headRect.push(
				[0, 12, width * 0.1, 33],
				[width*(0.85/3), 12, width * 0.125, 33],
				[width*(0.85/3 * 2 + 0.025), 12, width * 0.125, 33],
				[width*0.9, 12, width * 0.15, 33],
			)
		}
		if(cols === 4) {
			rectangles.push(
				[width*0.05 , y + 20 + (i * 55), width*0.85/4, 15], 
				[width*(0.825/4 + 0.075), y + 20 + (i * 55), width*0.825/4, 15], 
				[width*(0.825/4*2 + 0.1), y + 20 + (i * 55), width*0.825/4, 15], 
				[width*(0.825/4*3 + 0.125), y + 20 + (i * 55), width*0.825/4, 15], 
				[width*0.01, y + (i * 55), width*0.98, 2]
			);
			headRect.push(
				[0, 12, width * 0.1, 33],
				[width*(0.825 / 4) , 12, width * 0.125, 33],
				[width*(0.825 / 4 * 2 + 0.025) , 12, width * 0.125, 33],
				[width*(0.825 / 4 * 3 + 0.05) , 12, width * 0.125, 33],
				[width*(0.825 + 0.075) , 12, width * 0.125, 33],
			)
		}
		if(cols === 5) {
			rectangles.push(
				[width*0.05 , y + 20 + (i * 55), width*0.85/5, 15], 
				[width*(0.8/5 + 0.075), y + 20 + (i * 55), width*0.8/5, 15], 
				[width*(0.8/5*2 + 0.1), y + 20 + (i * 55), width*0.8/5, 15], 
				[width*(0.8/5*3 + 0.125), y + 20 + (i * 55), width*0.8/5, 15],
				[width*(0.8/5*4 + 0.155), y + 20 + (i * 55), width*0.8/5, 15],
				[width*0.01, y + (i * 55), width*0.98, 2]
			);
			headRect.push(
				[0, 12, width * 0.075, 33],
				[width*(0.75 / 5 + 0.05) , 12, width * 0.05, 33],
				[width*(0.75 / 5 * 2 + 0.0825) , 12, width * 0.05, 33],
				[width*(0.825 / 5 * 3 + 0.075) , 12, width * 0.05, 33],
				[width*(0.825 / 5 * 4 + 0.095) , 12, width * 0.05, 33],
				[width*(0.825 + 0.115) , 12, width * 0.075, 33],
			)
		}
	}

	return (
		<ContentLoader
			title={title}
			speed={speed}
			viewBox={viewBox}
			backgroundColor={backgroundColor}
			foregroundColor={foregroundColor}
			animate={true}
			{...props}
		>
		{header &&
			headRect.map((rectangle, i) => {
				return (
					<rect 
						x={rectangle[0]} 
						y={rectangle[1]} 
						rx="3" 
						ry="3" 
						width={rectangle[2]} 
						height={rectangle[3]} 
						key={i} 
					/>
				)
			})
		} 			
		{rectangles.map((rectangle, i) => {
			return (
				<rect 
					x={rectangle[0]} 
					y={rectangle[1]} 
					rx="3" 
					ry="3" 
					width={rectangle[2]} 
					height={rectangle[3]} 
					key={i} 
				/>
			)
		})
		}  
		</ContentLoader> 
	);
};
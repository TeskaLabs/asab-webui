import React from 'react';
import ContentLoader from "react-content-loader";

export function MyContentLoader({rows = 10, title = 'Loading Data',
    backgroundColor = "#E4E5E6", foregroundColor = "#ffffff", speed = 1.2 }, props) {

    let rectangles = [], 
        circles = [],

        viewBox = `0, 0, 910, ${50+(rows*60)}`;

    for (let i = 0; i < rows ; i++){
        rectangles.push([53, 75+(i*60), 141, 15], 
                        [253, 75+(i*60), 299, 15], 
                        [610, 75+(i*60), 141, 15],
                        [4, 50+(i*60), 897, 2]
                    );
        circles.push([829, 80+(i*60)], 
                     [863, 80+(i*60)]
                    );
    }
    
	return (
        <>
            <ContentLoader
                title={title}
                speed={speed}
                viewBox={viewBox}
                backgroundColor={backgroundColor}
                foregroundColor={foregroundColor}
                {...props}
                >
            {/* table header */}
                <rect x="0" y="0" rx="3" ry="3" width="906" height="17" /> 
                <rect x="0" y="35" rx="3" ry="3" width="906" height="17" />
                <rect x="0" y="12" rx="3" ry="3" width="68" height="33" />
                <rect x="171" y="10" rx="3" ry="3" width="149" height="33" />
                <rect x="493" y="10" rx="3" ry="3" width="137" height="33" />
                <rect x="731" y="10" rx="3" ry="3" width="72" height="33" />
                <rect x="882" y="10" rx="3" ry="3" width="24" height="33" />
            {/* table header end */}
            
                {
                    rectangles.map((rectangle) => {
                        return (
                            <rect x={rectangle[0]} y={rectangle[1]} rx="3" ry="3" width={rectangle[2]} height={rectangle[3]} />
                        )
                    })
                }
                {
                    circles.map((circ) => {
                        return (
                            <circle cx={circ[0]} cy={circ[1]} r="11" />
                        )
                    })
                }
            </ContentLoader>

        </>
	);
}

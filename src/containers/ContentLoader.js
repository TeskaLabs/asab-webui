import React from 'react';
import ContentLoader from "react-content-loader";

// export function MyContentLoader({rows = 7, title = 'Loading Data',
//     backgroundColor = "#E4E5E6", foregroundColor = "#ffffff", speed = 1.2, header = false }, props) {

//     let rectangles = [], 
//         circles = [],
//         y = -10,
//         viewBox = `0, 0, 910, ${y + (rows * 60)}`;
    
//     if (header) {
//         y = 50
//     }

//     for (let i = 0; i < rows ; i++){
//         rectangles.push([53, y + 25 + (i * 60), 141, 15], 
//                         [253, y + 25 + (i * 60), 299, 15], 
//                         [610, y + 25 + (i * 60), 141, 15],
//                         [4, y + (i * 60), 897, 2]
//                     );
//         circles.push([829, y + 30 + (i * 60)], 
//                      [863, y + 30 + (i * 60)]
//                     );
//     }
// 	return (
//             <ContentLoader
//                 title={title}
//                 speed={speed}
//                 viewBox={viewBox}
//                 backgroundColor={backgroundColor}
//                 foregroundColor={foregroundColor}
//                 animate={false}
//                 {...props}
//                 >
//             {header && 
//                 <>
//                     <rect x="0" y="0" rx="3" ry="3" width="906" height="17" /> 
//                     <rect x="0" y="35" rx="3" ry="3" width="906" height="17" />
//                     <rect x="0" y="12" rx="3" ry="3" width="68" height="33" />
//                     <rect x="171" y="10" rx="3" ry="3" width="149" height="33" />
//                     <rect x="493" y="10" rx="3" ry="3" width="137" height="33" />
//                     <rect x="731" y="10" rx="3" ry="3" width="72" height="33" />
//                     <rect x="882" y="10" rx="3" ry="3" width="24" height="33" />
//                 </>
//             } 
//                 {
//                     rectangles.map((rectangle) => {
//                         return (
//                             <rect x={rectangle[0]} y={rectangle[1]} rx="3" ry="3" width={rectangle[2]} height={rectangle[3]} />
//                         )
//                     })
//                 }
//                 {
//                     circles.map((circ) => {
//                         return (
//                             <circle cx={circ[0]} cy={circ[1]} r="11" />
//                         )
//                     })
//                 }
//             </ContentLoader> 
// 	);
// };

export function ChartLoader({title = 'Loading Data', backgroundColor = "#f3f3f3", 
    foregroundColor = "#ecebeb", speed = 1.2, width = "100%", height = 150 }, props) {

    let rectangleQty = new Array(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1);

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

                {
                    rectangleQty.map((el, i) =>  {
                        let rand = Math.floor(Math.random() * (height * 0.7))
                        return (
                            <rect x={20 * i} y={rand} rx="5" ry="5" width="10" height={height-rand} key={i}/> 
                        )
                    })
                }
            </ContentLoader>
	);
}

export function MyContentLoader({rows = 10, title = 'Loading Data', cols = 4,
    backgroundColor = "#E4E5E6", foregroundColor = "#ffffff", speed = 1.2, header = false }, props) {

    let rectangles = [], 
        circles = [],
        y = -10;

    if (header) {
        y = 50
    }
    let viewBox = `0, 0, 910, ${y + ((rows - 1) * 60)}`;

    for (let i = 0; i < rows ; i++){
        if(cols === 1) {
            rectangles.push([53, y + 25 * (i * 60), 700, 15],
                            [4, y + (i * 60), 897, 2]
                        );
        }
        if(cols === 4) {
            rectangles.push([53, y + 20 + (i * 55), 141, 15], 
                            [253, y + 20 + (i * 55), 299, 15], 
                            [610, y + 20 + (i * 55), 141, 15],
                            [4, y + (i * 55), 897, 2]
                        );
            circles.push([829, y + 30 + (i * 55)], 
                         [863, y + 30 + (i * 55)]
                        );
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
                <>
                    <rect x="0" y="0" rx="3" ry="3" width="906" height="17" /> 
                    <rect x="0" y="35" rx="3" ry="3" width="906" height="17" />
                    <rect x="0" y="12" rx="3" ry="3" width="68" height="33" />
                    <rect x="171" y="10" rx="3" ry="3" width="149" height="33" />
                    <rect x="493" y="10" rx="3" ry="3" width="137" height="33" />
                    <rect x="731" y="10" rx="3" ry="3" width="72" height="33" />
                    <rect x="882" y="10" rx="3" ry="3" width="24" height="33" />
                </>
            } 
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
	);
};
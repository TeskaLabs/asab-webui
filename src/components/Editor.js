import React, { useEffect, useState, useRef } from 'react';

import MonacoEditor from 'react-monaco-editor';

const Editor = ({ width, height, id, ...props }) => {
	const [countedWidth, setCountedWidth] = useState("100%");
	const [countedHeight, setCountedHeight] = useState("100%");
	const divRef = useRef(null);

	useEffect(() => {
		setCountedWidth(divRef.current.offsetWidth);
		setCountedHeight(divRef.current.offsetHeight);

		divRef.current.addEventListener("resize", updateSize);

		return () => {
			divRef.current.removeEventListener("resize", updateSize);
		}
	}, [divRef])

	const updateSize = () => {
		setCountedWidth(divRef.current.offsetWidth);
		setCountedHeight(divRef.current.offsetHeight);
	};

	return (
		<div
			ref={divRef}
			style={{
				width: width ?? "100%",
				height: height ?? "100%"
			}}
		>
			<MonacoEditor
				width={countedWidth}
				height={countedHeight}
				{...props}
			/>
		</div>
	)
}

export default Editor;
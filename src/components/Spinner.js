import React from 'react';

export function Spinner() {
	return (
		<div className='loading-spinner-div'>
			<img className='loading-spinner'
				src="media/spinner/spinner.gif"
				style={{ width: '5em', margin: 'auto', display: 'block' }}
				alt="Loading…"
			/>
		</div>
	);
}

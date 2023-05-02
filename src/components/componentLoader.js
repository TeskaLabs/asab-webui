/*
	Component loader helps to prevent lazy loading failures on cached browsers
	causing ChunkLoad error. The ChunkLoad error will appear only in case the path
	to the container was not found after 3 attempts per 1.5s intervals (usually the
	container does not exist then) and only after that the ChunkLoad error is displayed.

	Usage within index.js files where routes are being set

	```
	import { lazy } from 'react';
	import { componentLoader } from "asab-webui";
	const SomeContainer = lazy(() => componentLoader(() => import("./containers/SomeContainer")));

	```
*/

/*
	TODO: Review componentLoader if it is needed after containerisation to microfrontends
	and eventually remove
*/
export const componentLoader = (lazyComponent, attempts = 3, interval = 1500) => {
	// Cover unwanted lazyComponent error in console
	if (typeof lazyComponent !== 'function') {
		return;
	}
	return new Promise((resolve, reject) => {
		lazyComponent()
			.then(resolve)
			.catch((error) => {
				/*
					If not resolved, recursively check if the container is present
					until it reach the maximum limit of attempts
				*/
				setTimeout(() => {
					if (attempts === 1) {
						reject(error);
						return;
					}
					componentLoader(lazyComponent, attempts - 1, interval).then(
						resolve,
						reject
					);
				}, interval);
			});
	});
};

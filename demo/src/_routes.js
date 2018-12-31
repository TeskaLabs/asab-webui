import HomeContainer from './containers/HomeContainer'

const routes =  [
	{
		path: '/',
		exact: true,
		component: HomeContainer,
		fetchInitialData: (request) => {
			return fetchItems()
		}
	},
]

export default routes

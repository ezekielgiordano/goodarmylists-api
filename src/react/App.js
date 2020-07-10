import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import GamesContainer from './GamesContainer'
import KowOuterContainer from './kow/containers/KowOuterContainer'
import WmrOuterContainer from './wmr/containers/WmrOuterContainer'

const App = props => {
	return (
		<HashRouter>
			<Route path='/' exact component={GamesContainer} />
			<Route path='/kow' exact component={KowOuterContainer} />
			<Route path='/wmr' exact component={WmrOuterContainer} />				
		</HashRouter>
	)
}

export default App
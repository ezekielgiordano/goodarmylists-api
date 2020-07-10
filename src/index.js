import sword from './assets/images/sword.ico'
import React from 'react'
import ReactDOM from 'react-dom'
import Favicon from 'react-favicon'
import App from './react/App'

document.addEventListener('DOMContentLoaded', () => {
	let page =
		<div>
			<Favicon url={sword} />
			<App />
		</div>
	let app = document.getElementById('app')
	ReactDOM.render(page, app)
})
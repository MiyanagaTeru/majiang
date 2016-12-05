import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducers'
import App from './components/App'
// import bootstrap from './bootstrap'

let store = createStore(
	reducers,
	compose(
		applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)
)

// uncomment bootstrap if neccessary
// bootstrap(store).then(
render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)
// )

import React from 'react'

import Paixing from './Paixing'
import Result from './Result'
import styles from '../css/app.css'

class App extends React.Component {
	render () {
		return (
			<div>
				<Paixing/>
				<Result/>
			</div>
		)
	}
}

export default App

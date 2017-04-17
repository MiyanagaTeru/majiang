import { combineReducers } from 'redux'
// import individual reducers here
import paixing from './paixing'
import results from './results'

const reducers = combineReducers({
// individual reducers
	paixing,
	results
})

export default reducers;
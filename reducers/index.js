import { combineReducers } from 'redux'
// import individual reducers here
import paixing from './paixing'
import results from './results'
import elementStatus from './elementStatus'

const reducers = combineReducers({
// individual reducers
	paixing,
	results,
	elementStatus
})

export default reducers;
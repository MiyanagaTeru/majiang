import calculating from '../utils/calculating'

const initialState = {
	title: '',
	yizhong: [],
	points: 0
}

const results = (state=initialState, action) => {
	switch (action.type) {
		case 'CALC_POINTS':
			return calculating(action.paixing)
			break
		case 'RESET_FORM':
			return initialState
			break
		default:
			return state;
	}
}


export default results;
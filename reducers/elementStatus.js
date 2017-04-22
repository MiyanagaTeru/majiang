const elementStatus = (state={}, action) => {
	switch (action.type) {
		case 'UPDATE_ESTATUS':
			return {...state, [action.element]: action.status}
			break
		default:
			return state;
	}
}

export default elementStatus;
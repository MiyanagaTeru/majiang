const paixing = (status=[], action) => {
	switch (action.type) {
		case 'UPDATE_PAIXING':
			return [
				{'m': action.m},
				{'p': action.p},
				{'s': action.s},
				{'z': action.z}
			];
		default:
			return status;
	}
}


export default paixing;
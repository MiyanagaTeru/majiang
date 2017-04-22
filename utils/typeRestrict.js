const only = (type, input) => {
	switch (type) {
		case 'number':
			return !(input.match(/[^0-9]/))
			break
		case 'letter':
			return !(input.match(/[^a-z]/))
			break
		default:
			return true
	}
}

export default only
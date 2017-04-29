const initialState = {
	m: '', //万
	p: '', //饼
	s: '', //条
	f: '', //风
	z: '', //三元牌
	fulu: false,
	fm: '', //万
	fp: '', //饼
	fs: '', //条
	ff: '', //风
	fz: '', //三元牌
	changfeng: '',
	zifeng: '',
	benchang: 0
}
const paixing = (state=initialState, action) => {
	switch (action.type) {
		case 'UPDATE_PAIXING':
			if (action.key === 'fulu' && action.value === false) {
				return {
					...state,
					[action.key]: action.value,
					...{
						fm: '',
						fp: '',
						fs: '',
						ff: '',
						fz: ''
					}
				}
			} else {
				return {
					...state,
					[action.key]: action.value
				}
			}
		case 'RESET_FORM':
			return initialState
			break
		default:
			return state;
	}
}


export default paixing;
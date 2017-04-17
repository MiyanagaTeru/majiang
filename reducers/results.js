const results = (status={}, action) => {
	switch (action.type) {
		case 'CALC_POINTS':
			return {
				yizhong: ['国士无双'],
				fushu: '-',
				fanshu: '-',
				title: '役满',
				points: '32000'
			}
		default:
			return status;
	}
}


export default results;
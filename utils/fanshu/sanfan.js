const sanfan = (paixing, zPaixing) => {
	const {
		zm,
		zp,
		zs,
		all
	} = zPaixing

	let fanshu = 0
	let yizhong = []

	// 混一色
	const hunyise = zPaixing =>
		(zPaixing.all.filter(obj => obj.huase === 'm' || obj.huase === 'f' || obj.huase === 'z').length === zPaixing.all.length) ||
		(zPaixing.all.filter(obj => obj.huase === 'p' || obj.huase === 'f' || obj.huase === 'z').length === zPaixing.all.length) ||
		(zPaixing.all.filter(obj => obj.huase === 's' || obj.huase === 'f' || obj.huase === 'z').length === zPaixing.all.length)

	if (hunyise(zPaixing)) {
		if (all.find(obj => obj.huase === 'f' || obj.huase === 'z')) {
			if (!paixing.fulu) {
				fanshu += 3
				yizhong.push('混一色')
			} else {
				fanshu += 2
				yizhong.push('混一色')
			}
		} else {
			if (!paixing.fulu) {
				fanshu += 6
				yizhong.push('清一色')
			} else {
				fanshu += 5
				yizhong.push('清一色')
			}
		}
	}

	// 纯全带幺九，在两翻那里写过了

	// 二杯口
	const findyibeikou = zm => {
		const shunzis = zm.filter(obj => obj.type === 'shunzi')
		let found = 0
		for (let i = 0; i < shunzis.length - 1; i++) {
			if (shunzis[i].value === shunzis[i+1].value) {
				found++
			}
		}
		return found
	}

	if (!paixing.fulu && findyibeikou(zm) + findyibeikou(zp) + findyibeikou(zs) === 2) {
		fanshu += 3
		yizhong.push('二杯口')
	}

	return {
		fanshu,
		yizhong
	}
}

export default sanfan
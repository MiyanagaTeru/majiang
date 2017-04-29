const liangfan = (paixing, zPaixing) => {
	const {
		m, //万
		p, //饼
		s, //条
		f, //风
		z, //三元牌
		fulu, //副露
		fm, //万
		fp, //饼
		fs, //条
		ff, //风
		fz, //三元牌
		lizhi,
		wlizhi,
		yifa,
		zimo,
		changfeng,
		zifeng,
		bm,
		bp,
		bs,
		bf,
		bz
	} = paixing

	const {
		zm,
		zp,
		zs,
		zf,
		zz,
		all
	} = zPaixing

	let fanshu = 0
	let yizhong = []

	// 三色同顺
	const findSanse = (zm, zp, zs, m, p, s) => {
		const mmianzi = zm.filter(obj=>obj.type==='shunzi')
		const pmianzi = zp.filter(obj=>obj.type==='shunzi')
		const smianzi = zs.filter(obj=>obj.type==='shunzi')

		const findfindSanse = (mmianzi, p, s) =>
			mmianzi.length === 1 && p.indexOf(mmianzi[0].value) > -1 && s.indexOf(mmianzi[0].value) > -1

		if (mmianzi.length === 0 || pmianzi.length === 0 || smianzi.length === 0) {
			return false
		} else {
			return findfindSanse(mmianzi, p, s) || findfindSanse(pmianzi, m, s) || findfindSanse(smianzi, m, p)
		}
	}
	if (findSanse(zm, zp, zs, m, p, s)) {
		if (!fulu) {
			fanshu += 2
		} else {
			fanshu ++
		}
		yizhong.push('三色同顺')
	}

	// 三色同刻
	const findSanseKe = (zm, zp, zs, m, p, s, fm, fp, fs) => {
		const mkezi = zm.filter(obj=>obj.type==='kezi' || obj.type==='gangzi')
		const pkezi = zp.filter(obj=>obj.type==='kezi' || obj.type==='gangzi')
		const skezi = zs.filter(obj=>obj.type==='kezi' || obj.type==='gangzi')

		const findfindSanseKe = (mkezi, p, s, fp, fs) =>
			mkezi.length === 1 && `${p}${fp}`.indexOf(mkezi[0].value.split('')[0].repeat(3)) > -1 && `${s}${fs}`.indexOf(mkezi[0].value.split('')[0].repeat(3)) > -1

		if (mkezi.length === 0 || pkezi.length === 0 || skezi.length === 0) {
			return false
		} else {
			return findfindSanseKe(mkezi, p, s, fp, fs) || findfindSanseKe(pkezi, m, s, fm, fs) || findfindSanseKe(skezi, m, p, fm, fp)
		}
	}

	if (findSanseKe(zm, zp, zs, m, p, s)) {
		fanshu += 2
		yizhong.push('三色同刻')
	}

	// 一气通贯
	const findYiqi = (m, fm) =>
		[...m.split(''), ...fm.split('')].sort().join('').indexOf('123456789') > -1

	if (findYiqi(m, fm) || findYiqi(p, fp) || findYiqi(s, fs)) {
		if (!fulu) {
			fanshu += 2
		} else {
			fanshu ++
		}
		yizhong.push('一气通贯')
	}

	// 对对和
	if (!zPaixing.all.find(obj => obj.type === 'shunzi') && zPaixing.all.length !== 7 ) {
		fanshu += 2
		yizhong.push('对对和')
	}

	// 三暗刻
	if (zPaixing.all.filter(obj=> !obj.fulu && (obj.type === 'kezi' || obj.type === 'gangzi')).length === 3) {
		fanshu += 2
		yizhong.push('三暗刻')
	}

	// 七对子
	if (!fulu && zPaixing.all.length === 7 && zPaixing.all.filter(obj => obj.type ==='quetou').length === 7) {
		fanshu += 2
		yizhong.push('七对子')
	}

	// 混全带幺九
	const findQuandaiyao = zPaixing =>
		zPaixing.all.reduce((pre, cur) =>
			pre && (cur.value.indexOf('1') > -1 || cur.value.indexOf('9') > -1 || cur.huase === 'f' || cur.huase === 'z')
		, true)
	if (zPaixing.all.find(obj => obj.type === 'shunzi') && findQuandaiyao(zPaixing)) {
		if (zPaixing.all.find(obj => obj.huase === 'f' || obj.huase === 'z')) {
			// 混
			if (!fulu) {
				fanshu += 2
				yizhong.push('混全带幺九')
			} else {
				fanshu ++
				yizhong.push('混全带幺九')
			}
		} else {
			// 纯
			if (!fulu) {
				fanshu += 3
				yizhong.push('纯全带幺九')
			} else {
				fanshu += 2
				yizhong.push('纯全带幺九')
			}
		}
	}

	// 混老头
	const findLaotou = zPaixing =>
		zPaixing.all.filter(obj => obj.type !== 'shunzi').reduce((pre, cur) =>
			pre && (['1', '9'].indexOf(cur.value.split('')[0]) > -1 || ['f', 'z'].indexOf(cur.huase) > -1)
		, true)


	if (!zPaixing.all.find(obj => obj.type === 'shunzi') && findLaotou(zPaixing)) {
		if (zPaixing.all.find(obj => obj.huase === 'f' || obj.huase === 'z')) {
		// 混
			fanshu += 2
			yizhong.push('混老头')
		} else {
			// 清老头 在役满里定义过了
		}
	}

	// 小三元
	if ( zPaixing.zz.length === 3 && zPaixing.zz.find(obj => obj.type ==='quetou') ) {
		fanshu += 2
		yizhong.push('小三元')
	}

	// w立直
	if (wlizhi) {
		fanshu += 2
		yizhong.push('w立直')
	}

	return {
		fanshu,
		yizhong
	}
}

export default liangfan
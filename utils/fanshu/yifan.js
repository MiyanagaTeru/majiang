const yifan = (paixing, zPaixing) => {
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

	// const numberOfPai = m.length + p.length + s.length + f.length + z.length + fm.length + fp.length + fs.length + ff.length + fz.length
	// 立直
	if (lizhi) {
		fanshu++
		yizhong.push('立直')
	}
	// 一发
	if (yifa) {
		fanshu++
		yizhong.push('一发')
	}
	// 门清自摸
	if (!fulu && zimo) {
		fanshu++
		yizhong.push('门清自摸')
	}
	// 断幺九
	const duanyaojiu = arr => !arr.find(obj => obj.value.indexOf('1') > -1 || obj.value.indexOf('9') > -1)
	if (
		zf.length === 0 &&
		zz.length === 0 &&
		duanyaojiu(all)
	) {
		fanshu++
		yizhong.push('断幺九')
	}

	// 平和
	const pinghuhupai = (arr, paixing) => {
		const tar = arr.find(obj => obj.hupai)
		if (!tar) {
			return false
		}
		const hudepai = paixing[`h${tar.huase}`]
		if (
			tar.type === 'shunzi' &&
			tar.value.indexOf(hudepai) !== 1 && // 非嵌张
			!(tar.value === '123' && hudepai === '3') &&
			!(tar.value === '789' && hudepai === '7') // 非边张
		) {
			return true
		} else {
			return false
		}
	}
	if (
		!fulu &&
		all.reduce((pre, cur) => pre + cur.fushu, 0) === 0 &&
		pinghuhupai(all, paixing)
	) {
		fanshu++
		yizhong.push('平和')
	}

	// 一杯口
	const findyibeikou = zm => {
		const shunzis = zm.filter(obj => obj.type === 'shunzi')
		let found = false
		for (let i = 0; i < shunzis.length - 1; i++) {
			if (shunzis[i].value === shunzis[i+1].value) {
				found = true
				break
			}
		}
		return found
	}
	if (
		!fulu &&
		(findyibeikou(zm) || findyibeikou(zp) || findyibeikou(zs) )
	) {
		fanshu++
		yizhong.push('一杯口')
	}

	// 役牌
	const zikezis = all.filter(obj=>obj.type==='kezi' && (obj.huase === 'f' || obj.huase === 'z' ))
	if (zikezis.length > 0) {
		zikezis.map(zikezi => {
			if (zikezi.huase === 'f' && zikezi.value.indexOf(changfeng) > -1) {
				fanshu++
				yizhong.push('场风')
			}
			if (zikezi.huase === 'f' && zikezi.value.indexOf(zifeng) > -1) {
				fanshu++
				yizhong.push('自风')
			}
			if (zikezi.huase === 'z') {
				fanshu++
				yizhong.push('役牌')
			}
		})
	}

	// 岭上开花
	if (paixing.lingshang) {
		fanshu++
		yizhong.push('岭上开花')
	}

	// 枪杠
	if (paixing.qianggang) {
		fanshu++
		yizhong.push('枪杠')
	}

	// 海底捞月
	if (paixing.haidi) {
		fanshu++
		yizhong.push('海底捞月')
	}

	// 河底捞鱼
	if (paixing.hedi) {
		fanshu++
		yizhong.push('河底捞鱼')
	}

	// 宝牌
	let baopaiN = 0
	const findBaopaiN = (bm, m) =>
		m.split('').filter(obj => obj === bm).length
	baopaiN += findBaopaiN(bm, m)
	baopaiN += findBaopaiN(bp, p)
	baopaiN += findBaopaiN(bs, s)
	baopaiN += findBaopaiN(bz, z)
	baopaiN += findBaopaiN(bf, f)
	if (baopaiN > 0) {
		fanshu+= baopaiN
		yizhong.push(`宝牌${baopaiN}`)
	}

	// 红宝牌
	if (paixing.hongbao > 0) {
		fanshu+= +paixing.hongbao
		yizhong.push(`红宝牌${paixing.hongbao}`)
	}

	return {
		fanshu,
		yizhong
	}
}

export default yifan
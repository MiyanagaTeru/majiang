const yiman = (paixing, zPaixing) => {
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
	} = paixing

	const {
		zm,
		zp,
		zs,
		zf,
		zz
	} = zPaixing

	const numberOfPai = m.length + p.length + s.length + f.length + z.length + fm.length + fp.length + fs.length + ff.length + fz.length

	// 国士无双
	const unique = str => str.split('').filter((allItems, i, a) => i==a.indexOf(allItems)).join('');
	if (
		!fulu &&
		numberOfPai == 14 &&
		unique(m) =='19' &&
		unique(p) =='19' &&
		unique(s) =='19' &&
		unique(f) =='dnxb' &&
		unique(z) =='zbf'
	) {
		return {
			yizhong: ['国士无双'],
			title: '役满',
			dianshu: '32000'
		}
	}

	// 不是诈和吧？
	if (
		zPaixing.all.find(mianzi => mianzi.type==='zhahu') ||
		zPaixing.all.length < 5 ||
		!zPaixing.all.find(mianzi => mianzi.type==='quetou') ||
		(zPaixing.all.filter(mianzi => mianzi.type === 'quetou').length !== 7 && zPaixing.all.filter(mianzi => mianzi.type === 'quetou').length !==1)
	) {
		return {
			zhahu: true,
			title: '诈和啦'
		}
	}

	// 大三元
	// 拥有三种三元牌，且每种都是刻子或杠子
	if (
		zz.length === 3 &&
		(zz[0].type === 'kezi' || zz[0].type === 'gangzi') &&
		(zz[1].type === 'kezi' || zz[1].type === 'gangzi') &&
		(zz[2].type === 'kezi' || zz[2].type === 'gangzi')
	) {
		return {
			yizhong: ['大三元'],
			title: '役满',
			dianshu: '32000'
		}
	}

	// 四暗刻
	if (!fulu) {
		const numberOfAnke = arr => arr.filter(obj => obj.type === 'kezi' && !obj.fulu && !obj.hupai).length
		if (numberOfAnke(zm) + numberOfAnke(zp) + numberOfAnke(zs) + numberOfAnke(zf) + numberOfAnke(zz) === 4) {
			return {
				yizhong: ['四暗刻'],
				title: '役满',
				dianshu: '32000'
			}
		}
	}

	// 字一色
	if (
		zm.length === 0 &&
		zp.length === 0 &&
		zs.length === 0 &&
		(zf.length > 0 && zz.length >=0 || zf.length >= 0 && zz.length > 0)
	) {
		return {
			yizhong: ['字一色'],
			title: '役满',
			dianshu: '32000'
		}
	}

	// 绿一色

	// 清老头
	const findQingLaotou = zPaixing =>
		zPaixing.all.filter(obj => obj.type !== 'shunzi').reduce((pre, cur) => {
			return pre && ['1', '9'].indexOf(cur.value.split('')[0]) > -1
		}
		, true)


	if (!zPaixing.all.find(obj => obj.type === 'shunzi') && findQingLaotou(zPaixing)) {
		return {
			yizhong: ['清老头'],
			title: '役满',
			dianshu: '32000'
		}
	}
	// 懒得写了

	return false
}

export default yiman
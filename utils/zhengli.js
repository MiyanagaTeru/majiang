// zhengli整理的目的是把输入的牌型：
// {
// 	m, //万
// 	p, //饼
// 	s, //条
// 	f, //风
// 	z, //三元牌
// 	//副露中的
// 	fm, //万
// 	fp, //饼
// 	fs, //条
// 	ff, //风
// 	fz, //三元牌
// }
// 整理成:
// {
// 	m: [
// 		{
// 			type: 'kezi',
// 			value: '234',
// 			fulu: false,
// 			hupai: false,
// 			fu: '2'
// 		},
// 		{
// 			type: 'shunzi'
// 		},
// 		{
// 			type: 'quetou'
// 		},
// 		{
// 			type: 'gangzi'
// 		}
// 	],
// 	p: ...,
// 	s: ...,
// 	f: ...,
// 	z: ...
// }


const zhengli = paixing => {
	const zPaixing = {}
	let hupaiFound = false
	const isHupai = (str, hupai) => {
		if (!hupaiFound && !!hupai && str.indexOf(hupai) > -1) {
			hupaiFound = true
			return true
		} else {
			return false
		}
	}
	const fushu = (type, value, huase, fulu, changfeng, zifeng) => {
		switch(type) {
			case 'shunzi':
				return 0
				break
			case 'quetou':
				if (huase === 'm' || huase === 'p' || huase === 's') {
					return 0
					break
				} else {
					return {
						[true]: 0,
						[value === changfeng.repeat(2)]: 2,
						[value === zifeng.repeat(2)]: 2,
						['zzbbff'.indexOf(value) > -1]: 2
					}[true]
					break
				}
			case 'kezi':
				return {
					[true]: 0,
					[fulu && +value > 1 && +value < 9]: 2,
					[fulu && (+value === 1 || +value === 9 || huase === 'f' || huase === 'z')]: 4,
					[!fulu && +value > 1 && +value < 9]: 4,
					[!fulu && (+value === 1 || +value === 9 || huase === 'f' || huase === 'z')]: 8,
				}[true]
				break
			case 'gangzi':
				return {
					[true]: 0,
					[fulu && +value > 1 && +value < 9]: 8,
					[fulu && (+value === 1 || +value === 9 || huase === 'f' || huase === 'z')]: 16,
					[!fulu && +value > 1 && +value < 9]: 16,
					[!fulu && (+value === 1 || +value === 9 || huase === 'f' || huase === 'z')]: 32,
				}[true]
				break
			default:
				return 0
		}
	}
	const danse = (huase, str, fulu, hupai, changfeng, zifeng) => {
		let result = []
		const arr = str.split('')
		for (let i=0; i < arr.length; i++) {
			// 雀头？
			if (i + 1 < arr.length && arr[i] === arr[i+1]) {
				// 还是刻子？
				if (i + 2 < arr.length && arr[i] === arr[i+2]) {
					// 难道是杠子？那需要在副露里
					if (i + 3 < arr.length && arr[i] === arr[i+3]) {
						if (fulu) {
							result.push({
								type: 'gangzi',
								value: arr[i].repeat(4),
								huase,
								fulu,
								hupai: false,
								fushu: fushu('gangzi', arr[i], huase, fulu)
							})
							i += 3
							continue
						} else {
							result = false
							// 结束循环
							break
						}
					} else {
						result.push({
							type: 'kezi',
							value: arr[i].repeat(3),
							huase,
							fulu,
							hupai: isHupai(arr[i].repeat(3), hupai),
							fushu: fushu('kezi', arr[i], huase, fulu)
						})
						i += 2
						continue
					}

				} else {
					result.push({
						type: 'quetou',
						value: arr[i].repeat(2),
						huase,
						fulu,
						hupai: isHupai(arr[i].repeat(2), hupai),
						fushu: fushu('quetou', arr[i], huase, fulu, changfeng, zifeng)
					})
					i += 1
					continue
				}
			} else if (i + 2 < arr.length && +arr[i]+1 === +arr[i+1] && +arr[i+1]+1 === +arr[i+2]) {
				// 顺子？
					result.push({
						type: 'shunzi',
						value: `${arr[i]}${arr[i+1]}${arr[i+2]}`,
						huase,
						fulu,
						hupai: isHupai(`${arr[i]}${arr[i+1]}${arr[i+2]}`, hupai),
						fushu: 0
					})
					i += 2
					continue
			} else {
				// 啥都不是
				result=[{type: 'zhahu'}]
				// 结束循环
				break
			}
		}
		return result
	}
	const m1 = danse('m', paixing.m, false, paixing.hm, paixing.changfeng, paixing.zifeng)
	const m2 = danse('m', paixing.fm, true, paixing.hm, paixing.changfeng, paixing.zifeng)
	const p1 = danse('p', paixing.p, false, paixing.hp, paixing.changfeng, paixing.zifeng)
	const p2 = danse('p', paixing.fp, true, paixing.hp, paixing.changfeng, paixing.zifeng)
	const s1 = danse('s', paixing.s, false, paixing.hs, paixing.changfeng, paixing.zifeng)
	const s2 = danse('s', paixing.fs, true, paixing.hs, paixing.changfeng, paixing.zifeng)
	const f1 = danse('f', paixing.f, false, paixing.hf, paixing.changfeng, paixing.zifeng)
	const f2 = danse('f', paixing.ff, true, paixing.hf, paixing.changfeng, paixing.zifeng)
	const z1 = danse('z', paixing.z, false, paixing.hz, paixing.changfeng, paixing.zifeng)
	const z2 = danse('z', paixing.fz, true, paixing.hz, paixing.changfeng, paixing.zifeng)

	const zm = [...m1, ...m2]
	const zp = [...p1, ...p2]
	const zs = [...s1, ...s2]
	const zf = [...f1, ...f2]
	const zz = [...z1, ...z2]
	const all = [...zm, ...zp, ...zs, ...zf, ...zz]

	return {
		zm,
		zp,
		zs,
		zf,
		zz,
		all
	}
}


export default zhengli
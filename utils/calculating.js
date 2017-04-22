import zhengli from './zhengli'
import yiman from './fanshu/yiman'
import yifan from './fanshu/yifan'
import liangfan from './fanshu/liangfan'
import calcFushu from './calcFushu.js'
import calcDianshu from './calcDianshu'

const calculating = paixing => {
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

	// 先整理一下
	const zPaixing = zhengli(paixing)
	console.log(zPaixing)



	// 不是诈和吧？ TODO: 加入国士无双判定
	if (
		zPaixing.all.find(mianzi => mianzi.type==='zhahu') ||
		zPaixing.all.length < 5 ||
		!zPaixing.all.find(mianzi => mianzi.type==='quetou')
	) {
		return {
			zhahu: true,
			title: '诈和啦'
		}
	}
	// 役满
	if (yiman(paixing, zPaixing)) {
		return yiman(paixing, zPaixing)
	}

	let fanshu = 0
	let fushu = 0
	let yizhong = []
	// 一翻
	yizhong = [...yizhong, ...yifan(paixing, zPaixing).yizhong, ...liangfan(paixing, zPaixing).yizhong]
	fanshu += +yifan(paixing, zPaixing).fanshu
	fanshu += +liangfan(paixing, zPaixing).fanshu


	fushu = calcFushu(paixing, zPaixing, yizhong)

	const dianResult = calcDianshu(paixing, fanshu, fushu)

	if (yizhong.length > 0) {
		return {
			title: dianResult.title,
			yizhong,
			fanshu,
			fushu,
			dianshu: dianResult.dianshu
		}
	} else {
		return {
			zhahu: true,
			title: '诈和啦'
		}
	}

}



export default calculating
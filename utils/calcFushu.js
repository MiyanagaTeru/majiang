const calcFushu = (paixing, zPaixing, yizhong) => {
	let fushu = 20
	// 门清荣和
	if (!paixing.fulu && !paixing.zimo) {
		fushu += 10
	}
	// 面子符数（包括和牌类型符数）
	fushu += zPaixing.all.reduce( (pre, cur) => pre + cur.fushu, 0 )
	// 自摸
	if (
		paixing.zimo &&
		!yizhong.find(obj=>obj==='七对子') &&
		!yizhong.find(obj=>obj==='平和') &&
		!yizhong.find(obj=>obj==='岭上开花')
	) {
		fushu += 2
	}
	// 雀头
	const quetou = zPaixing.all.find(obj => obj.type === 'quetou')
	if (
		quetou.value === paixing.changfeng.repeat(2) ||
		quetou.value === paixing.zifeng.repeat(2) ||
		quetou.type === 'z'
	) {
		fushu += 2
	}

	// 特殊
	if (yizhong.find(obj => obj === '七对子')) {
		return 25
	}
	return Math.ceil(fushu/10)*10
}

export default calcFushu
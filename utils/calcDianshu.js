
const calcDianshu = (paixing, fanshu, fushu) => {
	let title = ''
	let dianshu = ''
	let a = fushu*Math.pow(2, fanshu+2)
	if (fanshu === 5 || a > 2000) {
		a = 2000
		title = '满贯'
	}
	if (fanshu === 6 || fanshu === 7) {
		a = 3000
		title = '跳满'
	}
	if (fanshu >= 8 && fanshu <=10) {
		a = 4000
		title = '倍满'
	}
	if (fanshu === 11 || fanshu === 12) {
		a = 6000
		title = '三倍满'
	}
	if (fanshu >= 13) {
		a = 8000
		title = '累计役满'
	}
	const jinwei = number => Math.ceil(number/100) * 100
	// 庄家自摸
	if (paixing.zifeng === 'd' && paixing.zimo) {
		dianshu = `all ${jinwei(2*a) + 100*paixing.benchang}`
	}
	// 庄家荣和
	if (paixing.zifeng === 'd' && !paixing.zimo) {
		dianshu = jinwei(6*a) + 300*paixing.benchang
	}
	// 闲家自摸
	if (paixing.zifeng !== 'd' && paixing.zimo) {
		dianshu = `${jinwei(a) + 100*paixing.benchang} ${jinwei(2*a) + 200*paixing.benchang}`
	}
	// 闲家荣和
	if (paixing.zifeng !== 'd' && !paixing.zimo) {
		dianshu = jinwei(4*a) + 300*paixing.benchang
	}
	return {
		title,
		dianshu
	}
}

export default calcDianshu
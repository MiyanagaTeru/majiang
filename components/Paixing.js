import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../actions'

import TextInput from './TextInput'
import CheckInput from './CheckInput'
import RadioInput from './RadioInput'

import styles from '../css/paixing.css'

const Paixing = ({paixing, eStatus, actions, calcPoints}) =>
	<form>
		<fieldset className='form-group'>
			<legend>手牌</legend>
			<TextInput labelText='万' inputName='m' inputValue={paixing.m} typeRestrict='number' actions={actions}/>
			<TextInput labelText='饼' inputName='p' inputValue={paixing.p} typeRestrict='number' actions={actions}/>
			<TextInput labelText='条' inputName='s' inputValue={paixing.s} typeRestrict='number' actions={actions}/>
			<TextInput labelText='风' inputName='f' inputValue={paixing.f} typeRestrict='letter' actions={actions}/>
			<TextInput labelText='三元' inputName='z' inputValue={paixing.z} typeRestrict='letter' actions={actions}/>
			<TextInput labelText='红宝' inputName='hongbao' inputValue={paixing.hongbao} typeRestrict='number' actions={actions}/>
		</fieldset>

		<CheckInput labelText='副露' inputName='fulu' inputValue={paixing.fulu} actions={actions}/>

		{
			paixing.fulu ?
			<fieldset>
				<legend>副露</legend>
					<div>
						<TextInput labelText='万' inputName='fm' inputValue={paixing.fm} typeRestrict='number' actions={actions}/>
						<TextInput labelText='饼' inputName='fp' inputValue={paixing.fp} typeRestrict='number' actions={actions}/>
						<TextInput labelText='条' inputName='fs' inputValue={paixing.fs} typeRestrict='number' actions={actions}/>
						<TextInput labelText='风' inputName='ff' inputValue={paixing.ff} typeRestrict='letter' actions={actions}/>
						<TextInput labelText='三元' inputName='fz' inputValue={paixing.fz} typeRestrict='letter' actions={actions}/>
					</div>
			</fieldset> :
			<div></div>
		}

		<fieldset>
			<legend>胡牌</legend>
			<TextInput labelText='万' inputName='hm' inputValue={paixing.hm} typeRestrict='number' actions={actions}/>
			<TextInput labelText='饼' inputName='hp' inputValue={paixing.hp} typeRestrict='number' actions={actions}/>
			<TextInput labelText='条' inputName='hs' inputValue={paixing.hs} typeRestrict='number' actions={actions}/>
			<TextInput labelText='风' inputName='hf' inputValue={paixing.hf} typeRestrict='letter' actions={actions}/>
			<TextInput labelText='三元' inputName='hz' inputValue={paixing.hz} typeRestrict='letter' actions={actions}/>
		</fieldset>

		<fieldset>
			<legend>宝牌</legend>
			<TextInput labelText='万' inputName='bm' inputValue={paixing.bm} typeRestrict='number' actions={actions}/>
			<TextInput labelText='饼' inputName='bp' inputValue={paixing.bp} typeRestrict='number' actions={actions}/>
			<TextInput labelText='条' inputName='bs' inputValue={paixing.bs} typeRestrict='number' actions={actions}/>
			<TextInput labelText='风' inputName='bf' inputValue={paixing.bf} typeRestrict='letter' actions={actions}/>
			<TextInput labelText='三元' inputName='bz' inputValue={paixing.bz} typeRestrict='letter' actions={actions}/>
		</fieldset>

		<fieldset>
			<CheckInput labelText='立直' inputName='lizhi' inputValue={paixing.lizhi} actions={actions} />
			<CheckInput labelText='w立直' inputName='wlizhi' inputValue={paixing.wlizhi} actions={actions} />
			<CheckInput labelText='一发' inputName='yifa' inputValue={paixing.yifa} actions={actions} />
			<CheckInput labelText='自摸' inputName='zimo' inputValue={paixing.zimo} actions={actions} />
			<CheckInput labelText='海底捞月' inputName='haidi' inputValue={paixing.haidi} actions={actions} />
			<CheckInput labelText='河底捞鱼' inputName='hedi' inputValue={paixing.hedi} actions={actions} />
			<CheckInput labelText='岭上开花' inputName='lingshang' inputValue={paixing.lingshang} actions={actions} />
			<CheckInput labelText='抢杠' inputName='qianggang' inputValue={paixing.qianggang} actions={actions} />
			<div>
				<RadioInput labelText='场风' inputName='changfeng' inputValues={['d', 'n', 'x', 'b']} inputLabels={['东 ','南 ','西 ','北 ']} actions={actions} paixing={paixing}/>
				<RadioInput labelText='自风' inputName='zifeng' inputValues={['d', 'n', 'x', 'b']} inputLabels={['东 ','南 ','西 ','北 ']} actions={actions} paixing={paixing}/>
				<TextInput labelText='本场' inputName='benchang' inputValue={paixing.benchang} typeRestrict='number' actions={actions}/>
			</div>
		</fieldset>

		<button
			className='btn btn-primary col-3 offset-2 mt-3'
			onClick={
				e => {
					e.preventDefault()
					actions.calcPoints(paixing)
				}
		}>
			计算
		</button>
		<button
			className='btn btn-secondary col-3 offset-2 mt-3'
			onClick={
				e => {
					e.preventDefault()
					actions.resetForm()
				}
		}>
			重置
		</button>
	</form>

const mapStateToProps = state => ({
	paixing: state.paixing,
	eStatus: state.eStatus
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Paixing)
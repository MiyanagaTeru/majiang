import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../actions'

import styles from '../css/paixing.css'

const Paixing = ({updatePaixing, calcPoints}) =>
	<form>
		<label className={styles.input} >
			<span className={styles.label}>m</span>
			<input type="text" name="paixingm" onChange={e => updatePaixing('m', e.target.value)}/>
		</label>
		<label className={styles.input}>
			<span className={styles.label}>p</span>
			<input type="text" name="paixingp" onChange={e => updatePaixing('p', e.target.value)}/>
		</label>
		<label className={styles.input}>
			<span className={styles.label}>s</span>
			<input type="text" name="paixings" onChange={e => updatePaixing('s', e.target.value)}/>
		</label>
		<label className={styles.input}>
			<span className={styles.label}>z</span>
			<input type="text" name="paixingz" onChange={e => updatePaixing('z', e.target.value)}/>
		</label>
		<button onClick={
			e => {
				e.preventDefault()
				calcPoints()
			}
		}>
			计算
		</button>
	</form>

const mapStateToProps = state => ({
	paixing: state.paixing
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Paixing)
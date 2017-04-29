import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../actions'
import styles from '../css/app.css'

const Result = ({results}) =>
	!results.zhahu ?
	<div className={`${styles.results} text-center my-4`}>
		<div>
			<div className='mb-3'>
				{
					results.yizhong.map((yi, index)=>
						<div key={index} className='text-center'>{yi}</div>
					)
				}
			</div>
		</div>

		<div>
			<span>{results.fushu && `${results.fushu}符` }</span>
			<span>{results.fanshu && `${results.fanshu}翻`}</span>
		</div>

		<div className='text-center'>{results.title}</div>
		{ results.dianshu && <div>{`${results.dianshu}点`}</div> }
	</div> :
	<div className={`${styles.results} text-center my-4`}>{results.title}</div>

const mapStateToProps = state => ({
	results: state.results
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Result)
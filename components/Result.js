import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../actions'

const Result = ({results}) =>
	!results.zhahu ?
	<div>
		<div>
			<ul>
				{
					results.yizhong.map((yi, index)=>
						<li key={index}>{yi}</li>
					)
				}
			</ul>
		</div>

		<div>
			<span>{results.fushu && `${results.fushu}符` }</span>
			<span>{results.fanshu && `${results.fanshu}翻`}</span>
		</div>

		<div>{results.title}</div>
		{ results.dianshu && <div>{`${results.dianshu}点`}</div> }
	</div> :
	<div>{results.title}</div>

const mapStateToProps = state => ({
	results: state.results
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Result)
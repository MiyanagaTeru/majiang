import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../actions'

const Result = ({results}) =>
	results.points ?
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
		<div>{`${results.fushu}符${results.fanshu}番`}</div>
		<div>{results.title}</div>
		<div>{`${results.points}点`}</div>
	</div> :
	<div></div>

const mapStateToProps = state => ({
	results: state.results
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Result)
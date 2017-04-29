import React from 'react'

const CheckInput = ({
	labelText,
	inputName,
	inputValue,
	actions
}) =>
	<div className='form-check form-check-inline'>
		<label className='form-check-label mr-2 py-1'>
			<input type="checkbox" className='form-check-input' checked={inputValue || false} name={inputName} value={inputValue} onChange={e => actions.updatePaixing(inputName, e.target.checked)} />
			<span>{labelText}</span>
		</label>
	</div>

export default CheckInput
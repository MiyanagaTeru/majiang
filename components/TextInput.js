import React from 'react'

import only from '../utils/typeRestrict'

const TextInput = ({
	labelText,
	inputName,
	inputValue,
	typeRestrict,
	actions
}) =>
	<div className='d-inline-block col-6 col-sm-4'>
		<label className='row'>
			<span className='col-2 col-form-label px-0 text-left'>{labelText}</span>
			<div className='col-10 px-0'>
				<input type="text" className='form-control' name={`paixing${inputName}`} value={inputValue || ''} onChange={e => {
					if(!only(typeRestrict, e.target.value)) {
						return false
					}
					actions.updatePaixing(inputName, e.target.value)
				}}/>
			</div>
		</label>
	</div>

export default TextInput
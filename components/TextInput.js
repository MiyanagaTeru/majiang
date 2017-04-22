import React from 'react'

import only from '../utils/typeRestrict'

import styles from '../css/textInput.css'

const TextInput = ({
	labelText,
	inputName,
	inputValue,
	typeRestrict,
	actions
}) =>
	<div className='d-inline-block col-6'>
		<label className='row'>
			<span className='col-4 col-form-label'>{labelText}</span>
			<div className='col-8'>
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
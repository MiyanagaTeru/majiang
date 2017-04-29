import React from 'react'

const RadioInput = ({
	labelText,
	inputName,
	inputValues,
	inputLabels,
	actions,
	paixing
}) =>
	<div className='form-check mt-2 mb-4 p-0'>
		<span className='align-middle'>{labelText}</span>
		{
			inputValues.map( (inputValue, i) =>
				<label key={i} className='form-check-label mx-2'>
					<input type="radio" className='form-check-input' name={inputName} value={inputValue} checked={paixing[inputName]===inputValue || false} onChange={e => actions.updatePaixing(inputName, e.target.value)} />
					<span>{inputLabels[i]}</span>
				</label>
			)
		}
	</div>

export default RadioInput
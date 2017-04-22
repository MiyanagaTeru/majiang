import React from 'react'

const RadioInput = ({
	labelText,
	inputName,
	inputValues,
	inputLabels,
	actions
}) =>
	<div className='form-check'>
		{labelText}
		{
			inputValues.map( (inputValue, i) =>
				<label key={i} className='form-check-label'>
					<input type="radio" className='form-check-input' name={inputName} value={inputValue} onChange={e => actions.updatePaixing(inputName, e.target.value)} />
					<span>{inputLabels[i]}</span>
				</label>
			)
		}
	</div>

export default RadioInput
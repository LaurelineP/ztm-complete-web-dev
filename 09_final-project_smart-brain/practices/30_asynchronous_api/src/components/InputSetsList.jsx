import React from 'react';
import {InputSet} from './InputSet';

export class InputSetsList extends React.Component {
	render(){
		const { inputsOptions, radioValue, inputNumberValue, isDisabled, isRandom, onChange } = this.props
		return(
			<>
				{
					inputsOptions?.map(( {type: inputPropType, ...inputProps}, idx ) => {

						const isTypingInputDate = inputPropType === 'number' && radioValue === 'date';

						// overrides inputsOptions.type for input type number based on radio "date" selected 
						const type = isTypingInputDate ? 'text' : inputPropType;

						const isInputToTypeIn = ['number', 'text'].includes(type);


						const inputToTypeInProps = {
							inputNumberValue,
							placeholder:  isTypingInputDate ? 'MM/DD' : 'Add a number',
						}


						inputProps.value = !isInputToTypeIn 
							? inputProps.value 
							// value for input to type in
							: isDisabled ? '' : inputNumberValue;
				
						const label = type === 'radio' ? inputProps.value : inputProps.name;

						// all inputs but random are disabled if random is checked
						const _isDisabled = type === 'checkbox' && isRandom ? false : isDisabled



						// deducts input with checked value and adjust checked value logic
						const isInputWChecked = ['radio', 'checkbox'].includes( type );
						const checked = type === 'checkbox'
							? inputProps.value
							: type === 'radio'
								? radioValue === inputProps.value : '';

						return (
							<React.Fragment key = {`InputSets_item_${idx}__${type}`}>
								{/* Radio buttons instruction */}
								{ idx === 0 && (<span>1. Pick a category:</span>) }

								{/* Textual input (date/text) instruction */}
								{ isInputToTypeIn && (
									<span>2. Write a number or a date:</span>
								)}

								{ /* Option random */}
								{ inputPropType === "checkbox" && (
									<>
										<hr/>
										<span className="dual-inline">
											Or get a random fact
										</span>
									</>
								)}

								<InputSet
									key={`InputSet-${idx}`}
									onChange = {onChange}
									hasLabel = {inputProps.name === 'radioCategory'}
									isDisabled = {_isDisabled}
									radioValue = {radioValue}
									type = {type}
									label={label}
									isRandom = {isRandom}
									{...inputProps}
									
									{...(isInputToTypeIn && inputToTypeInProps)}
									{...isInputWChecked && { checked }}

								/>
							</React.Fragment>
						)
					})
				}
			</>
		)
	}
}
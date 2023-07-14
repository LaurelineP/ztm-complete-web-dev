import React, { Component } from 'react';
import './InputSet.scss'

class InputSet extends Component {

	render(){
		const { name, isDisabled, type, onChange, value, hasLabel, placeholder, label, checked }  = this.props;
		const isWChecked = ['radio', 'checkbox'].includes(type)
		return (
			<div className = "InputSet">

					{ hasLabel && <label htmlFor={name}>{label}</label> }

					<input
						type={type}
						disabled={isDisabled}
						name={name}
						onChange={onChange}
						placeholder={placeholder}
						value={value}
						{...isWChecked && { checked }}
					/>
			</div>
		)
	}
}

export { InputSet };
import React, { Component } from 'react';
import { InputSetsList } from '../components/InputSetsList'
import { InputDetails, interfaceWithState, buildRequestEndpoint } from '../utils';
import './NumberFacts.scss'

class NumbersInterfaceAPI extends Component {
	constructor(){
		super()
		this.state = {
			isLoading: false,
			isRandom: true,
			text: '',
			radioValue : '',
			inputNumberValue: ''
		}
		this.onChange = this.onChange.bind(this);
		this.onRequest = this.onRequest.bind(this);
		this.onEnter = this.onEnter.bind(this);
	}

	onChange(e){
		// handle different input values [ type = text | radio | checked ]
		const { propertyName, value } = interfaceWithState(e);
		this.setState({ [propertyName]: value });
	}

	async onRequest(){
		const endpoint = buildRequestEndpoint(this.state);
		try {
			this.setState({ isLoading: true });
			const response 	= await fetch(endpoint);
			const data 		= await response.json();
			this.setState({ isLoading: false, text: data.text });
		} catch( error ){
			console.error(error)
			this.setState({ isLoading: false });
		}
	}
	
	onEnter(e) {
		if(e.key !== "Enter") return;
		const expectedValues = {
			isUsingRadio: [ this.state?.radioValue, this.state?.inputNumberValue ].every( v => !!v),
			isUsingRandom: this.state.isRandom
		}
		if( !(expectedValues.isUsingRadio || expectedValues.isUsingRandom )) return;
		this.onRequest();
	}
 
	componentDidMount(){
		document.addEventListener('keydown', this.onEnter);
	}

	componentWillUnmount(){
		document.removeEventListener('keydown', this.onEnter);
	}

	render(){
		// inputs should be disabled based on [ isRandom, and if another field is touched ]
		const { 
			isLoading,
			text,
			isRandom,
			radioValue,
			inputNumberValue
		} = this.state;
	
		// inputs list content
		const inputsOptions = [
			new InputDetails('radio', 'radioCategory', 'math'),
			new InputDetails('radio', 'radioCategory', 'trivia'),
			new InputDetails('radio', 'radioCategory', 'date'),
			new InputDetails('number', 'value', inputNumberValue),
			new InputDetails('checkbox', 'random', isRandom)
		];

		const isDisabled = isRandom;
		
		const shouldEnableButton = !!(radioValue && inputNumberValue) || isRandom;

		const anecdoteTxt =  isLoading ? 'Loading...' : text ? `"${text}"` : null
		
		return (
			<div id="NumberFacts">
				<div className='NumberFacts_layout'>
					<div>
						<h1>Numbers Fact</h1>
						<span className= "response"> { anecdoteTxt }</span>
						<hr/>
					</div>

					<div id="InputSets">
						
						<InputSetsList 
							inputsOptions = {inputsOptions}
							radioValue = {radioValue}
							inputNumberValue = {inputNumberValue}
							isDisabled = {isDisabled}
							isRandom = {isRandom}
							onChange = {this.onChange}
						/>
						
						<button 
							className = {!shouldEnableButton ? 'disabled' : null}
							{...(shouldEnableButton && { onClick: this.onRequest })}
						>
							Get number info
						</button>
					</div>

				</div>
			</div>
		)
	}
}

export default NumbersInterfaceAPI;

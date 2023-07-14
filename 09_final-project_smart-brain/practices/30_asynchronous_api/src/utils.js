

export class InputDetails {
	constructor(type = null, name = null, value = null){
		this.type 			= type
		this.name			= name
		this.value 			= value
	}
}


export function interfaceWithState(e){
	const inputType = e.target.type;
	// radio name is always "radioValue" but its value corresponds to its real name
	const inputName = inputType === 'radio' ? e.target.value : e.target.name;

	// interfaces UI names to update the correct state property key 
	const propertyName = inputName.includes('random')
		? 'isRandom'
		: (inputType === 'radio' && 'radioValue') || 'inputNumberValue'
	
	const value = inputType === 'checkbox'
		? e.target.checked
		: Number(e.target.value) < 0 ? 0 : e.target.value ;

	return { propertyName, value }
}

export function buildRequestEndpoint( state ){
	let baseURL = "http://numbersapi.com/";
	const { radioValue, inputNumberValue } = state;

	const endpointValue = state.isRandom
		? 'random'
		: `${inputNumberValue}/${radioValue}`;

	return `${baseURL}${endpointValue}?json`
}
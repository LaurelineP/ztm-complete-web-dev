/**
 * FEATURES
 * - creates gradient using the input type color
 * 
 * BONUS
 * - add a button generating 2 random colors
 * 
 * EXTRA
 * - adding configuration section
 * 		- to set multiple color variant picker
 * 		(should affect the color generated)
 * 		- to set what kind of gradient is desired
 * 	- deletable gradient
 * 		- from color pickers counter
 * 		- from color pickers delete button : removing one by one
 * 	- enable resetting the current colors by keeping the 2 first
 * 	- enable refreshing page to generate random 2 colors
 * 	- enable copying css color || gradient
 * 
 * 
 * LIMITATION:
 * 	- use the knowledge seen until this point
 * 		- loops limitation: for loops, while, do, forEach can be used
 * 		- function can be used ( includes event listeners, callbacks )
 * 	- use DOM Manipulation documentation

/* -------------------------------------------------------------------------- */
/*                                  CONSTANTS                                 */
/* -------------------------------------------------------------------------- */
const MIN_INPUT_COUNT = 2;
const MAX_GRADIENTS = 8;
const HEXA_VALUES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,'A', 'B', 'C', 'D', 'E', 'F'];
const GRADIENT_TYPES 			= ['linear', 'radial'];
const GRADIENT_COUNT_ACTIONS 	= ['increment', 'decrement'];
const GRADIENT_TYPE_ACTIONS 	= ['previous', 'next'];
const COLORS_INIT = [];



/* -------------------------------------------------------------------------- */
/*                      SELECTORS AND ELEMENTS RELATED                        */
/* -------------------------------------------------------------------------- */
const body = document.body;

/* Gradient's color pickers related */
const getInputsColorsContainer = () => body.querySelector('#inputs-color-container');
const getInputsColorList = () => body.querySelectorAll('input[type="color"]');

/* Gradient's count selectors */
const getElementGradientCount = () => body.querySelector('#gradients-count_number');
const getElementGradientCountValue = () => Number(getElementGradientCount().innerText);
const getElementGradientCountButtons = () => body.querySelectorAll('[data-action="increment"], [data-action="decrement"]');

/* Gradient's type selectors */
const getElementGradientTypeContainer = () => body.querySelector('#gradients-type-container');
const getElementGradientTypeButtons = () => getElementGradientTypeContainer().querySelectorAll('i');
const getElementGradientType = () => body.querySelector('#gradients-type-value');
const getElementGradientTypeValue = () => getElementGradientType().innerText;

/* Gradient's type configuration panel selectors */
const getElementReset = () => body.querySelector('[data-action="reset"]');
const getElementReload = () => body.querySelector('[data-action="reload"]');
const getElementCopy = () => body.querySelector('[data-action="copy"]');



/* -------------------------------------------------------------------------- */
/*                               HELPERS / UTILS                              */
/* -------------------------------------------------------------------------- */
/** Gets color pickers values  */
function getInputColorsValues(){
	const colors = [];
	const colorPickers = getInputsColorList();

	colorPickers.forEach( colorPicker => {
		colors.push( colorPicker.value );
	});
	return colors;
}


/** Generates hexadecimal color */
function generateHexadecimalColor(){
	let hexadecimal = '#';
	for( let i = 0; i < 6; i++ ){
		const index = Math.floor(Math.random() * HEXA_VALUES.length);
		hexadecimal += HEXA_VALUES[index];
	}
	return hexadecimal;
}


/** Gets the difference out of the input's number and current color picker in DOM */
function getCountDelta( number ){
	const inputsColorContainer = getInputsColorsContainer();	
	const _inputNumberInContainer = inputsColorContainer.children.length;

	const _inputNumber =  number || getElementGradientCount();
	const delta = _inputNumber - _inputNumberInContainer;
	return delta;
}



/** Generate colors pickers inputs based on provided number */
function generateColorPickers( number = MIN_INPUT_COUNT, color ){
	const inputsColorContainer = getInputsColorsContainer();
	for (let i = 0; i < number; i++){
		const inputColor = createInputColor(color);
		inputsColorContainer.append(inputColor);
	}
	updateInputColorNumberValue();
	updateInputColorCountText();
}


/** Generate gradient based on inputs values */
function generateCSSGradientColors(){

	const gradientType = getElementGradientTypeValue().trim();

	const cssGradientFunctionName = gradientType + '-gradient';

	const getCSSGradient = colorsString => {
		if(gradientType === 'linear'){
			colorsString = '0.15turn, ' + colorsString;
		}	
		return cssGradientFunctionName + '(' + colorsString + ')';
	};

	// collects colors pickers hexadecimals
	let colorCollection = getInputColorsValues()

	// css color gradient or color string
	const cssGradientString = colorCollection.length !== 1 
		? getCSSGradient(colorCollection.join(', '))
		: colorCollection.join();

	// updates main with gradient to display
	body.style.background = cssGradientString;

	return cssGradientString;
}


/** Creates delete icon by the color input */
const createDeleteIcon = () => {
	const span = document.createElement('span');
	span.classList.add('icon');

	const icon = document.createElement('i');
	icon.classList.add('delete-icon');
	icon.setAttribute('title', 'Delete variant');

	span.addEventListener('click', deleteInputColor);
	icon.addEventListener('click', deleteInputColor);

	span.append(icon);
	return span;
}


/** Creates the input color ( wrapper, input itself, delete button) */
const createInputColor = (color = null) => {
	const colorGenerated = color || generateHexadecimalColor();

	// keeps initiated colors
	if(COLORS_INIT.length < 2){
		COLORS_INIT.push( colorGenerated );
	}

	// creates input color picker wrapper
	const colorInputContainer = document.createElement('div');
	colorInputContainer.classList.add('input-color-container');

	// creates input color picker
	const colorInput = document.createElement('input');
	colorInput.setAttribute('type', 'color');
	colorInput.setAttribute('value', colorGenerated);
	colorInput.classList.add('input-color');
	colorInput.addEventListener('change', generateCSSGradientColors)

	// creates delete icon
	const deleteIconButton = createDeleteIcon();

	colorInputContainer.append(colorInput, deleteIconButton);


	return colorInputContainer;
};


/** Handles gradients count text (plural and singular) */
function updateInputColorCountText(){
	const count = getElementGradientCountValue();

	const elementText = document.body.querySelector('#gradients-count_text');
	const previousText = elementText.innerText;

	const updatedText = count <= 1 ? 'gradient' : 'gradients';

	const shouldUpdate = updatedText !== previousText;

	// updates count text in DOM
	if( shouldUpdate ){
		document.body.querySelector('#gradients-count_text').innerText = updatedText;
	}
	
}


/** Updates input colors count */
function updateInputColorNumberValue(count){
	const inputsColorCount = getInputsColorsContainer().children.length;
	getElementGradientCount().innerText = count || inputsColorCount
}


/** Gradient's counter buttons: Set event listeners */
function setGradientCounterButtons() {
	const gradientsCountButtons = document.body.querySelectorAll(
		'i[data-action="increment"], i[data-action="decrement"]'
	);
	gradientsCountButtons.forEach((buttonCount) => {
		buttonCount.addEventListener('click', updateGradients);
	});
}


/** Gradient's type: Sets event listeners on types buttons **/
function setGradientTypeButtons() {
	const gradientsTypeButtons = getElementGradientTypeButtons();
	gradientsTypeButtons.forEach((buttonIcon, idx) => {

		// handles disabled button state
		if(idx !== 0){ buttonIcon.classList.add('disabled')}

		buttonIcon.addEventListener('click', updateGradients);
	});
}

/** Gradient's type: Sets event listeners on configurations buttons 
 * 	- reset: resets current gradients to 2 color and linear gradient
 * 	- reload: refreshes page
 * 	- copy: copies css gradient function
*/
function setGradientConfigurationButtons() {
	const resetButton = getElementReset();
	resetButton.addEventListener('click', reset);

	const reloadButton = getElementReload();
	reloadButton.addEventListener('click', reload);

	const copyButton = getElementCopy();
	copyButton.addEventListener('click', copy);
}


/* -------------------------------------------------------------------------- */
/*                                  HANDLERS                                  */
/* -------------------------------------------------------------------------- */

/** on gradients buttons' click: update gradients count */
function updateGradients(e){
	const limit = 0
	const min = 1;
	const max = 8;
	const action = e.target.dataset.action;
	const currentCountValue = getElementGradientCountValue();

	// determines what count action to compute
	let updatedValue = currentCountValue;
	if( GRADIENT_COUNT_ACTIONS.includes( action )){
		switch(action){
			case 'increment':
				updatedValue += 1;
				updatedValue <= max && generateColorPickers(1);
				break;
			case 'decrement':
				updatedValue !== limit && (updatedValue -= 1);
				updatedValue !== limit && deleteInputColor(e);
				break;
			default:
				updatedValue = getElementGradientCount();
		}

		// updates disable state of a button if needed 
		const canNotOperateAction = updatedValue === min || updatedValue === max;
		const childWithDisabled =  e.target.parentElement.querySelector('.disabled');
		if(canNotOperateAction){
			e.target.classList.add('disabled');
		} 
		else if( !canNotOperateAction && !!childWithDisabled){
			childWithDisabled.classList.remove('disabled');
		}

	}


	// determines what count action to compute
	if( GRADIENT_TYPE_ACTIONS.includes(action)){
		const currentTypeValue = getElementGradientTypeValue();
		const controlTypeButtons = getElementGradientTypeButtons();

		// interfacing type action value to gradient type value based on common index
		// once the value identified, get the other value
		let controlTypeBoundedValue;
		let otherIdx;
		let currentIdx;
		GRADIENT_TYPE_ACTIONS.forEach(( _, idx) => {
			if( GRADIENT_TYPE_ACTIONS[idx] !== action ){
				currentIdx = idx;
				controlTypeBoundedValue = GRADIENT_TYPES[idx];
			} else {
				otherIdx = idx;
			}
		})
		controlTypeButtons[currentIdx].classList.remove('disabled');

		// interfacing clicking effect: gradient type only changes the correct icon is clicked
		if( controlTypeBoundedValue !== currentTypeValue ){
			const gradientTypeElement = getElementGradientType();
			gradientTypeElement.innerText = controlTypeBoundedValue;

			// disabled the other button 
			controlTypeButtons[otherIdx].classList.add('disabled');
		}
	}
	updateInputColorCountText();
	generateCSSGradientColors();
}


/** Deletes the clicked color picker with the delete icon clicked */
function deleteInputColor(e){
	const delay = 100
	const count = getElementGradientCountValue();
	const colorPickersContainers = getInputsColorsContainer();
	const lastInputColor = colorPickersContainers.children[count - 1];
	const inputColorToDelete = e.target.closest('.input-color-container') 
		|| lastInputColor;
	
	if(!!inputColorToDelete && count > 1){
		inputColorToDelete.classList.add('fadeout');

		// enables animation on deletion
		setTimeout(() => {
			inputColorToDelete.classList.remove('fadeout');
			colorPickersContainers.removeChild(inputColorToDelete);
			generateCSSGradientColors();
		}, delay);
	}

	// enables to sync action when color picker disappears with animation
	setTimeout(() => {
		updateInputColorNumberValue();
		updateInputColorCountText();
	}, delay);
}

/** Resets all modified DOM manipulation to an initial state */
function reset(){
	const colorPickers = getInputsColorList();

	// removes all color pickers but 2 first
	if( colorPickers.length > MIN_INPUT_COUNT ){
		colorPickers.forEach(( colorPicker, idx ) => {
			if( idx > 1 ){ colorPicker.parentElement.remove() }
		});
	}
	/** re-established initial 2 values
	 * generates only the last one as at least 
	 * one color is remaining  */
	else if( colorPickers.length < MIN_INPUT_COUNT ){
		generateColorPickers(1, COLORS_INIT[1]);
	}

	// once configuration has been resetted, sync background-color gradient
	// generateCSSGradientColors();

	// resets gradient count
	updateInputColorNumberValue();

	

	// removes "disabled" style from count buttons
	getElementGradientCountButtons()
		.forEach( button => {
			button.classList.contains('disabled')
			&& button.classList.remove('disabled')
		})


	// resets gradient's type
	getElementGradientType().innerText = GRADIENT_TYPES[0];

	// resets gradient's type buttons
	getElementGradientTypeButtons()
		.forEach(( button, idx )=> {
			if( idx !== 0 ){ button.classList.add('disabled')}
			else { button.classList.remove('disabled')}

		})
	// synced css gradient count
	generateCSSGradientColors();
}

/** Reloads the page - can appears as generate a linear gradient of 2 */
function reload(){
	window.location.reload();
}

/** Copies in clipboard current background gradient value */
function copy(e){
	const CSSGradientString = generateCSSGradientColors();
	const selfElement = e.target;

	const type = 'text/plain'
	const blob = new Blob([CSSGradientString], { type });
	const data = [new ClipboardItem({[type]: blob })];

	navigator.clipboard
		.write(data)
		.then( _ => {
			selfElement.innerText = 'copied'
			setTimeout(() => {
				selfElement.classList.toggle('validated');
				selfElement.innerText = 'copy'
			}, 1000);
			selfElement.classList.toggle('validated');
			console.info('[ COPIED TO CLIPBOARD ]:', CSSGradientString);

		})
		.catch(error => console.error(error));
}



/* ---------------------------------- INIT ---------------------------------- */

(function init(){

	generateColorPickers();
	
	generateCSSGradientColors();
	
	setGradientCounterButtons();
	
	setGradientTypeButtons();
	
	setGradientConfigurationButtons();

})();
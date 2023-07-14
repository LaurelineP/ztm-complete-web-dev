(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){

// Uses browserify
const x = require('./bundle');

},{"./bundle":1}],3:[function(require,module,exports){
/* -------------------------------------------------------------------------- */
/*                                  CONSTANTS                                 */
/* -------------------------------------------------------------------------- */

// Evaluations in instructions
const EVALUATIONS = [
	'5 + "34"',
	'5 - "4"',
	'10 % 5',
	'5 % 10',
	'"Java" + "Script"',
	'" " + " "',
	'" " + 0',
	'true + true',
	'true + false',
	'false + true',
	'false - true',
	'3 - 4',
	'"Bob" - "bill"',
	'5 >= 1',
	'0 === 1',
	'4 <= 1',
	'1 != 1',
	'"A" > "B"',
	'"B" < "C"',
	'"a" > "A"',
	'"b" < "A"',
	'true === false',
	'true != true',
	'Make the following string using the + sign: "Hi There! It\'s "sunny" out"'
];

// Errors collected
let errors = [];


/* -------------------------------------------------------------------------- */
/*                                  SELECTORS                                 */
/* -------------------------------------------------------------------------- */

const getQuizContainer = () => document.getElementById('quiz');
const getAllTextInputs = () => document.querySelectorAll('input[type="text"]');
const getDialog = () => document.querySelector('dialog');



/* -------------------------------------------------------------------------- */
/*                                   HELPERS                                  */
/* -------------------------------------------------------------------------- */

/** Check is the value contain string syntax characteristics */
const hasStringExpression = (value = "") => {
	// "Hi There!" + "It's \"sunny\" out"

	if(!value) return false;

	const isString = (value, pttrn) => value?.startsWith(pttrn) && value?.endsWith(pttrn);
	const isDbQuoted = isString(value, '"') ;
	const isSingleQuoted = isString(value, '\'') ;
	
	return isDbQuoted || isSingleQuoted;
}


/** Evaluates instruction in string to compute a result */
const evaluate = evaluationString =>  Function(`return ${evaluationString}`)();




/* -------------------------------------------------------------------------- */
/*                                  HANDLERS                                  */
/* -------------------------------------------------------------------------- */
/** Determines the score from all inputs assessments
 * - evaluation is from original `evaluation`
 * - solution is the evaluation computation result
 * - value is the input value
 */
const getScore = () => {
	const inputs = [...getAllTextInputs()];
	const cleanEvaluation = (string) =>  string.substring(1, string.length -1);

	const score = inputs.reduce((acc, input, idx) => {
		// Gets original evaluation asked
		const _evaluation = input.dataset.evaluation;

		// Exception to evaluate: user input being an expression
		const shouldReceiveExpression = _evaluation.length > 50;
		const inputValue = shouldReceiveExpression ? evaluate(input.value) : input.value;
		const evaluation = shouldReceiveExpression ? _evaluation.split(': ')[1] || "" : _evaluation;
		const solution = (shouldReceiveExpression ? cleanEvaluation(evaluation) : evaluate(evaluation));


		// Determines if the user expressed the string syntax with single or double quotes
		const isUserExpressingString = hasStringExpression(input.value);
		
		// Determines if a value is related to NaN
		const isNaNString = inputValue === 'NaN';
	
		// Valid input cases 
		const canBeProcessed = inputValue !== null
			&& inputValue !== undefined
			&& !!inputValue.length;
		

		
		let value;
		// processes returns values from input's event which are always strings which need to be double checked.
		if( isUserExpressingString ){
			// user explicitly added quotes - which needs to be removed to compare with computation
			if( !shouldReceiveExpression ){
				value = inputValue.split(inputValue[0]).join('');
			} else {
				value = inputValue
			}
		} else {
			// user's answer is NaN
			if ( isNaNString ){
				value = NaN;

			// user's answer is a boolean
			} else if( inputValue === "true" || inputValue === "false" ){
				value = JSON.parse(inputValue);

			// user's answer is a number
			} else {
				value =  Number(inputValue)
			}
		}
		
		const isValidAnswer = (canBeProcessed && value === solution) || (isNaNString);
		const doesErrorExist = (error) => errors.toString().includes(error.toString());

		const error = [idx, evaluation, solution];
		// console.log('error:', error)
		// console.log('doesErrorExist:', doesErrorExist(error))

		const isErrorWithin = doesErrorExist(error)

		// collects invalid errors
		if(!isValidAnswer && !isErrorWithin ){ errors.push(error); }
		else { // removes valid answers from errors 
			const idxToRemove = errors.findIndex(error => error[0] === idx );
			errors.splice(idxToRemove, 1);
		}
		
		return isValidAnswer? acc + 1 : acc;
	}, 0);

	console.log('errors:', errors)
	return {score, errors};
};

const getScorePercent = () => {
	const inputsCount = [...getAllTextInputs()].length;
	const {score, errors} = getScore();
	const percent = !!score
		?  Math.round((score /inputsCount ) * 100)
		: 0;
	return {score, percent, errors};
}
/* -------------------------------------------------------------------------- */
/*                            DOM ELEMENT CREATORS                            */
/* -------------------------------------------------------------------------- */

/** Creates fragment: empty html container to wrap children */
const createFragment = () =>  document.createDocumentFragment();

/** Creates fragment: div container */
const createDiv = () => createElement('div');



/** Creates fragment: empty html container to wrap children */
const createElement = (element, text = null) => {
	const el = document.createElement(element);
	const elementsException = ['input', 'form', 'submit'];

	const isWithoutInnerText = elementsException.includes(element);
	
	const _text = (text !== undefined && text !== null) && `${text}`;

	const shouldProvideText = !!_text && !isWithoutInnerText;

	if(isWithoutInnerText){ el.value = text; }
	else if(shouldProvideText){ el.innerText = _text; }

	return el;
};


/** Create the quiz form  */
const createFormQuiz = children => {
	const form = createElement('form');
	const submitButton = createInput('submit');

	form.append(children, submitButton);

	form.addEventListener('submit', e => {
		e.preventDefault();
		setDialog().showModal()
	});
	return form;
}


/** Creates input element:
 * - type: input's type
 * - value: input's value attribute
 * - name: input's name attribute reference
 */
const createInput = (type, value = null, name = null) => {

	const input = createElement('input');

	if(!!type){ input.type = type; }

	if(!!value){ input.value = value; }

	if(!!name){ 
		input.name = name;
		input.dataset.evaluation = name;
	}

	return input;
}

/** Creates input element with a label
 * All elements are wrapped into a div for the label + input
 */
const createInputLabelled = (type, value = null, name = null) => {
	const container = createDiv();

	const label = createElement('label', value);
	const input = createInput(type, value, name);
	input.required = true;
	
	container.append(input, label);

	return container;
}

/** Creates dialog / modal to display the result */
const setDialog = () => {
	const inputsCount = getAllTextInputs().length;

	const dialog = getDialog() || createElement('dialog');

	const closeModal = (e) =>{ e.target.closest('dialog').close(); errors = []};

	/* --------------------------- modal main content --------------------------- */
	const wrapperContent = document.querySelector('#modal-main') || createDiv();

	const doesDialogExist = !!wrapperContent.id;

	if( !doesDialogExist ) { wrapperContent.id = "modal-main" };

	// Textual modal content regarding the score
	const { score, percent, errors } = getScorePercent();
	const emote = percent > 90 ? "✨🚀 !": percent > 50 ? ". 💪" : ".😕";
	const text = `Your score is ${score}/${inputsCount} \n ${percent}% correct${emote}`
	const p = createElement('p', text);

	const method = doesDialogExist ? 'replaceChildren' : 'append';
	wrapperContent[ method ](p);
	

	if( !doesDialogExist ){
		/* ---------------------------- buttons handling ---------------------------- */
		const okButton = createInput('button', 'ok');
		okButton.addEventListener('click', closeModal);
		
		const wrapperBottom = createDiv();
		wrapperBottom.id ='modal-footer';
		wrapperBottom.append( okButton );
		
		/* ----------------------------- compose dialog ----------------------------- */
		// set all modal content  in wrapper
		dialog.append(wrapperContent, wrapperBottom);
	
		dialog.addEventListener('blur', closeModal);
		dialog.addEventListener('enter', closeModal);
		document.body.append(dialog);

	}
	// sets errors collected
	if(percent === 100){ errors = [] }
	else {
		const errorsContent = generateFeedbacksSection(errors);
		const  dialogContent = document.querySelector('#modal-main');
		dialogContent.append(errorsContent);
	}

	return dialog;
}


/* -------------------------------------------------------------------------- */
/*                               DOM GENERATORS                               */
/* -------------------------------------------------------------------------- */


/** Generates questions - returns questions inputs */
const generateEvaluationInputs = (evaluations) => {
	if( !!evaluations ){
		const wrapper = createFragment();
		evaluations.forEach(( evaluation, idx ) => {
			const instruction = evaluation.length > 50
				? evaluation
				: `${idx + 1}. What would be the output of: ${evaluation}?`;
			const p = createElement('p', instruction);
			const fragment = createFragment();
	
			const inputEvaluationDiv = document.createElement('div');
			inputEvaluationDiv.classList.add('evaluation-container');
	
			// provides a text inputs per item `evaluation`
			const input = createInputLabelled('text', null, evaluation);

			// sets html node with instruction + input text
			fragment.append(p, input);
	
			// layout render handling
			inputEvaluationDiv.append(fragment);
			fragment.append(inputEvaluationDiv);
			wrapper.append(fragment);
		})
		return wrapper;
	}
}


/** Generate error feedback - returns feedback messages */
const createFeedback = (base, solution, evaluation) => {
	const p = createElement('p');
	const spanEvaluation = createElement('span');
	const spanSolution = createElement('span');

	const _evaluation = createElement('code', evaluation);
	const _solution = createElement('code', typeof solution === "string" ?  `"${solution}"` : solution);


	// Ex: Answer should be: <code>solution</code>
	if(!evaluation){
		spanEvaluation.append(_solution)
	}
	
	// Ex: Answer for <code>evaluation</code> was: <code>solution</code>
	else {
		spanEvaluation.append(_evaluation, `should be : `, _solution)
	}



	p.append(base, spanEvaluation )
	return p;
}

/* -------------------------------------------------------------------------- */
/*                                DOM CREATION                                */
/* -------------------------------------------------------------------------- */
/** Generates Quiz based on array of string evaluations */
function generateQuiz( evaluations ){
	const formInputs = generateEvaluationInputs(evaluations);
	const form = createFormQuiz(formInputs);
	form.append(formInputs);
	getQuizContainer().prepend(form);
}


/** Generates errors feedbacks section */
const generateFeedbacksSection = (errors) => {

	// feedback section feedback
	const wrapper = createFragment();
	const sectionDetails = createElement('details');
	const sectionSummary = createElement('summary', 'Errors');

	wrapper.append(createElement('hr'));
	wrapper.append(createElement('p', 'Only check the answers as last resort, try finding the errors on your own first and redo the quiz.'));
	wrapper.append(createElement('br'));

	// feedback wrapper
	const errorsList = createElement('div');
	errorsList.id = 'errors-container';

	// generates feedback
	errors.forEach( error => {
		const isException = error[1].length > 20;

		const textContent = isException
			? createFeedback(`${error[0] + 1}. Answer should be:`, error[2])
			: createFeedback(`${error[0] + 1}. Answer for: `, error[2], error[1] );

		errorsList.append(textContent);
	})

	sectionDetails.append(sectionSummary, errorsList);

	wrapper.append(sectionDetails);

	return wrapper;

}


generateQuiz(EVALUATIONS);
},{}]},{},[2,3]);

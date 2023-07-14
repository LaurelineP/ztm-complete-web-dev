/**
 * Exercise: 
 * 		Make a calculator that sums
 * 		- Bonus make a calculator that sum (previously done), subtract, divide, multiply
 *		
 * 		Using:
 * 		- variable declaration var
 * 		- using prompt()
 * 		- using alert()
 * 		- if needed: to concatenate a string use
 * 			 the "+" operator to display the text
 * 
 * Bonus Exercise:
 * 		Make a calculator that sums, divide, multiply, subtract
 */


var firstDigit;
var secondDigit;
var operationResult;
var textOutput;
var shouldRunAgain;

// Ask user for inputs
var choice = Number(prompt('Calculator: 3 modes are available:\n• choice 1: either you sum 2 values\n• choice 2: either you\'ll provide 3 values\n   a first number, an operand and a second number\n• choice 3:either you provide the full operation\n\nPlease write the number corresponding to your choice? (1,2 or 3)'));
if( Number.isNaN(choice) ){ window.location.reload(); }

/* -------------------------------- CHOICE 1 -------------------------------- */
/* Original exercise: Sum 2 numbers */
if( choice === 1){
	firstDigit 		= Number(prompt('First number to sum:'));
	secondDigit 	= Number(prompt('Second number to sum:'));
	operationResult = firstDigit + secondDigit;
	textOutput 		= "The result of "+ firstDigit +" + " + secondDigit +" is: " + operationResult;

	alert(textOutput);

	shouldRunAgain = confirm("Continue?");
	if(shouldRunAgain) {
		window.location.reload();
	}
}


/* -------------------------------- CHOICE 2 -------------------------------- */
/** - prompts 3 inputs ( number 1, operand, number 2 ) to compute the operation */
var OPERAND;
var OPERANDS = [
	["+", "plus", "add", "addition"],
	["-", "minus", "subtract", "subtraction"],
	["*", "x", "multiply", "multiplication", "times"],
	["/", "divide", "division"],
];

var isIncompletePrompt = true;
var errorMessageBase = "You provide wrong following inputs:";
var errorMessageAddition = "";
var hasError = false;
if( choice === 2){
	
	while (isIncompletePrompt) {
		var firstDigit 	= Number(prompt("First number:"));
		var operand 	= prompt("Operand:");
		var secondDigit = Number(prompt("Second number:"));
		var operationResult = firstDigit + secondDigit;

	
		// checks input values
		if (isNaN(firstDigit)) { errorMessageAddition += "\n   • first number"; hasError = true; }
		if (isNaN(secondDigit)) { errorMessageAddition += "\n   • second number" + secondDigit; hasError = true; }
	
		// checks and determines operand
		for (let i = 0; i < OPERANDS.length; i++) {
			if( OPERANDS[i].includes(operand) ) {
				OPERAND = OPERANDS[i][0];
				break;
			}
		}
	
		if( !OPERAND ){ errorMessageAddition += "\n   • operand: \"" + operand + "\""; hasError = true; }
	
		// error feedback
		if( hasError && errorMessageAddition ){
			var errorMessage = errorMessageBase + errorMessageAddition;
			alert( errorMessage );
			console.error(errorMessage);
	
	
	
			errorMessageAddition = undefined;
			OPERAND = undefined;
		} else {
			hasError = false;
			isIncompletePrompt = false;
		}
	}
		

	if( !hasError ){
	
		// eval alternative
		var operation = "" + firstDigit + " " + OPERAND  + " " + secondDigit;
		var result = Function('return ' + operation )();
		
		textOutput = "The result of " + operation + " is: " + result;

		alert(textOutput);
	
		// Handles continuation
		shouldRunAgain = confirm("Continue?");
		if(shouldRunAgain) { window.location.reload(); }
	}
}


/* -------------------------------- CHOICE 3 -------------------------------- */
/** Given operation input computation */
if( choice === 3){
	var operation = prompt('Please enter your operation:').trim();
	var result = Function("return "+ operation)();
	if(typeof result !== "number"){
		var shouldRunAgain = confirm("Something went wrong, try again?");
		window.location.reload();
	}
	textOutput = "The result of " + operation + " is: " + result;
	alert( textOutput );
	shouldRunAgain = confirm("Continue?");
	if(shouldRunAgain) {
		window.location.reload();
	}
}

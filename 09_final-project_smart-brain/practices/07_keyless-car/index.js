/* ------------------------------ * KEYLESS CAR ----------------------------- */
/** 
 * Make a keyless car!
 * This car will only let you drive if you are over 18. Make it do the following
 * using prompt() and alert(), ask a user for their age.
 * - IF they say they are below 18, respond with:
 * 		"Sorry, you are too young to drive this car. Powering off"
 * - IF they say they are 18, respond with:
 * 		"Congratulations on your first year of driving. Enjoy the ride!"
 * - IF they say they are over 18, respond with:
 * 		"Powering On. Enjoy the ride!"
 * 
 * ---- 
 * 
 * - using `var` as variable declaration
 * - not using functions
 * - implement the code in different control flow
 * 
 */

// `setTimeout` used in order to load all page content ( cf: `iframe`'s source)
setTimeout(() => {
	alert("Please answer the following question before starting the car.");
	var age = Number(prompt("How old are you?"));

	// Possible text outputs
	var textBellow18 = "Sorry, you are too young to drive this car. Powering off";
	var text18 = "Congratulations on your first year of driving. Enjoy the ride!";
	var textAbove18 = "Powering On. Enjoy the ride!";
	var textOutput;
	var error = !age && "The provided age is incorrect, try again?";



	/* -------------------------------------------------------------------------- */
	/*                             IF - ELSE IF - ELSE                            */
	/* -------------------------------------------------------------------------- */
	/*`if`,`else if`, `else` implementation - to un/-comment to run this code.*/

	if( age < 18 ){
		textOutput = textBellow18;
	} else if( age === 18 ){
		textOutput = text18;
	} else if( age > 18) {
		textOutput = textAbove18;
	} else {
		// if incorrect age, display an error message
		if( !age ){
			var shouldTryAgain = confirm(error);
			if( shouldTryAgain ){
				window.location.reload();
			}
		}
	}
	!!textOutput && alert(textOutput);





	/* -------------------------------------------------------------------------- */
	/*                                   SWITCH                                   */
	/* -------------------------------------------------------------------------- */
	/* `switch`,`case` implementation - to un/-comment to run this code. */

	// var context = age < 18 ? "INVALID_BELLOW" 
	//	: age === 18 ? 'VALID'
	//	: age > 18 ? 'VALID_ABOVE' : 'ERROR';

	// switch( context ){
	// 	case 'INVALID_BELLOW':
	// 		textOutput = textBellow18;
	// 		break;
	// 	case 'VALID':
	// 		textOutput = text18;
	// 		break;
	// 	case 'VALID_ABOVE':
	// 		textOutput = textAbove18;
	// 		break;
	// 	default:
	// 		if( !age && context === 'ERROR'){
	// 			var shouldTryAgain = confirm(error);
	// 			if( shouldTryAgain ){
	// 				window.location.reload();
	// 			}
	// 		}
	// }
	// !!textOutput && alert(textOutput);





	/* -------------------------------------------------------------------------- */
	/*                                   WHILE                                    */
	/* -------------------------------------------------------------------------- */
	/*`while` condition implementation - to comment or uncomment*/

	// var shouldRequest = true;
	// while(shouldRequest && !textOutput){
	// 	if( age < 18 ){
	// 		textOutput = textBellow18;
	// 		shouldRequest = false;

	// 	} else if( age === 18 ){
	// 		textOutput = text18;
	// 		shouldRequest = false;

	// 	} else if( age > 18) {
	// 		textOutput = textAbove18;
	// 		shouldRequest = false;

	// 	} else {
	// 		// if incorrect age, display an error message
	// 		if( !age ){
	// 			var shouldTryAgain = confirm(error);
	// 			shouldRequest = shouldTryAgain;
	// 			if( shouldTryAgain ) {
	// 				shouldRequest = false; window.location.reload();
	// 			} else {  shouldRequest = false; }
	// 		}
	// 	}
	// 	textOutput && alert(textOutput);
	// }




	/* -------------------------------------------------------------------------- */
	/*                                   TERNARY                                  */
	/* -------------------------------------------------------------------------- */
	/* Ternary implementation - to comment or uncomment. */

	// textOutput = age < 18 ? textBellow18 
	// 	: age === 18 ? text18
	// 	: age > 18 ? textAbove18
	// 	: null;

	// !textOutput && alert(textOutput);
	// var shouldTryAgain  = !textOutput && confirm(error);
	// if( shouldTryAgain ){
	// 	window.location.reload();
	// }

	// !!textOutput && alert(textOutput);


}, 500);

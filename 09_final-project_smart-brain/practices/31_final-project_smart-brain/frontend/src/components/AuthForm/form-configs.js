
/* -------------------------------------------------------------------------- */
/*                      INPUTS FOR COMPONENT ACCESS FORM                      */
/* -------------------------------------------------------------------------- */

const signinInputs = [
	{ type: 'email', label: 'email' },
	{ type: 'password', label: 'password' },
]

const signupInputs = [
	{ type: 'text', label: 'name' },
	...signinInputs
]

/* -------------------------------------------------------------------------- */
/*                      BUTTONS FOR COMPONENT ACCESS FORM                     */
/* -------------------------------------------------------------------------- */

/**
 *  kind: primary | secondary 
 *  - primary: background color
 * 	- secondary: outline decoration / no background
 */

const signinButtons = [
	{ kind: 'primary', label: 'signin'},
	{ kind: 'secondary', label: 'signup'}
]

const signupButtons = [
	{ kind: 'primary', label: 'signup'},
]




/* ------------------------------------ - ----------------------------------- */



/* -------------------------------------------------------------------------- */
/*                      CONFIG FOR signin / signup FORMS                     */
/* -------------------------------------------------------------------------- */


export const signinConfig = { inputs: signinInputs , buttons: signinButtons }
export const signupConfig = { inputs: signupInputs , buttons: signupButtons }
export const configs = {
	signin: signinConfig, 
	signup: signupConfig
}
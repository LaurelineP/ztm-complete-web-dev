/* --------------------------------- OBJECTS -------------------------------- */
/** 
 * Objects
 * Create an object and an array which we will use in our facebook exercise. 
 *  
 * - Create an object that has properties "username" and "password". 
 * 		Fill those values in with strings.
 * 
 * - Create an array which contains the object you have made above and 
 * 		name the array "database".
 * 
 * - Create an array called "newsfeed" which contains 3 objects with
 * 		properties "username" and "timeline".
 * 
 * 
 * 	---------------------------------------------------------------------- 
 * 
 * - Prompt a modal to ask for credential
 * 
 * - Compare the credentials
 * 
 * - On login success display (console.log) the `newsFeed`
 * 
 * 
 * ----------------------------------------------------------------------- 
 * 
 * 
 */




/* -------------------------------------------------------------------------- */
/*                             OBJECTS AND ARRAYS                             */
/* -------------------------------------------------------------------------- */



/** - Create an array which contains multiple users
 * 		name the array "database".
 *  */
const database = [
	{ username:'BeardedMage', password: 'Thou shall not pass!' },
	{ username:'Gertrude', password: 'Gege1234' },
	{ username:'Nathan', password: 'huhaho0857' },
];


/** Create an array called "newsfeed" which contains 3 objects with
 * 		properties "username" and "timeline".
 *  */
const newsFeed = [
	{ username: "Arthur", timeline: "Medieval" },
	{ username: "Jeanne d'Arc", timeline: "Medieval" },
	{ username: "Nobody", timeline: "Nowhere" },
];

/* -------------------------------------------------------------------------- */
/*                                   PROGRAM                                  */
/* -------------------------------------------------------------------------- */
/** Provides feedback to user in using the browser's console and alert */
function feedbackUser ( content ) {
	console.info(content);
	alert(content);
}

/** Introduces the context */
const intro = () => alert('To see the feeds, please login.');

/** Gets user credential experience */
const getCredential = (subject, text) => {
	const _text = text || 'Please provide a ' + subject + ':';
	const _value = prompt(_text);
	if(!_value) {
		getCredential(
			subject, 
			'Incorrect value provided, please provide a valid ' + subject + ':'
		);
	} else {
		return _value;
	}
};

/** Validates the user's credentials login */
function shouldUser(database, user){
	let isUsernameValid = false;
	let isPasswordValid = false;

	/* using for loop */
	// for( let i = 0; i < database.length; i++){
	// 	const userItem = database[i];
	// 	if( userItem.username === user.username ) {isUsernameValid = true;}
	// 	if( userItem.password === user.password ) {isPasswordValid = true;}
	// }

	/* using for of loop */
	// for( let i in database ) {
	// 	const userItem = database[i];
	// 	if( userItem.username === user.username ) {isUsernameValid = true;}
	// 	if( userItem.password === user.password ) {isPasswordValid = true;}
	// }

	/* using for of loop */
	for( let userItem of database ) {
		if( userItem.username === user.username ) {isUsernameValid = true;}
		if( userItem.password === user.password ) {isPasswordValid = true;}
	}
	return isUsernameValid && isPasswordValid;
}


/** Initiates the program */ 
function init(shouldSkipIntro){

	// launches intro only at the first experience
	!shouldSkipIntro && intro();

	// gets both credential username and password
	const user = {
		username : getCredential('username'),
		password : getCredential('password')
	}

	// checks if logged user can see the feeds
	const shouldDisplayFeeds = shouldUser(database, user);

	// login is successful, displays feeds
	if(shouldDisplayFeeds){
		const feedbackText = 'Here are the news feed:\n\n' + JSON.stringify(newsFeed);
		const message = 'Welcome ' + user.username + ',\n' + feedbackText;
		feedbackUser(message);
	}
	// login is unsuccessful, propose to retry or stop here.
	else {
		const failingMessage = 'Sorry, the credentials are unknown, would you like to try again?';
		const endingMessage = 'See you soon!';

		// checking if needed a do-over
		const shouldTryAgain = confirm(failingMessage);

		if(!shouldTryAgain) {
			feedbackUser(endingMessage);
		} else {
			init(true);
		}
	}
}

// Executes the program
init();
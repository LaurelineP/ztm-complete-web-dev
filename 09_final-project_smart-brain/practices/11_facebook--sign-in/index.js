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

/** - Create an object that has properties "username" and "password". 
 * 		Fill those values in with strings.
 *  */
const user = { username:'BeardedMage', password: 'Thou shall not pass!' };


/** - Create an array which contains the object you have made above and 
 * 		name the array "database".
 *  */
const database = [ user ];


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
	console.log('_value:', _value)
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
	const isUserNameValid = database[0].username === user.username;
	const isPasswordValid = database[0].password === user.password;
	return isUserNameValid && isPasswordValid;
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
		const feedbackText = 'Here are the news feed:' + JSON.stringify(newsFeed);
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
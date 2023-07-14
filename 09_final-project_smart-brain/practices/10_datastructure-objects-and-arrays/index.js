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
 */




/* -------------------------------------------------------------------------- */
/*                                   OBJECT                                   */
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






console.info('1 - Object 1 - `object` result is:', user );
console.info('2 - Object 2 - `array` result is:', database );
console.info('3 - Object 3 - `array`  result is:', newsFeed );



